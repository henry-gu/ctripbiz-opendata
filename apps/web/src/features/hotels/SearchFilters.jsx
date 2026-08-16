import { useEffect, useState } from "react";
import { IconAdjustmentsHorizontal, IconChevronDown, IconRefresh } from "@tabler/icons-react";
import { api } from "../../lib/api.js";

function Field({ label, required, children, wide = false }) {
  return (
    <label className={`form-field ${wide ? "wide" : ""}`}>
      <span>{label}{required ? <em>*</em> : null}</span>
      {children}
    </label>
  );
}

export function SearchFilters({ filters, updateFilters, onSearch, onReset, loading, demoMode }) {
  const [advanced, setAdvanced] = useState(false);
  const [lookups, setLookups] = useState({ brands: [], zones: [], metro: [] });

  useEffect(() => {
    if (!advanced || demoMode || !filters.cityId) return;
    let active = true;
    Promise.all(["brands", "zones", "metro"].map((kind) => api.lookup(kind, filters.cityId).catch(() => ({ data: [] }))))
      .then(([brands, zones, metro]) => {
        if (active) setLookups({ brands: brands.data, zones: zones.data, metro: metro.data });
      });
    return () => { active = false; };
  }, [advanced, demoMode, filters.cityId]);

  return (
    <aside className="filter-panel">
      <div className="panel-title">酒店查询参数</div>
      <div className="form-grid">
        <Field label="入住城市" required wide>
          <div className="input-like"><span>{filters.cityName ? `${filters.cityName} · 城市 ID ${filters.cityId}` : "请先在顶部选择目的地"}</span><IconChevronDown size={16} /></div>
        </Field>
        <Field label="入住日期" required>
          <input type="date" value={filters.checkInDate} onChange={(event) => updateFilters({ checkInDate: event.target.value })} />
        </Field>
        <Field label="退房日期" required>
          <input type="date" value={filters.checkOutDate} onChange={(event) => updateFilters({ checkOutDate: event.target.value })} />
        </Field>
        <Field label="房间数">
          <select value={filters.roomQuantity} onChange={(event) => updateFilters({ roomQuantity: Number(event.target.value) })}>
            {[1, 2, 3, 4, 5].map((value) => <option key={value} value={value}>{value} 间</option>)}
          </select>
        </Field>
        <Field label="住客数（每间）">
          <select value={filters.guestQuantity} onChange={(event) => updateFilters({ guestQuantity: Number(event.target.value) })}>
            {[1, 2, 3, 4].map((value) => <option key={value} value={value}>{value} 成人</option>)}
          </select>
        </Field>
        <Field label="关键词" wide>
          <div className="counted-input"><input value={filters.keyword} maxLength={50} onChange={(event) => updateFilters({ keyword: event.target.value })} placeholder="酒店名 / 地标 / 商业区 / 地铁站" /><small>{filters.keyword.length}/50</small></div>
        </Field>
        <Field label="价格范围（CNY）" wide>
          <div className="range-fields"><input inputMode="numeric" value={filters.lowPrice} onChange={(event) => updateFilters({ lowPrice: event.target.value })} placeholder="最低价" /><span>–</span><input inputMode="numeric" value={filters.highPrice} onChange={(event) => updateFilters({ highPrice: event.target.value })} placeholder="最高价" /></div>
        </Field>
        <Field label="星级">
          <select value={filters.stars[0] || ""} onChange={(event) => updateFilters({ stars: event.target.value ? [Number(event.target.value)] : [] })}>
            <option value="">全部星级</option>
            {[5, 4, 3, 2].map((value) => <option key={value} value={value}>{value} 星</option>)}
          </select>
        </Field>
        <Field label="排序方式">
          <select value={filters.sortType} onChange={(event) => updateFilters({ sortType: event.target.value })}>
            <option value="DEFAULT">推荐排序</option>
            <option value="MIN_PRICE">价格排序</option>
            <option value="STAR">星级排序</option>
            <option value="CUSTOMER_RATINGS">评分排序</option>
          </select>
        </Field>
      </div>
      <button type="button" className="advanced-toggle" onClick={() => setAdvanced((value) => !value)}>
        <IconAdjustmentsHorizontal size={17} />高级筛选<span>{advanced ? "收起" : "展开"}</span>
      </button>
      {advanced ? (
        <div className="advanced-panel">
          <div className="check-grid">
            {[
              ["onlyAgreement", "仅看协议酒店"], ["onlyBayerPreferred", "拜耳优选"], ["hasBreakfast", "含早餐"], ["freeCancel", "免费取消"],
              ["hasParking", "停车场"], ["hasFitnessCenter", "健身中心"], ["hasSwimmingPool", "游泳池"],
            ].map(([key, label]) => (
              <label className="check-field" key={key}><input type="checkbox" checked={filters[key]} onChange={(event) => updateFilters({ [key]: event.target.checked })} />{label}</label>
            ))}
          </div>
          <Field label="商业区" wide>
            <select value={filters.zoneIds[0] || ""} onChange={(event) => updateFilters({ zoneIds: event.target.value ? [Number(event.target.value)] : [] })}>
              <option value="">全部商业区</option>
              {lookups.zones.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
            </select>
          </Field>
          <Field label="酒店品牌" wide>
            <select value={filters.brandIds[0] || ""} onChange={(event) => updateFilters({ brandIds: event.target.value ? [Number(event.target.value)] : [] })}>
              <option value="">全部品牌</option>
              {lookups.brands.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
            </select>
          </Field>
          <Field label="地铁线路" wide>
            <select value={filters.metroId} onChange={(event) => updateFilters({ metroId: event.target.value })}>
              <option value="">全部地铁线路</option>
              {lookups.metro.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
            </select>
          </Field>
        </div>
      ) : null}
      <div className="form-actions">
        <button className="primary-button" type="button" disabled={loading || !filters.cityId} onClick={onSearch}>{loading ? "查询中…" : "搜索酒店"}</button>
        <button className="reset-button" type="button" onClick={onReset}><IconRefresh size={16} />清空</button>
      </div>
    </aside>
  );
}
