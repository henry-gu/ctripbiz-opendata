import { IconChevronLeft, IconChevronRight, IconDownload, IconRefresh, IconStarFilled, IconTrash } from "@tabler/icons-react";

function formatPrice(price) {
  return typeof price === "number" ? new Intl.NumberFormat("zh-CN").format(price) : null;
}

export function ResultsTable({ hotels, count, page, loading, onPage, onDetail, onRefresh, onClear }) {
  return (
    <section className="results-panel">
      <header className="results-header">
        <div><strong>搜索结果</strong><span>（共 {count || 0} 条）</span></div>
        <div className="results-actions">
          <label className="inline-check"><input type="checkbox" />仅看可订</label>
          <button type="button" onClick={onRefresh}><IconRefresh size={16} />刷新</button>
          <button type="button" onClick={onClear}><IconTrash size={16} />清空结果</button>
          <button type="button"><IconDownload size={16} />导出</button>
        </div>
      </header>
      <div className="table-scroll">
        <table>
          <thead><tr><th>酒店名称</th><th>地理位置</th><th>星级</th><th>价格（CNY）</th><th>评分</th><th>可订</th><th>操作</th></tr></thead>
          <tbody className={loading ? "loading" : ""}>
            {hotels.length ? hotels.map((hotel) => (
              <tr key={hotel.id}>
                <td>
                  <div className="hotel-cell">
                    <div><strong>{hotel.name}</strong><small>ID {hotel.id}</small></div>
                  </div>
                </td>
                <td><span className="address-main">{hotel.address}</span><small>{hotel.zoneName || "区域待确认"}</small></td>
                <td><span className="stars" aria-label={`${hotel.star}星`}>{Array.from({ length: 5 }, (_, index) => <IconStarFilled key={index} size={13} className={index < hotel.star ? "filled" : "empty"} />)}</span></td>
                <td>{formatPrice(hotel.price) ? <strong className="price">¥ {formatPrice(hotel.price)} <small>起</small></strong> : <span className="muted">暂无报价</span>}</td>
                <td>{hotel.rating ? `${hotel.rating.toFixed(1)} / 5` : "—"}</td>
                <td><span className={hotel.available ? "available" : "unavailable"}>{hotel.available ? "可订" : "不可订"}</span></td>
                <td><button className="detail-link" type="button" onClick={() => onDetail(hotel)}>查看详情</button></td>
              </tr>
            )) : (
              <tr><td colSpan="7"><div className="empty-state"><strong>还没有酒店结果</strong><span>选择目的地与日期后开始查询</span></div></td></tr>
            )}
          </tbody>
        </table>
      </div>
      <footer className="pagination">
        <button type="button" disabled={page <= 1} onClick={() => onPage(page - 1)}><IconChevronLeft size={17} /></button>
        {[page, page + 1, page + 2].map((value) => <button type="button" className={value === page ? "current" : ""} key={value} onClick={() => onPage(value)}>{value}</button>)}
        <span>…</span><button type="button" onClick={() => onPage(page + 1)}><IconChevronRight size={17} /></button>
        <span className="page-summary">10 条/页</span>
      </footer>
    </section>
  );
}
