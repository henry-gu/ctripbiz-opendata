import { useEffect, useMemo, useState } from "react";
import { IconBraces, IconCheck, IconChevronRight, IconMessage, IconRestore, IconSettings } from "@tabler/icons-react";
import { api } from "../../lib/api.js";

const promptSections = [
  { id: "extraction", title: "条件提取提示词", description: "识别城市、地点与自然语言日期", icon: IconBraces },
  { id: "system", title: "对话回复提示词", description: "引导追问与酒店推荐回复", icon: IconMessage },
];

export function SettingsPage() {
  const [systemPrompt, setSystemPrompt] = useState("");
  const [extractionPrompt, setExtractionPrompt] = useState("");
  const [savedPrompts, setSavedPrompts] = useState({ systemPrompt: "", extractionPrompt: "" });
  const [settings, setSettings] = useState(null);
  const [activeSection, setActiveSection] = useState("extraction");
  const [message, setMessage] = useState("");

  useEffect(() => { api.chatSettings().then((response) => { const next = response.data; setSettings(next); setSystemPrompt(next.systemPrompt); setExtractionPrompt(next.extractionPrompt); setSavedPrompts({ systemPrompt: next.systemPrompt, extractionPrompt: next.extractionPrompt }); }).catch((error) => setMessage(error.message)); }, []);
  const isDirty = systemPrompt !== savedPrompts.systemPrompt || extractionPrompt !== savedPrompts.extractionPrompt;
  const active = useMemo(() => promptSections.find((section) => section.id === activeSection), [activeSection]);
  const activePrompt = activeSection === "extraction" ? extractionPrompt : systemPrompt;
  const setActivePrompt = activeSection === "extraction" ? setExtractionPrompt : setSystemPrompt;
  async function save() { try { const response = await api.saveChatSettings({ systemPrompt, extractionPrompt }); setSettings((current) => ({ ...current, ...response.data })); setSavedPrompts({ systemPrompt: response.data.systemPrompt, extractionPrompt: response.data.extractionPrompt }); setMessage("已保存到本机 data/chat-settings.json"); } catch (error) { setMessage(error.message); } }
  function resetActive() { if (activeSection === "extraction") setExtractionPrompt(settings?.defaultExtractionPrompt || ""); else setSystemPrompt(settings?.defaultSystemPrompt || ""); setMessage("已恢复当前提示词的默认内容，请保存后生效"); }

  return <section className="settings-page settings-workspace"><header className="settings-workspace-header"><div><div className="geo-kicker"><IconSettings size={16} />设置</div><h1>智能推荐设置</h1><p>维护模型的条件提取与对话回复规则。连接凭据仅从服务器 .env 读取，提示词保存在本机文件。</p></div><div className="settings-model-status"><span className={`status-dot ${settings?.llm?.ready ? "ready" : ""}`} /><strong>{settings?.llm?.ready ? "模型已就绪" : "模型待配置"}</strong><code>{settings?.llm?.model || "—"}</code></div></header><div className="settings-editor-shell"><aside className="settings-section-nav" aria-label="提示词管理"><div className="settings-section-nav-heading"><strong>提示词管理</strong><span>选择左侧条目进行维护</span></div>{promptSections.map((section, index) => { const SectionIcon = section.icon; return <button className={section.id === activeSection ? "active" : ""} type="button" key={section.id} onClick={() => { setActiveSection(section.id); setMessage(""); }}><span className="settings-section-number">{index + 1}</span><SectionIcon size={16} /><span><strong>{section.title}</strong><small>{section.description}</small></span><IconChevronRight size={15} /></button>; })}</aside><main className="prompt-workbench"><header className="prompt-workbench-heading"><div><span className="prompt-index">{activeSection === "extraction" ? "1" : "2"}</span><h2>{active?.title}</h2><span className="prompt-badge">{activeSection === "extraction" ? "系统提示词" : "回复提示词"}</span></div><p>{activeSection === "extraction" ? <>用于从用户输入中识别城市、地点和自然语言日期；可使用 <code>{"{{today}}"}</code> 与 <code>{"{{weekday}}"}</code>。</> : "用于决定助手的语气、追问与推荐说明；地点和酒店数据仍以系统验证结果为准。"}</p></header><div className="prompt-workbench-meta"><span>配置状态 <strong className="meta-ready"><i />已启用</strong></span><span>文件位置 <code>data/chat-settings.json</code></span><span>字符数 <strong>{activePrompt.length.toLocaleString()}</strong></span></div><label className="prompt-document-editor"><span className="sr-only">{active?.title}</span><textarea value={activePrompt} onChange={(event) => { setActivePrompt(event.target.value); setMessage(""); }} spellCheck="false" /></label><button className="restore-current-prompt" type="button" onClick={resetActive}><IconRestore size={15} />恢复此提示词的默认内容</button></main></div><footer className="settings-action-bar"><span className={isDirty ? "settings-dirty" : "settings-clean"}><i />{isDirty ? "已修改" : "所有更改已保存"}</span><span className="settings-save-message">{message || "修改内容将保存在本机 data/chat-settings.json"}</span><div><button className="reset-button" type="button" onClick={resetActive}>恢复默认</button><button className="primary-button" type="button" onClick={save} disabled={!isDirty}><IconCheck size={16} />保存设置</button></div></footer></section>;
}
