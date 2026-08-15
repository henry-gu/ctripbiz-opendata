import { useMemo, useState } from "react";
import { IconCheck, IconChevronDown, IconChevronUp, IconCopy, IconDatabaseOff, IconX } from "@tabler/icons-react";

function JsonBlock({ value }) {
  const text = useMemo(() => JSON.stringify(value ?? {}, null, 2), [value]);
  return (
    <div className="json-wrap">
      <button type="button" className="copy-button" onClick={() => navigator.clipboard?.writeText(text)}><IconCopy size={15} />复制</button>
      <pre>{text}</pre>
    </div>
  );
}

export function DiagnosticsPanel({ open, onToggle, diagnostics, health }) {
  const [tab, setTab] = useState("request");
  const endpointName = ({ destinations: "SuggestDestination", keywords: "SuggestKeyword", hotels: "getHotelDataV2", hotelDetail: "getHotelDetailV2" })[diagnostics?.endpoint] || diagnostics?.endpoint || "—";
  if (!open) {
    return <button type="button" className="diagnostics-collapsed" onClick={onToggle}><IconChevronUp size={16} />开发者诊断</button>;
  }
  return (
    <section className="diagnostics-panel">
      <header className="diagnostics-header">
        <button type="button" className="diagnostics-title" onClick={onToggle}>开发者诊断 <IconChevronDown size={16} /></button>
        <div className="diagnostic-tabs">
          <button type="button" className={tab === "request" ? "active" : ""} onClick={() => setTab("request")}>请求参数</button>
          <button type="button" className={tab === "response" ? "active" : ""} onClick={() => setTab("response")}>标准化响应</button>
        </div>
        <div className={`diagnostic-state ${diagnostics?.status === "error" ? "error" : ""}`}>
          {diagnostics?.status === "error" ? <IconX size={16} /> : <IconCheck size={16} />}
          {diagnostics ? (diagnostics.status === "pending" ? "请求中" : diagnostics.status === "error" ? "有错误" : "无错误") : "等待请求"}
        </div>
      </header>
      <div className="diagnostics-grid">
        <div className="diagnostic-json"><JsonBlock value={tab === "request" ? diagnostics?.request : diagnostics?.response} /></div>
        <div className="diagnostic-meta">
          <div className="meta-row emphasis"><span>耗时</span><strong>{diagnostics?.latencyMs ? `${diagnostics.latencyMs} ms` : "—"}</strong></div>
          <div className="meta-row"><span>请求 ID</span><code>{diagnostics?.requestId || "等待请求"}</code></div>
          <div className="meta-row"><span>时间</span><span>{diagnostics?.timestamp ? new Date(diagnostics.timestamp).toLocaleString("zh-CN") : "—"}</span></div>
          <div className="meta-row"><span>状态</span><strong className="success-text">{diagnostics?.status === "success" ? "200 OK" : "—"}</strong></div>
          <div className="meta-row"><span>接口</span><span>{endpointName}</span></div>
          <div className="meta-row"><span>方法</span><span>{diagnostics?.method || "POST"}</span></div>
          <div className="meta-row"><span>缓存</span><span>{diagnostics?.cache?.hit ? "内存命中" : "未命中"}</span></div>
          <div className="memory-note"><IconDatabaseOff size={17} /><span>无数据库 · 仅内存缓存</span><small>{health?.cacheEntries ?? 0} 条</small></div>
        </div>
      </div>
    </section>
  );
}
