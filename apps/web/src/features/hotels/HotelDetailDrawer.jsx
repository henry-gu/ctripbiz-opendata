import { IconBed, IconBuilding, IconMapPin, IconPhone, IconStarFilled, IconX } from "@tabler/icons-react";

export function HotelDetailDrawer({ detail, loading, onClose }) {
  if (!detail) return null;
  return (
    <div className="drawer-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <aside className="detail-drawer" aria-label="酒店详情">
        <header><div><small>酒店详情</small><h2>{detail.name}</h2></div><button type="button" className="icon-button" onClick={onClose} aria-label="关闭详情"><IconX size={21} /></button></header>
        {detail.image ? <img className="detail-hero" src={detail.image} alt="" /> : null}
        <div className="detail-score"><span><IconStarFilled size={16} />{detail.rating ? detail.rating.toFixed(1) : "暂无评分"}</span><span>{detail.star || 0} 星级</span></div>
        {loading ? <div className="detail-loading">正在获取实时房型与政策…</div> : null}
        <section className="detail-section"><h3><BuildingIcon />酒店概览</h3><p>{detail.description || "携程商旅酒店详情接口暂未返回简介，可在下方查看位置、房型与设施信息。"}</p></section>
        <section className="detail-facts">
          <div><IconMapPin size={18} /><span>地址</span><strong>{detail.address || "地址暂缺"}</strong></div>
          <div><IconPhone size={18} /><span>联系电话</span><strong>{detail.telephone || "暂未提供"}</strong></div>
          <div><IconBed size={18} /><span>房型</span><strong>{detail.rooms?.length ? `${detail.rooms.length} 种可查询房型` : "以实时接口为准"}</strong></div>
        </section>
        <section className="detail-section"><h3>设施与政策</h3><div className="facility-list">{detail.facilities?.length ? detail.facilities.slice(0, 12).map((item, index) => <span key={item.id || index}>{item.name || item.facilityName || String(item)}</span>) : <span>设施信息以实时返回为准</span>}</div></section>
      </aside>
    </div>
  );
}

function BuildingIcon() {
  return <IconBuilding size={18} />;
}
