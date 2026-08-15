import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { IconBuildingSkyscraper, IconBuildingStore, IconBuildingWarehouse, IconChevronDown, IconFlag, IconMapPin, IconSearch, IconTrain, IconX } from "@tabler/icons-react";
import { api } from "../../lib/api.js";

const typeMeta = {
  CITY: ["城市", IconBuildingSkyscraper],
  LANDMARK: ["地标", IconFlag],
  ZONE: ["商业区", IconBuildingStore],
  METRO: ["地铁", IconTrain],
  METRO_STATION: ["地铁站", IconTrain],
  HOTEL: ["酒店", IconBuildingWarehouse],
  HOTEL_BRAND: ["品牌", IconMapPin],
  CORP_PLACE: ["企业地标", IconBuildingStore],
  PLAIN_TEXT: ["百度联想", IconSearch],
};

const popularCities = [
  { id: 2, cityId: 2, cityName: "上海", name: "上海", type: "CITY" },
  { id: 1, cityId: 1, cityName: "北京", name: "北京", type: "CITY" },
  { id: 32, cityId: 32, cityName: "广州", name: "广州", type: "CITY" },
  { id: 30, cityId: 30, cityName: "深圳", name: "深圳", type: "CITY" },
  { id: 6, cityId: 6, cityName: "大连", name: "大连", type: "CITY" },
];

export function SearchBar({ demoMode, initialSuggestions, destination, onSelect, onKeywordSelect, onClear, onRequestStart, onRequest, resetKey }) {
  const [keyword, setKeyword] = useState("");
  const [submittedSearch, setSubmittedSearch] = useState({ query: "", revision: 0 });
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("keyword");
  const [cityPickerOpen, setCityPickerOpen] = useState(false);
  const [cityKeyword, setCityKeyword] = useState("");
  const deferredCityKeyword = useDeferredValue(cityKeyword);
  const [cityItems, setCityItems] = useState(popularCities);
  const [cityLoading, setCityLoading] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!resetKey) return;
    setKeyword("");
    setSubmittedSearch({ query: "", revision: 0 });
    setItems([]);
    setOpen(false);
    setCityPickerOpen(false);
    setCityKeyword("");
  }, [resetKey]);

  useEffect(() => {
    const query = submittedSearch.query;
    if (!query || keyword.trim() !== query) return undefined;
    if (demoMode) {
      setItems(initialSuggestions);
      setOpen(true);
      return undefined;
    }
    if (mode === "keyword" && !destination?.cityId) {
      setItems([]);
      setOpen(false);
      return undefined;
    }
    const controller = new AbortController();
    (async () => {
      setLoading(true);
      try {
        const requestInfo = mode === "fuzzy"
          ? { endpoint: "SuggestDestination", request: { keyword: query, searchRange: "DOMESTIC", onlyGeoData: false, resultTypes: ["LANDMARK", "CORP_PLACE", "PLAIN_TEXT"] } }
          : { endpoint: "SuggestKeyword", request: { cityId: destination.cityId, keyword: query, countryId: 1, language: "ZH_CN" } };
        onRequestStart?.(requestInfo);
        const response = mode === "fuzzy"
          ? await api.suggestFuzzyLocations(query, controller.signal)
          : await api.suggestKeywords(destination.cityId, query, controller.signal);
        if (controller.signal.aborted) return;
        setItems(response.data);
        setOpen(true);
        await onRequest?.(response.requestId);
      } catch (error) {
        if (error.name !== "AbortError") setItems([]);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    })();
    return () => {
      controller.abort();
    };
  }, [demoMode, destination?.cityId, initialSuggestions, keyword, mode, onRequest, onRequestStart, submittedSearch]);

  useEffect(() => {
    if (!cityPickerOpen) return undefined;
    const query = deferredCityKeyword.trim();
    if (!query) {
      setCityItems(popularCities);
      return undefined;
    }
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setCityLoading(true);
      try {
        const response = await api.geoCities({ query, pageSize: 12 }, controller.signal);
        setCityItems(response.data.items);
      } catch (error) {
        if (error.name !== "AbortError") setCityItems([]);
      } finally {
        setCityLoading(false);
      }
    }, 250);
    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [cityPickerOpen, deferredCityKeyword, onRequest, onRequestStart]);

  const keywordItems = useMemo(() => {
    const selectedCityId = Number(destination?.cityId);
    const seen = new Set();
    return items
      .filter((item) => Number(item.cityId) === selectedCityId)
      .filter((item) => ["LANDMARK", "ZONE", "METRO_STATION", "HOTEL"].includes(item.type))
      .filter((item) => {
        const key = `${item.type}:${item.id ?? ""}:${item.name}:${item.cityId}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .slice(0, 20);
  }, [destination?.cityId, items]);

  const fuzzyItems = useMemo(() => items.filter((item) => ["LANDMARK", "CORP_PLACE", "PLAIN_TEXT"].includes(item.type)).slice(0, 20), [items]);

  function changeMode(nextMode) {
    setMode(nextMode);
    setSubmittedSearch({ query: "", revision: 0 });
    setLoading(false);
    setItems([]);
    setOpen(false);
    setCityPickerOpen(false);
  }

  function updateKeyword(nextKeyword) {
    setKeyword(nextKeyword);
    setItems([]);
    setOpen(false);
    setLoading(false);
  }

  function submitKeywordSearch() {
    const query = keyword.trim();
    if (query.length < 2 || (mode === "keyword" && !destination?.cityId)) return;
    setItems([]);
    setOpen(false);
    setSubmittedSearch((current) => ({ query, revision: current.revision + 1 }));
  }

  function chooseCity(city) {
    onSelect(city);
    setCityPickerOpen(false);
    setCityKeyword("");
    setCityItems(popularCities);
    setKeyword("");
    setSubmittedSearch({ query: "", revision: 0 });
    setItems([]);
    setOpen(false);
    setLoading(false);
    window.setTimeout(() => inputRef.current?.focus(), 0);
  }

  return (
    <section className="global-search" aria-label="目的地与关键词搜索">
      <div className="search-mode-row" role="tablist" aria-label="搜索方式">
        <button type="button" role="tab" aria-selected={mode === "keyword"} className={mode === "keyword" ? "active" : ""} onClick={() => changeMode("keyword")}>关键词查询</button>
        <button type="button" role="tab" aria-selected={mode === "fuzzy"} className={mode === "fuzzy" ? "active" : ""} onClick={() => changeMode("fuzzy")}>模糊地点</button>
        <span>{mode === "fuzzy" ? "输入完成后按 Enter · SuggestDestination" : "当前城市内 · 地标 / 商业区 / 地铁站 / 酒店 · 按 Enter 查询"}</span>
      </div>
      <div className={`query-input-row ${mode === "keyword" ? "with-city" : ""}`}>
        {mode === "keyword" ? (
          <button
            type="button"
            className={`city-context-button ${destination?.cityId ? "selected" : "required"}`}
            aria-label={destination?.cityId ? `当前城市 ${destination.cityName || destination.name}` : "选择城市"}
            onClick={() => { setCityPickerOpen((value) => !value); setOpen(false); }}
          >
            <span><small>查询城市</small><strong>{destination?.cityId ? (destination.type === "COUNTY" ? `${destination.name}（${destination.cityName}）` : (destination.cityName || destination.name)) : "选择城市"}</strong></span>
            <IconChevronDown size={16} />
          </button>
        ) : null}
        <div className={`search-input-wrap ${open ? "focused" : ""}`}>
          <IconSearch size={21} stroke={1.8} />
          <input
            ref={inputRef}
            value={keyword}
            disabled={mode === "keyword" && !destination?.cityId}
            onChange={(event) => updateKeyword(event.target.value)}
            onKeyDown={(event) => { if (event.key === "Enter" && !event.nativeEvent.isComposing) { event.preventDefault(); submitKeywordSearch(); } }}
            onFocus={() => setCityPickerOpen(false)}
            aria-label={mode === "fuzzy" ? "输入地点关键词进行模糊查询" : "输入地标、商业区、地铁站或酒店关键词"}
            placeholder={mode === "fuzzy" ? "输入地标、企业地点或地址关键词" : destination?.cityId ? "输入地标、商业区、地铁站或酒店关键词" : "选择城市后输入关键词"}
          />
          {loading ? <span className="search-loading">查询中</span> : null}
          <button type="button" className="icon-button" aria-label="清空查询条件和结果" onClick={() => { setKeyword(""); setSubmittedSearch({ query: "", revision: 0 }); setItems([]); setOpen(false); setLoading(false); setCityPickerOpen(false); onClear(); }}>
            <IconX size={18} stroke={1.6} />
          </button>
        </div>
      </div>
      {cityPickerOpen && mode === "keyword" ? (
        <div className="city-picker-panel">
          <div className="city-picker-header">
            <div><strong>选择查询城市</strong><span>支持城市与县级城市；县级城市按所属城市查询</span></div>
            <button type="button" className="icon-button" aria-label="关闭城市选择" onClick={() => setCityPickerOpen(false)}><IconX size={17} /></button>
          </div>
          <div className="city-picker-search"><IconSearch size={17} /><input value={cityKeyword} onChange={(event) => setCityKeyword(event.target.value)} placeholder="输入城市或县级城市名称" aria-label="搜索城市或县级城市" />{cityLoading ? <span>查询中</span> : null}</div>
          <div className="city-picker-list">
            {cityItems.length ? cityItems.map((city) => (
              <button type="button" key={`${city.resultType || city.type}-${city.resultId || city.id}`} onClick={() => chooseCity(city)}><IconBuildingSkyscraper size={16} /><strong>{city.resultName || city.name || city.cityName}</strong><small>{city.resultType === "COUNTY" ? `县级城市 · ${city.parentCityName} · 城市 ID ${city.parentCityId}` : `城市 ID ${city.cityId || city.id}`}</small></button>
            )) : <div className="city-picker-empty">没有找到城市或县级城市</div>}
          </div>
        </div>
      ) : null}
      {open ? (
        mode === "fuzzy" ? (
          <div className="suggestion-panel fuzzy-results-panel">
            <div className="fuzzy-results-header"><strong>模糊地点结果</strong><span>{fuzzyItems.length} 条</span></div>
            <div className="fuzzy-results-list">
              {fuzzyItems.length ? fuzzyItems.map((item) => {
                const [label, Icon] = typeMeta[item.type] || [item.type, IconMapPin];
                return (
                  <button
                    type="button"
                    className="fuzzy-result-item"
                    key={`${item.type}-${item.id}-${item.name}`}
                    onClick={() => { if (item.cityId) onSelect(item); setKeyword(item.name); setOpen(false); }}
                  >
                    <Icon size={18} stroke={1.6} />
                    <span className="fuzzy-result-main"><strong>{item.name}</strong><small>{item.address || item.zoneName || "暂无详细地址"}</small></span>
                    <span className="fuzzy-result-city">{item.cityName || "国内"}</span>
                    <span className={`result-type type-${item.type.toLowerCase()}`}>{label}</span>
                  </button>
                );
              }) : <div className="suggestion-empty">没有找到地标、企业地标或百度联想结果</div>}
            </div>
          </div>
        ) : <div className="suggestion-panel fuzzy-results-panel keyword-results-panel">
          <div className="fuzzy-results-header"><strong>关键词结果</strong><span>{keywordItems.length} 条</span></div>
          <div className="fuzzy-results-list">
            {keywordItems.length ? keywordItems.map((item, index) => {
              const [label, Icon] = typeMeta[item.type] || [item.type, IconMapPin];
              return (
                <button
                  type="button"
                  className="keyword-result-item"
                  key={`${item.type}-${item.id}-${item.name}`}
                  onClick={() => { onKeywordSelect?.(item); setKeyword(item.name); setOpen(false); }}
                >
                  <span className="result-rank">{index + 1}</span>
                  <Icon size={18} stroke={1.6} />
                  <span className="fuzzy-result-main"><strong>{item.name}</strong><small>{item.address || item.zoneName || "暂无详细地址"}</small></span>
                  <span className="fuzzy-result-city">{item.cityName || "国内"}</span>
                  <span className={`result-type type-${item.type.toLowerCase()}`}>{label}</span>
                </button>
              );
            }) : <div className="suggestion-empty">当前城市内没有找到地标、商业区、地铁站或酒店记录</div>}
          </div>
        </div>
      ) : null}
    </section>
  );
}
