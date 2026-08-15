import {
  IconBed,
  IconMessageChatbot,
  IconDatabase,
  IconHelpHexagon,
  IconSettings,
} from "@tabler/icons-react";

const navItems = [
  [IconBed, "酒店查询", "hotels"],
  [IconMessageChatbot, "智能推荐", "chat"],
  [IconDatabase, "基础数据", "geo"],
];

export function AppShell({ children, health, diagnosticsOpen, activeView, onNavigate }) {
  const ready = health?.status === "ready";
  return (
    <div className={`app-shell ${diagnosticsOpen ? "diagnostics-visible" : ""}`}>
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-title">商旅开放数据</div>
          <div className="brand-subtitle">本地 Ctrip Business Open Data</div>
        </div>
        <nav aria-label="主导航">
          {navItems.map(([Icon, label, view, badge]) => (
            <button className={`nav-item ${activeView === view ? "active" : ""}`} type="button" key={label} onClick={() => onNavigate(view)}>
              <Icon size={19} stroke={1.7} />
              <span>{label}</span>
              {badge ? <small>{badge}</small> : null}
            </button>
          ))}
        </nav>
        <div className="sidebar-spacer" />
        <button className={`nav-item ${activeView === "settings" ? "active" : ""}`} type="button" onClick={() => onNavigate("settings")}>
          <IconSettings size={19} stroke={1.7} />
          <span>设置</span>
          <span className="nav-chevron">›</span>
        </button>
        <div className="runtime-status">
          <span className={`status-dot ${ready ? "ready" : "warning"}`} />
          <span>{ready ? "生产环境已配置" : "需要检查配置"}</span>
          <IconHelpHexagon size={16} stroke={1.6} />
        </div>
      </aside>
      <main className="app-main">{children}</main>
    </div>
  );
}
