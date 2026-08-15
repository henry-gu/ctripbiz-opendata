import { randomUUID } from "node:crypto";
import { config, getConfigStatus } from "./config.mjs";
import { DiagnosticBuffer, redact } from "./diagnostics.mjs";
import { AppError } from "./errors.mjs";

const endpoints = Object.freeze({
  ticket: "/SwitchAPI/Order/Ticket",
  destinations: "/distribution/hotel/suggestDestination",
  keywords: "/distribution/hotel/suggestKeyWord",
  hotels: "/distribution/hotel/getHotelDataV2",
  hotelDetail: "/distribution/hotel/getHotelDetailV2",
  brands: "/distribution/hotel/getCorpCityBrandGroup",
  zones: "/distribution/hotel/getDomesticZone",
  metro: "/distribution/hotel/getCorpHotelDomesticMetro",
  countries: "/switchAPI/basedata/v2/getcountry",
  geo: "/switchapi/basedata/v2/queryAllPOIInfo",
});

const ticketState = { value: null, expiresAt: 0, pending: null };
export const diagnostics = new DiagnosticBuffer();

function upstreamStatus(raw) {
  return raw?.status ?? raw?.Status ?? raw?.ResponseStatus ?? raw?.responseStatus ?? null;
}

export function assertBusinessSuccess(raw) {
  const status = upstreamStatus(raw);
  const success = status?.success ?? status?.Success ?? null;
  const ack = status?.Ack ?? status?.ack ?? null;
  const code = status?.errorCode ?? status?.ErrorCode ?? null;
  const message = status?.errorMessage ?? status?.message ?? status?.Message ?? status?.Errors?.[0]?.Message;
  const ackFailed = typeof ack === "string" && !["success", "ok"].includes(ack.toLowerCase());
  const codeFailedWithoutSuccessFlag = success == null && ack == null && typeof code === "number" && code !== 0;
  if (success === false || ackFailed || codeFailedWithoutSuccessFlag) {
    throw new AppError("UPSTREAM_BUSINESS_ERROR", message || "携程接口返回业务错误", {
      statusCode: 502,
      upstreamCode: code,
      retryable: false,
    });
  }
}

export function assertCountrySuccess(raw) {
  if (Number(raw?.responseCode) !== 20000) {
    throw new AppError("UPSTREAM_BUSINESS_ERROR", raw?.responseDesc || "获取国家基础数据失败", {
      statusCode: 502,
      upstreamCode: raw?.responseCode,
      retryable: false,
    });
  }
}

export function assertGeoSuccess(raw) {
  const status = raw?.status ?? raw?.Status;
  const ack = raw?.responseStatus?.ack ?? raw?.responseStatus?.Ack;
  const success = status?.success ?? status?.Success;
  if (success !== true || (ack && String(ack).toLowerCase() !== "success")) {
    throw new AppError("UPSTREAM_BUSINESS_ERROR", status?.errorMessage || "获取标准地理信息失败", {
      statusCode: 502,
      upstreamCode: status?.errorCode,
      retryable: false,
    });
  }
}

async function fetchJson(url, body, timeoutMs, retry = true) {
  let lastError;
  const attempts = retry ? 2 : 1;
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "content-type": "application/json", accept: "application/json" },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(timeoutMs),
      });
      const text = await response.text();
      let data;
      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        throw new AppError("UPSTREAM_INVALID_RESPONSE", "携程接口返回了无法解析的响应", { statusCode: 502 });
      }
      if (!response.ok) {
        const retryable = [502, 503, 504].includes(response.status);
        throw new AppError("UPSTREAM_HTTP_ERROR", `携程接口返回 HTTP ${response.status}`, {
          statusCode: 502,
          retryable,
          upstreamCode: response.status,
        });
      }
      return data;
    } catch (error) {
      lastError = error;
      const retryable = error?.retryable || error?.name === "TimeoutError" || error?.name === "TypeError";
      if (!retryable || attempt === attempts - 1) break;
      await new Promise((resolve) => setTimeout(resolve, 250 + Math.random() * 500));
    }
  }
  if (lastError?.name === "TimeoutError") {
    throw new AppError("UPSTREAM_TIMEOUT", "携程接口响应超时", { statusCode: 504, retryable: true });
  }
  if (lastError instanceof AppError) throw lastError;
  throw new AppError("UPSTREAM_UNAVAILABLE", "无法连接携程接口", { statusCode: 502, retryable: true });
}

export async function getTicket({ force = false } = {}) {
  const status = getConfigStatus();
  if (!status.ready) throw new AppError("CONFIG_MISSING", `缺少配置：${status.missing.join("、")}`, { statusCode: 503 });
  if (!force && ticketState.value && ticketState.expiresAt > Date.now()) return ticketState.value;
  if (ticketState.pending) return ticketState.pending;
  ticketState.pending = (async () => {
    const raw = await fetchJson(`${config.baseUrl}${endpoints.ticket}`, {
      appKey: config.appKey,
      appSecurity: config.appSecurity,
    }, 10000, false);
    const result = raw?.TicketResult ?? raw?.ticketResult ?? raw;
    const success = result?.Status?.Success ?? result?.status?.success ?? Boolean(result?.Ticket ?? result?.ticket);
    const ticket = result?.Ticket ?? result?.ticket;
    if (!success || !ticket) {
      throw new AppError("UPSTREAM_AUTH_ERROR", result?.Status?.Message || "获取 Ticket 失败", {
        statusCode: 502,
        upstreamCode: result?.Status?.ErrorCode,
      });
    }
    ticketState.value = ticket;
    ticketState.expiresAt = Date.now() + 105 * 60 * 1000;
    return ticket;
  })().finally(() => {
    ticketState.pending = null;
  });
  return ticketState.pending;
}

function looksLikeAuthError(error) {
  return error instanceof AppError && [302, -2, 10301016, 5004, 5006].includes(Number(error.upstreamCode));
}

export async function callCtrip(kind, payload, { timeoutMs = config.requestTimeoutMs, authField = "Auth", validator = assertBusinessSuccess } = {}) {
  const requestId = `req_${randomUUID()}`;
  const startedAt = performance.now();
  let raw;
  let requestBody;
  try {
    const ticket = await getTicket();
    requestBody = { [authField]: { AppKey: config.appKey, Ticket: ticket }, ...payload };
    try {
      raw = await fetchJson(`${config.baseUrl}${endpoints[kind]}`, requestBody, timeoutMs);
      validator(raw);
    } catch (error) {
      if (!looksLikeAuthError(error)) throw error;
      const refreshed = await getTicket({ force: true });
      requestBody = { [authField]: { AppKey: config.appKey, Ticket: refreshed }, ...payload };
      raw = await fetchJson(`${config.baseUrl}${endpoints[kind]}`, requestBody, timeoutMs, false);
      validator(raw);
    }
    const latencyMs = Math.round(performance.now() - startedAt);
    diagnostics.set(requestId, {
      requestId,
      endpoint: kind,
      method: "POST",
      url: `${config.baseUrl}${endpoints[kind]}`,
      request: redact(requestBody),
      response: redact(raw),
      latencyMs,
      timestamp: new Date().toISOString(),
      status: "success",
    });
    return { requestId, raw, latencyMs };
  } catch (error) {
    diagnostics.set(requestId, {
      requestId,
      endpoint: kind,
      method: "POST",
      url: `${config.baseUrl}${endpoints[kind]}`,
      request: redact(requestBody ?? payload),
      response: { error: error.message, code: error.code },
      latencyMs: Math.round(performance.now() - startedAt),
      timestamp: new Date().toISOString(),
      status: "error",
    });
    error.requestId = requestId;
    throw error;
  }
}

export function ticketStatus() {
  return { cached: Boolean(ticketState.value && ticketState.expiresAt > Date.now()), expiresAt: ticketState.expiresAt || null };
}
