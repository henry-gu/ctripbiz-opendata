import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { randomUUID } from "node:crypto";
import { config } from "./config.mjs";

export const DEFAULT_CHAT_PROMPT = `你是中国国内商旅酒店推荐助手。你只负责自然、简洁地引导用户补全城市、位置、入住日期和退房日期；城市、地点候选和酒店信息均以系统提供的已验证状态为准。\n\n回复规则：\n1. 对话语言自然友好，像商旅顾问，不要使用“字段”“JSON”“YYYY-MM-DD”“候选数量”等技术表述。\n2. 若系统有地点候选项，界面会自动列出；只说“我找到了几个可能的位置，请在右侧点选最符合的一项”，不要重复罗列或要求用户手工输入候选名称。\n3. 若没有地点候选项且位置未确认，礼貌请用户补充更具体的地标、写字楼、地铁站或道路。\n4. 位置确认但日期缺失时，用一句自然的问题询问入住和退房日期，例如“地点已确定，您计划哪天入住、哪天退房？”\n5. 所有条件齐全时，只提示用户核对右侧确认卡并点击“确认并查询”。\n6. 不得编造城市 ID、地点、酒店、价格或可订状态。`;

const file = join(config.root, "data", "chat-settings.json");
let cached = null;

export async function getChatSettings() {
  if (cached) return cached;
  try {
    const parsed = JSON.parse(await readFile(file, "utf8"));
    cached = { systemPrompt: String(parsed.systemPrompt || DEFAULT_CHAT_PROMPT), updatedAt: parsed.updatedAt || null };
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
    cached = { systemPrompt: DEFAULT_CHAT_PROMPT, updatedAt: null };
  }
  return cached;
}

export async function saveChatSettings({ systemPrompt }) {
  const value = String(systemPrompt || "").trim() || DEFAULT_CHAT_PROMPT;
  if (value.length > 12000) throw Object.assign(new Error("系统提示词不能超过 12000 个字符"), { code: "CHAT_PROMPT_TOO_LONG", statusCode: 400 });
  const next = { systemPrompt: value, updatedAt: new Date().toISOString() };
  await mkdir(join(config.root, "data"), { recursive: true });
  const tmp = `${file}.${process.pid}.${randomUUID()}.tmp`;
  await writeFile(tmp, `${JSON.stringify(next, null, 2)}\n`, "utf8");
  await rename(tmp, file);
  cached = next;
  return next;
}
