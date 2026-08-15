import { AppError } from "./errors.mjs";
import { config, getLlmStatus } from "./config.mjs";
import { geoStore } from "./geo-store.mjs";
import { getChatSettings } from "./chat-settings.mjs";

const DATE = /^\d{4}-\d{2}-\d{2}$/;
const allowedLocationTypes = new Set(["LANDMARK", "ZONE", "METRO_STATION", "HOTEL"]);

function clean(value) { return String(value || "").trim(); }
function validDate(value) { return DATE.test(value) && !Number.isNaN(Date.parse(`${value}T12:00:00`)); }
function parseJson(text) {
  const match = String(text).match(/\{[\s\S]*\}/);
  if (!match) throw new AppError("LLM_INVALID_RESPONSE", "模型未返回可识别的行程信息，请重试", { statusCode: 502, retryable: true });
  try { return JSON.parse(match[0]); } catch { throw new AppError("LLM_INVALID_RESPONSE", "模型返回格式异常，请重试", { statusCode: 502, retryable: true }); }
}

function upstreamError(status) {
  if (status === 429) return new AppError("LLM_RATE_LIMITED", "模型服务繁忙，请稍后重试", { statusCode: 503, retryable: true, details: { status } });
  if (status === 401 || status === 403) return new AppError("LLM_AUTHENTICATION_FAILED", "模型服务认证失败，请检查 .env 配置", { statusCode: 502, details: { status } });
  return new AppError("LLM_UPSTREAM_ERROR", "模型服务暂时不可用，请稍后重试", { statusCode: 502, retryable: status >= 500, details: { status } });
}

export function mergeTripState(previous = {}, extracted = {}) {
  const state = {
    city: clean(extracted.city) || clean(previous.city),
    location: clean(extracted.location) || clean(previous.location),
    checkInDate: clean(extracted.checkInDate) || clean(previous.checkInDate),
    checkOutDate: clean(extracted.checkOutDate) || clean(previous.checkOutDate),
    cityId: Number(previous.cityId) || null,
    cityName: clean(previous.cityName),
    countyName: clean(previous.countyName),
    keyword: clean(previous.keyword),
    locationUnresolved: Boolean(previous.locationUnresolved),
  };
  const missing = [];
  if (!state.cityId && !state.city) missing.push("city");
  if (!state.location && !state.keyword) missing.push("location");
  if (!state.checkInDate) missing.push("checkInDate");
  if (!state.checkOutDate) missing.push("checkOutDate");
  if (state.checkInDate && !validDate(state.checkInDate)) missing.push("checkInDate");
  if (state.checkOutDate && !validDate(state.checkOutDate)) missing.push("checkOutDate");
  if (validDate(state.checkInDate) && validDate(state.checkOutDate) && state.checkOutDate <= state.checkInDate) missing.push("dateOrder");
  return { ...state, missing: [...new Set(missing)] };
}

async function resolveCity(state) {
  if (state.cityId || !state.city) return { state, cityCandidates: [] };
  const result = await geoStore.cities({ query: state.city, pageSize: 12 });
  const exact = result.items.find((item) => String(item.resultName || item.cityName) === state.city);
  if (!exact) return { state, cityCandidates: result.items.slice(0, 8) };
  const county = exact.resultType === "COUNTY";
  return {
    state: {
      ...state,
      cityId: Number(county ? exact.parentCityId : exact.cityId),
      cityName: county ? exact.parentCityName : exact.cityName,
      countyName: county ? exact.resultName : "",
      keyword: county ? exact.resultName : state.keyword,
    },
    cityCandidates: [],
  };
}

async function openAiJson(messages, debug) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), config.openaiTimeoutMs);
  const request = { model: config.openaiModel, response_format: { type: "json_object" }, messages };
  debug?.({ stage: "提取查询条件", request });
  try {
    const response = await fetch(`${config.openaiBaseUrl}/chat/completions`, {
      method: "POST",
      headers: { authorization: `Bearer ${config.openaiApiKey}`, "content-type": "application/json" },
      body: JSON.stringify(request),
      signal: controller.signal,
    });
    const raw = await response.text();
    debug?.({ stage: "提取查询条件", status: response.status, response: raw });
    if (!response.ok) throw upstreamError(response.status);
    const body = JSON.parse(raw);
    return parseJson(body.choices?.[0]?.message?.content);
  } catch (error) {
    if (error instanceof AppError) throw error;
    if (error?.name === "AbortError") throw new AppError("LLM_TIMEOUT", "模型响应超时，请稍后重试", { statusCode: 504, retryable: true });
    throw new AppError("LLM_NETWORK_ERROR", "模型服务连接失败，请稍后重试", { statusCode: 502, retryable: true });
  } finally { clearTimeout(timer); }
}

async function streamOpenAi(messages, emit, debug) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), config.openaiTimeoutMs);
  const request = { model: config.openaiModel, stream: true, messages };
  debug?.({ stage: "生成对话回复", request });
  try {
    const response = await fetch(`${config.openaiBaseUrl}/chat/completions`, {
      method: "POST",
      headers: { authorization: `Bearer ${config.openaiApiKey}`, "content-type": "application/json" },
      body: JSON.stringify(request), signal: controller.signal,
    });
    if (!response.ok || !response.body) {
      const raw = response.body ? await response.text() : "";
      debug?.({ stage: "生成对话回复", status: response.status, response: raw });
      throw upstreamError(response.status);
    }
    const reader = response.body.getReader(); const decoder = new TextDecoder(); let buffer = ""; let raw = "";
    while (true) {
      const { done, value } = await reader.read(); if (done) break;
      buffer += decoder.decode(value, { stream: true }); raw += buffer;
      const lines = buffer.split("\n"); buffer = lines.pop() || "";
      for (const line of lines) {
        if (!line.startsWith("data:")) continue;
        const text = line.slice(5).trim(); if (text === "[DONE]") continue;
        try { const token = JSON.parse(text).choices?.[0]?.delta?.content; if (token) emit("token", { text: token }); } catch { /* ignore malformed upstream SSE chunk */ }
      }
    }
    debug?.({ stage: "生成对话回复", status: response.status, response: raw.slice(0, 100000) });
  } catch (error) {
    if (error instanceof AppError) throw error;
    if (error?.name === "AbortError") throw new AppError("LLM_TIMEOUT", "模型响应超时，请稍后重试", { statusCode: 504, retryable: true });
    throw new AppError("LLM_NETWORK_ERROR", "模型服务连接失败，请稍后重试", { statusCode: 502, retryable: true });
  } finally { clearTimeout(timer); }
}

function extractionPrompt() {
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Shanghai", year: "numeric", month: "2-digit", day: "2-digit", weekday: "long" }).formatToParts(new Date());
  const value = (type) => parts.find((part) => part.type === type)?.value;
  const today = `${value("year")}-${value("month")}-${value("day")}`;
  return `从用户消息中提取国内酒店查询条件，仅输出 JSON：{city:string,location:string,checkInDate:string,checkOutDate:string}。今天是中国时区 ${today}（${value("weekday")}）。未提及字段输出空字符串。必须将“今天、明天、后天、下周一至下周日、本周一至本周日、下个月X日”等自然语言日期换算为实际 YYYY-MM-DD；“下周”是当前自然周之后的一周。若用户说“下周二入住、下周三退房”，分别填写对应的两天，不要继续追问日期。`;
}

function workflowGuidance(state, cityCandidates, candidates) {
  if (cityCandidates.length) return "我找到了几个可能的目的城市，请在右侧选择最符合的一项。";
  if (candidates.length) return "我找到了几个可能的位置，请在右侧点选最符合的一项。";
  if (state.locationUnresolved) return "暂时没有找到匹配的位置。请换一个更具体的地标、写字楼、地铁站或道路名称试试。";
  if (state.missing.includes("checkInDate") && state.missing.includes("checkOutDate")) return "地点已确定。您计划哪天入住、哪天退房？也可以直接在右侧确认卡中选择日期。";
  if (state.missing.includes("checkInDate")) return "地点已确定。请告诉我入住日期，或直接在右侧确认卡中选择。";
  if (state.missing.includes("checkOutDate")) return "地点已确定。请告诉我退房日期，或直接在右侧确认卡中选择。";
  if (state.missing.includes("dateOrder")) return "退房日期需要晚于入住日期，请调整右侧确认卡中的日期。";
  return null;
}

export async function streamChatTurn(body, emit, suggestKeywords) {
  const status = getLlmStatus();
  if (!status.ready) throw new AppError("LLM_CONFIGURATION_REQUIRED", `请在 .env 中配置：${status.missing.join("、")}`, { statusCode: 503 });
  const message = clean(body?.message); if (!message) throw new AppError("VALIDATION_ERROR", "请输入消息", { statusCode: 400 });
  const history = Array.isArray(body?.history) ? body.history.slice(-8).map((item) => ({ role: item.role === "assistant" ? "assistant" : "user", content: clean(item.content).slice(0, 2000) })).filter((item) => item.content) : [];
  const debug = (data) => emit("debug", data);
  try {
    const extracted = await openAiJson([{ role: "system", content: extractionPrompt() }, ...history, { role: "user", content: message }], debug);
  let state = mergeTripState(body?.state, extracted);
  const cityResult = await resolveCity(state); state = cityResult.state;
  let candidates = [];
  if (state.cityId && state.location && !state.keyword) {
    const suggestions = await suggestKeywords({ cityId: state.cityId, keyword: state.location });
    emit("ctrip", {
      endpoint: "SuggestKeyword",
      requestId: suggestions.requestId,
      request: { cityId: state.cityId, keyword: state.location, countryId: 1, language: "ZH_CN" },
      response: { count: suggestions.data.length, items: suggestions.data.slice(0, 20) },
      meta: suggestions.meta,
    });
    const matching = suggestions.data.filter((item) => Number(item.cityId) === Number(state.cityId) && allowedLocationTypes.has(item.type)).slice(0, 8);
    const exact = matching.find((item) => item.name === state.location);
    if (exact) { state.keyword = exact.name; state.locationUnresolved = false; }
    else if (matching.length) { candidates = matching; state.locationUnresolved = false; }
    else state.locationUnresolved = true;
  }
  state = mergeTripState(state, {});
  emit("state", { state, cityCandidates: cityResult.cityCandidates, candidates });
  const guidance = workflowGuidance(state, cityResult.cityCandidates, candidates);
  if (guidance) {
    emit("token", { text: guidance });
    emit("done", { state, cityCandidates: cityResult.cityCandidates, candidates });
    return;
  }
  const settings = await getChatSettings();
  const context = JSON.stringify({ state, cityCandidates: cityResult.cityCandidates.map((item) => ({ name: item.resultName, parentCityName: item.parentCityName })), candidateCount: candidates.length });
    await streamOpenAi([{ role: "system", content: settings.systemPrompt }, { role: "system", content: `已验证的当前状态：${context}` }, ...history, { role: "user", content: message }], emit, debug);
    emit("done", { state, cityCandidates: cityResult.cityCandidates, candidates });
  } catch (error) {
    debug({ stage: "错误", error: { code: error.code || "INTERNAL_ERROR", message: error.message, details: error.details || null } });
    throw error;
  }
}
