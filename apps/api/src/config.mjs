import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

function parseEnvFile(path) {
  if (!existsSync(path)) return {};
  const result = {};
  for (const line of readFileSync(path, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const separator = trimmed.indexOf("=");
    if (separator < 1) continue;
    const key = trimmed.slice(0, separator).trim();
    let value = trimmed.slice(separator + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    result[key] = value;
  }
  return result;
}

const root = resolve(import.meta.dirname, "../../..");
const fileEnv = parseEnvFile(resolve(root, ".env"));
const env = { ...fileEnv, ...process.env };

function first(...keys) {
  return keys.map((key) => env[key]).find(Boolean) ?? "";
}

export const config = Object.freeze({
  root,
  host: first("HOST") || "127.0.0.1",
  port: Number(first("PORT", "API_PORT") || 8787),
  baseUrl: first("CTRIPBIZ_BASE_URL") || "https://ct.ctrip.com",
  appKey: first("CTRIPBIZ_APP_KEY", "Appkey", "AppKey"),
  appSecurity: first("CTRIPBIZ_APP_SECURITY", "AppSecurity"),
  corpId: first("CTRIPBIZ_CORP_ID", "Corpid", "CorpId"),
  uid: first("CTRIPBIZ_UID", "Uid", "UID"),
  webDist: resolve(root, "apps/web/dist/client"),
  requestTimeoutMs: Number(first("CTRIPBIZ_TIMEOUT_MS") || 15000),
  openaiBaseUrl: first("OPENAI_BASE_URL").replace(/\/$/, ""),
  openaiApiKey: first("OPENAI_API_KEY"),
  openaiModel: first("OPENAI_MODEL"),
  openaiTimeoutMs: Number(first("OPENAI_TIMEOUT_MS") || 90000),
});

export function getConfigStatus() {
  const missing = [];
  if (!config.appKey) missing.push("Appkey");
  if (!config.appSecurity) missing.push("AppSecurity");
  if (!config.corpId) missing.push("Corpid");
  if (!config.uid) missing.push("Uid");
  return { ready: missing.length === 0, missing };
}

export function getLlmStatus() {
  const missing = [];
  if (!config.openaiBaseUrl) missing.push("OPENAI_BASE_URL");
  if (!config.openaiApiKey) missing.push("OPENAI_API_KEY");
  if (!config.openaiModel) missing.push("OPENAI_MODEL");
  return { ready: missing.length === 0, missing, model: config.openaiModel || null };
}
