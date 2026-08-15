import { existsSync } from "node:fs";
import Fastify from "fastify";
import fastifyStatic from "@fastify/static";
import { config, getConfigStatus, getLlmStatus } from "./config.mjs";
import { diagnostics, ticketStatus } from "./ctrip-client.mjs";
import { publicError } from "./errors.mjs";
import { services } from "./services.mjs";
import { streamChatTurn } from "./chat-service.mjs";
import { DEFAULT_CHAT_PROMPT, getChatSettings, saveChatSettings } from "./chat-settings.mjs";

const app = Fastify({ logger: { level: process.env.LOG_LEVEL || "info", redact: ["req.headers.authorization"] } });

app.setErrorHandler((error, request, reply) => {
  const requestId = error.requestId || request.id;
  request.log.error({ err: { message: error.message, code: error.code }, requestId }, "request failed");
  reply.status(error.statusCode || 500).send(publicError(error, requestId));
});

app.get("/api/v1/system/health", async () => ({
  requestId: `health_${Date.now()}`,
  data: {
    status: getConfigStatus().ready ? "ready" : "configuration_required",
    environment: "production",
    baseUrl: config.baseUrl,
    configuration: getConfigStatus(),
    ticket: ticketStatus(),
    cacheEntries: services.cacheSize(),
    persistence: "memory-only",
    llm: getLlmStatus(),
  },
  meta: { latencyMs: 0, cache: { hit: false, stale: false, expiresAt: null } },
}));

app.post("/api/v1/destinations/suggest", async (request) => services.suggestDestinations(request.body ?? {}));
app.post("/api/v1/destinations/fuzzy", async (request) => services.suggestFuzzyLocations(request.body ?? {}));
app.post("/api/v1/keywords/suggest", async (request) => services.suggestKeywords(request.body ?? {}));
app.post("/api/v1/hotels/search", async (request) => services.searchHotels(request.body ?? {}));
app.post("/api/v1/hotels/:hotelId/detail", async (request) => services.hotelDetail(request.params.hotelId, request.body ?? {}));
app.get("/api/v1/lookups/:kind", async (request) => {
  const kind = request.params.kind;
  if (!["brands", "zones", "metro"].includes(kind)) {
    throw Object.assign(new Error("未知基础数据类型"), { code: "LOOKUP_NOT_FOUND", statusCode: 404 });
  }
  return services.lookup(kind, request.query.cityId, request.query.refresh === "true");
});
app.get("/api/v1/geo/status", async () => ({ requestId: `geo_status_${Date.now()}`, data: await services.geoStatus() }));
app.get("/api/v1/geo/cities", async (request) => ({ requestId: request.id, data: await services.geoCities(request.query) }));
app.get("/api/v1/geo/provinces", async (request) => ({ requestId: request.id, data: await services.geoProvinces() }));
app.get("/api/v1/geo/provinces/:provinceId", async (request, reply) => {
  const data = await services.geoProvince(request.params.provinceId);
  if (!data) return reply.status(404).send({ error: { code: "GEO_PROVINCE_NOT_FOUND", message: "未找到省份" } });
  return { requestId: request.id, data };
});
app.get("/api/v1/geo/raw", async (request) => ({ requestId: request.id, data: await services.geoRaw() }));
app.post("/api/v1/geo/refresh", async (request) => ({ requestId: request.id, data: await services.geoRefresh() }));
app.get("/api/v1/chat/settings", async (request) => ({ requestId: request.id, data: { ...(await getChatSettings()), defaultSystemPrompt: DEFAULT_CHAT_PROMPT, llm: getLlmStatus() } }));
app.put("/api/v1/chat/settings", async (request) => ({ requestId: request.id, data: await saveChatSettings(request.body ?? {}) }));
app.post("/api/v1/chat/search", async (request) => {
  const result = await services.chatSearch(request.body ?? {});
  return { requestId: result.requestId, data: result.data, meta: result.meta };
});
app.post("/api/v1/chat/turn", async (request, reply) => {
  reply.hijack();
  reply.raw.writeHead(200, { "content-type": "text/event-stream; charset=utf-8", "cache-control": "no-cache, no-transform", connection: "keep-alive" });
  reply.raw.flushHeaders?.();
  const emit = (event, data) => reply.raw.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
  try {
    await streamChatTurn(request.body ?? {}, emit, (body) => services.suggestKeywords(body));
  } catch (error) {
    emit("error", { error: publicError(error, request.id).error });
  } finally {
    reply.raw.end();
  }
});
app.get("/api/v1/debug/requests/:requestId", async (request, reply) => {
  const value = diagnostics.get(request.params.requestId);
  if (!value) return reply.status(404).send({ requestId: request.id, error: { code: "DEBUG_NOT_FOUND", message: "诊断数据已过期", retryable: false } });
  return { requestId: request.params.requestId, data: value };
});

if (existsSync(config.webDist)) {
  await app.register(fastifyStatic, { root: config.webDist });
  app.setNotFoundHandler((request, reply) => {
    if (request.raw.url.startsWith("/api/")) return reply.status(404).send({ error: { code: "NOT_FOUND", message: "接口不存在" } });
    return reply.sendFile("index.html");
  });
}

await app.listen({ host: config.host, port: config.port });
