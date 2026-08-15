import { useEffect, useState } from "react";
import { IconCheck, IconSettings } from "@tabler/icons-react";
import { api } from "../../lib/api.js";

export function SettingsPage() {
  const [prompt, setPrompt] = useState("");
  const [settings, setSettings] = useState(null);
  const [message, setMessage] = useState("");
  useEffect(() => { api.chatSettings().then((response) => { setSettings(response.data); setPrompt(response.data.systemPrompt); }).catch((error) => setMessage(error.message)); }, []);
  async function save() { try { const response = await api.saveChatSettings(prompt); setSettings((current) => ({ ...current, ...response.data })); setMessage("已保存到本机 data/chat-settings.json"); } catch (error) { setMessage(error.message); } }
  return <section className="settings-page"><header><div><div className="geo-kicker"><IconSettings size={16} />设置</div><h1>智能推荐设置</h1><p>模型连接信息仅从服务器 .env 读取，浏览器不会接触 API Key。</p></div></header><div className="settings-card"><div className="settings-status"><div><strong>模型配置</strong><span>{settings?.llm?.ready ? `已就绪 · ${settings.llm.model}` : `缺少：${settings?.llm?.missing?.join("、") || "正在检查"}`}</span></div><span className={`geo-level ${settings?.llm?.ready ? "city" : "county"}`}>{settings?.llm?.ready ? "可用" : "需配置"}</span></div><label className="prompt-editor"><strong>系统提示词</strong><span>决定助手的收集、追问与确认规则。</span><textarea value={prompt} onChange={(event) => setPrompt(event.target.value)} rows="18" /></label><footer><button className="primary-button" type="button" onClick={save}><IconCheck size={16} />保存提示词</button><button className="reset-button" type="button" onClick={() => { setPrompt(settings?.defaultSystemPrompt || ""); setMessage("已恢复默认提示词，请保存后生效"); }}>恢复默认</button>{message ? <span>{message}</span> : null}</footer></div></section>;
}
