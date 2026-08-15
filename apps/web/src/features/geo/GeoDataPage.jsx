import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IconChevronDown, IconChevronRight, IconDatabase, IconDownload, IconRefresh, IconSearch } from "@tabler/icons-react";
import { api } from "../../lib/api.js";

function formatTime(value) {
  return value ? new Intl.DateTimeFormat("zh-CN", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value)) : "尚未获取";
}

function DetailList({ title, items, nameKey }) {
  if (!items?.length) return null;
  return <div className="geo-detail-list"><strong>{title}（{items.length}）</strong><span>{items.map((item) => item[nameKey]).filter(Boolean).join("、") || "—"}</span></div>;
}

function ProvinceDetail({ provinceId }) {
  const detail = useQuery({ queryKey: ["geoProvince", provinceId], queryFn: () => api.geoProvince(provinceId), enabled: Boolean(provinceId) });
  if (!provinceId) return <div className="geo-empty">选择一个省份查看城市、区县与交通站信息</div>;
  if (detail.isLoading) return <div className="geo-empty">正在加载省份信息…</div>;
  if (detail.isError) return <div className="geo-empty error">{detail.error.message}</div>;
  const province = detail.data?.data;
  return (
    <div className="province-detail">
      <header><div><strong>{province.provinceName}</strong><span>{province.provinceEnName || ""}</span></div><small>{province.prefectureLevelCityInfoList.length} 个标准城市</small></header>
      {province.prefectureLevelCityInfoList.map((city) => (
        <details key={city.cityId} className="city-detail">
          <summary><span><strong>{city.cityName}</strong><small>城市 ID {city.cityId} · {city.cityPinYin || "无拼音"}</small></span><IconChevronDown size={16} /></summary>
          <div className="city-detail-content">
            <div className="geo-facts"><span>英文名<strong>{city.cityEnName || "—"}</strong></span><span>行政区划<strong>{city.districtCode || "—"}</strong></span><span>城市代码<strong>{city.cityCode || "—"}</strong></span></div>
            <DetailList title="区县" items={city.districtList} nameKey="districtName" />
            <DetailList title="县级市" items={city.countyList} nameKey="countyName" />
            <DetailList title="机场" items={city.stationInfo?.airportList} nameKey="airportName" />
            <DetailList title="火车站" items={city.stationInfo?.trainStationList} nameKey="trainName" />
            <DetailList title="汽车站" items={city.stationInfo?.busStationList} nameKey="busName" />
          </div>
        </details>
      ))}
    </div>
  );
}

export function GeoDataPage() {
  const queryClient = useQueryClient();
  const [tab, setTab] = useState("cities");
  const [query, setQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(1);
  const [provinceId, setProvinceId] = useState(null);
  const status = useQuery({ queryKey: ["geoStatus"], queryFn: api.geoStatus, refetchInterval: (result) => result?.state?.data?.state === "missing" ? 1000 : false });
  const cities = useQuery({ queryKey: ["geoCities", query, sortOrder, page], queryFn: () => api.geoCities({ query, sortOrder, page }), enabled: tab === "cities" });
  const provinces = useQuery({ queryKey: ["geoProvinces"], queryFn: api.geoProvinces, enabled: tab === "hierarchy" });
  const raw = useQuery({ queryKey: ["geoRaw"], queryFn: api.geoRaw, enabled: tab === "raw" });
  const refresh = useMutation({
    mutationFn: api.refreshGeo,
    onSuccess: () => queryClient.invalidateQueries(),
  });
  const cityData = cities.data?.data;
  const rawText = useMemo(() => raw.data ? JSON.stringify(raw.data.data, null, 2) : "", [raw.data]);
  const statusData = status.data?.data;

  useEffect(() => {
    if (cities.isSuccess) queryClient.invalidateQueries({ queryKey: ["geoStatus"] });
  }, [cities.dataUpdatedAt, cities.isSuccess, queryClient]);

  function changeQuery(value) {
    setQuery(value);
    setPage(1);
  }

  return (
    <div className="geo-page">
      <header className="geo-page-header">
        <div><div className="geo-kicker"><IconDatabase size={16} />基础数据</div><h1>中国标准地理信息</h1><p>本地保存中国省、市、区县与交通站基础数据；酒店查询继续使用实时接口。</p></div>
        <div className="geo-status-card"><span className={`status-dot ${statusData?.state === "ready" ? "ready" : ""}`} /><div><strong>{statusData?.state === "ready" ? "本地数据已就绪" : statusData?.state === "refreshing" || cities.isLoading ? "正在获取数据" : "等待首次获取"}</strong><small>上次更新：{formatTime(statusData?.updatedAt)}</small></div><button type="button" className="reset-button" disabled={refresh.isPending} onClick={() => refresh.mutate()}><IconRefresh size={15} />{refresh.isPending ? "更新中…" : "更新数据"}</button></div>
      </header>
      {refresh.isError || cities.isError ? <div className="error-banner"><span>{refresh.error?.message || cities.error?.message || "基础数据获取失败"}</span></div> : null}
      <div className="geo-summary"><span>标准城市<strong>{statusData?.cityCount ?? cityData?.total ?? "—"}</strong></span><span>省级区域<strong>{statusData?.provinceCount ?? "—"}</strong></span><span>数据版本<strong>v{statusData?.version ?? 1}</strong></span></div>
      <div className="geo-tabs" role="tablist" aria-label="基础数据视图"><button type="button" role="tab" aria-selected={tab === "cities"} className={tab === "cities" ? "active" : ""} onClick={() => setTab("cities")}>城市数据</button><button type="button" role="tab" aria-selected={tab === "hierarchy"} className={tab === "hierarchy" ? "active" : ""} onClick={() => setTab("hierarchy")}>全量层级</button><button type="button" role="tab" aria-selected={tab === "raw"} className={tab === "raw" ? "active" : ""} onClick={() => setTab("raw")}>原始 JSON</button></div>
      {tab === "cities" ? <section className="geo-panel">
        <div className="geo-toolbar"><label><IconSearch size={16} /><input value={query} onChange={(event) => changeQuery(event.target.value)} placeholder="搜索城市、县或县级城市" /></label><button type="button" className="reset-button" onClick={() => { setSortOrder((value) => value === "asc" ? "desc" : "asc"); setPage(1); }}>名称 {sortOrder === "asc" ? "↑" : "↓"}</button><span>{cityData?.total ?? 0} 条</span></div>
        <div className="table-scroll"><table className="geo-table"><thead><tr><th>名称</th><th>ID</th><th>级别</th><th>所属城市</th><th>所属省份</th><th>英文名称</th><th>拼音</th><th>行政区划代码</th></tr></thead><tbody>{cities.isLoading ? <tr><td colSpan="8" className="geo-table-empty">正在获取中国全量标准城市数据…</td></tr> : cityData?.items?.length ? cityData.items.map((city) => <tr key={`${city.resultType || "CITY"}-${city.resultId || city.cityId}`}><td><strong>{city.resultName || city.cityName}</strong></td><td><code>{city.resultId || city.cityId}</code></td><td><span className={`geo-level ${city.resultType === "COUNTY" ? "county" : "city"}`}>{city.resultType === "COUNTY" ? "县级城市" : "城市"}</span></td><td>{city.parentCityName ? <><strong>{city.parentCityName}</strong><small className="geo-parent-id">城市 ID {city.parentCityId}</small></> : "—"}</td><td>{city.provinceName}</td><td>{city.cityEnName || "—"}</td><td>{city.cityPinYin || "—"}</td><td>{city.districtCode || "—"}</td></tr>) : <tr><td colSpan="8" className="geo-table-empty">没有匹配的城市或县级城市</td></tr>}</tbody></table></div>
        <div className="pagination"><button type="button" disabled={page <= 1 || cities.isLoading} onClick={() => setPage((value) => value - 1)}>‹</button><span>第 {page} 页</span><button type="button" disabled={!cityData || page * cityData.pageSize >= cityData.total || cities.isLoading} onClick={() => setPage((value) => value + 1)}>›</button></div>
      </section> : null}
      {tab === "hierarchy" ? <section className="geo-hierarchy"><aside className="geo-province-list"><strong>省级区域</strong>{provinces.isLoading ? <span>正在加载…</span> : provinces.data?.data?.map((province) => <button type="button" key={province.provinceId} className={Number(provinceId) === Number(province.provinceId) ? "active" : ""} onClick={() => setProvinceId(province.provinceId)}><span>{province.provinceName}</span><small>{province.cityCount} 城市<IconChevronRight size={14} /></small></button>)}</aside><section className="geo-panel"><ProvinceDetail provinceId={provinceId} /></section></section> : null}
      {tab === "raw" ? <section className="geo-panel raw-panel"><header><div><strong>完整标准地理信息响应</strong><span>{rawText.length ? `${rawText.length.toLocaleString()} 字符` : "按需加载"}</span></div><button type="button" className="reset-button" disabled={!rawText} onClick={() => { const blob = new Blob([rawText], { type: "application/json" }); const link = document.createElement("a"); link.href = URL.createObjectURL(blob); link.download = "geo-full.json"; link.click(); URL.revokeObjectURL(link.href); }}><IconDownload size={15} />下载 JSON</button></header>{raw.isLoading ? <div className="geo-empty">正在加载完整 JSON…</div> : raw.isError ? <div className="geo-empty error">{raw.error.message}</div> : <pre className="raw-json">{rawText}</pre>}</section> : null}
    </div>
  );
}
