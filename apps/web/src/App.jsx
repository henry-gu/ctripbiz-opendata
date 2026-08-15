import { useCallback, useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AppShell } from "./components/AppShell.jsx";
import { SearchBar } from "./features/search/SearchBar.jsx";
import { SearchFilters } from "./features/hotels/SearchFilters.jsx";
import { ResultsTable } from "./features/hotels/ResultsTable.jsx";
import { DiagnosticsPanel } from "./features/diagnostics/DiagnosticsPanel.jsx";
import { HotelDetailDrawer } from "./features/hotels/HotelDetailDrawer.jsx";
import { GeoDataPage } from "./features/geo/GeoDataPage.jsx";
import { ChatPage } from "./features/chat/ChatPage.jsx";
import { SettingsPage } from "./features/settings/SettingsPage.jsx";
import { api, ApiError } from "./lib/api.js";
import { demoDiagnostics, demoHotels, demoSuggestions } from "./lib/demo.js";

function localDateAfter(days) {
  const date = new Date();
  date.setHours(12, 0, 0, 0);
  date.setDate(date.getDate() + days);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function createInitialFilters() {
  return {
    cityId: 2,
    cityName: "上海",
    checkInDate: localDateAfter(1),
    checkOutDate: localDateAfter(2),
    roomQuantity: 1,
    guestQuantity: 1,
    keyword: "",
    lowPrice: "",
    highPrice: "",
    stars: [],
    sortType: "DEFAULT",
    onlyAgreement: false,
    hasBreakfast: false,
    freeCancel: false,
    hasParking: false,
    hasFitnessCenter: false,
    hasSwimmingPool: false,
    brandIds: [],
    zoneIds: [],
    metroId: "",
  };
}

function createClearedFilters() {
  return {
    ...createInitialFilters(),
    cityId: "",
    cityName: "",
  };
}

export function App() {
  const demoMode = useMemo(() => new URLSearchParams(window.location.search).get("demo") === "1", []);
  const [filters, setFilters] = useState(createInitialFilters);
  const [destination, setDestination] = useState({ id: 2, cityId: 2, cityName: "上海", name: "上海", type: "CITY" });
  const [hotels, setHotels] = useState(demoMode ? demoHotels : []);
  const [hotelCount, setHotelCount] = useState(demoMode ? 56 : 0);
  const [hid, setHid] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [diagnostics, setDiagnostics] = useState(demoMode ? demoDiagnostics : null);
  const [detail, setDetail] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [diagnosticsOpen, setDiagnosticsOpen] = useState(true);
  const [searchResetKey, setSearchResetKey] = useState(0);
  const [activeView, setActiveView] = useState("hotels");

  const health = useQuery({ queryKey: ["health"], queryFn: api.health });

  const updateFilters = useCallback((patch) => {
    setFilters((current) => ({ ...current, ...patch }));
  }, []);

  const loadDiagnostics = useCallback(async (requestId) => {
    if (!requestId || demoMode) return;
    try {
      const result = await api.debug(requestId);
      setDiagnostics({ ...result.data, cache: null });
    } catch {
      // Keep the locally displayed request parameters if a cached diagnostic has expired.
    }
  }, [demoMode]);

  const showSearchRequest = useCallback(({ endpoint, request }) => {
    setDiagnostics({
      requestId: "请求中",
      endpoint,
      method: "POST",
      request,
      response: {},
      latencyMs: 0,
      timestamp: new Date().toISOString(),
      status: "pending",
      cache: { hit: false },
    });
  }, []);

  const handleDestination = useCallback((item) => {
    const isCounty = item.resultType === "COUNTY" || item.type === "COUNTY";
    const cityId = Number(isCounty ? item.parentCityId : (item.cityId || (item.type === "CITY" ? item.id : 0)));
    const cityName = isCounty ? item.parentCityName : (item.cityName || item.resultName || item.name);
    const selectedName = item.resultName || item.name || item.cityName;
    setDestination({ ...item, cityId, cityName, name: selectedName, type: isCounty ? "COUNTY" : (item.type || "CITY") });
    updateFilters({ cityId, cityName, ...(isCounty ? { keyword: selectedName } : {}) });
  }, [updateFilters]);

  const handleKeywordLocation = useCallback((item) => {
    updateFilters({ keyword: item.name });
  }, [updateFilters]);

  const clearDestination = useCallback(() => {
    setDestination(null);
    updateFilters({ cityId: "", cityName: "", keyword: "" });
    setHotels([]);
    setHotelCount(0);
    setHid(null);
    setPage(1);
  }, [updateFilters]);

  const clearQuery = useCallback(() => {
    setFilters(createClearedFilters());
    setDestination(null);
    setHotels([]);
    setHotelCount(0);
    setHid(null);
    setPage(1);
    setError(null);
    setDiagnostics(null);
    setDetail(null);
    setSearchResetKey((value) => value + 1);
  }, []);

  const clearResults = useCallback(() => {
    setHotels([]);
    setHotelCount(0);
    setHid(null);
    setPage(1);
    setError(null);
    setDiagnostics(null);
  }, []);

  const applyChatSearch = useCallback((chatState, chatHotels) => {
    const destinationName = chatState.countyName || chatState.cityName;
    setDestination({ id: chatState.cityId, cityId: chatState.cityId, cityName: chatState.cityName, name: destinationName, type: chatState.countyName ? "COUNTY" : "CITY" });
    updateFilters({ cityId: chatState.cityId, cityName: chatState.cityName, keyword: chatState.keyword, checkInDate: chatState.checkInDate, checkOutDate: chatState.checkOutDate });
    setHotels(chatHotels);
    setHotelCount(chatHotels.length);
    setPage(1);
    setActiveView("hotels");
  }, [updateFilters]);

  const searchHotels = useCallback(async ({ nextPage = 1, refresh = false } = {}) => {
    setLoading(true);
    setError(null);
    try {
      if (demoMode) {
        await new Promise((resolve) => setTimeout(resolve, 420));
        setHotels(demoHotels);
        setHotelCount(56);
        setPage(nextPage);
        setDiagnostics({ ...demoDiagnostics, latencyMs: 421, timestamp: new Date().toISOString(), cache: { hit: false } });
        return;
      }
      const response = await api.searchHotels({
        cityId: filters.cityId,
        checkInDate: filters.checkInDate,
        checkOutDate: filters.checkOutDate,
        roomQuantity: filters.roomQuantity,
        guestQuantity: filters.guestQuantity,
        page: nextPage,
        pageSize: 10,
        sortType: filters.sortType,
        refresh,
        filters: {
          keyword: filters.keyword,
          lowPrice: filters.lowPrice,
          highPrice: filters.highPrice,
          stars: filters.stars,
          onlyAgreement: filters.onlyAgreement,
          hasBreakfast: filters.hasBreakfast,
          freeCancel: filters.freeCancel,
          hasParking: filters.hasParking,
          hasFitnessCenter: filters.hasFitnessCenter,
          hasSwimmingPool: filters.hasSwimmingPool,
          brandIds: filters.brandIds,
          zoneIds: filters.zoneIds,
          metroId: filters.metroId,
        },
      });
      setHotels(response.data.hotels);
      setHotelCount(response.data.count);
      setHid(response.data.hid);
      setPage(nextPage);
      await loadDiagnostics(response.requestId);
    } catch (caught) {
      setError(caught instanceof ApiError ? caught.message : "查询失败，请稍后重试");
    } finally {
      setLoading(false);
    }
  }, [demoMode, filters, loadDiagnostics]);

  const openDetail = useCallback(async (hotel) => {
    setDetail({ ...hotel, preview: true });
    if (demoMode) return;
    setDetailLoading(true);
    try {
      const response = await api.hotelDetail(hotel.id, {
        checkInDate: filters.checkInDate,
        checkOutDate: filters.checkOutDate,
        roomQuantity: filters.roomQuantity,
        guestQuantity: filters.guestQuantity,
        hid,
      });
      setDetail({ ...hotel, ...response.data, preview: false });
      await loadDiagnostics(response.requestId);
    } catch (caught) {
      setError(caught instanceof ApiError ? caught.message : "酒店详情加载失败");
    } finally {
      setDetailLoading(false);
    }
  }, [demoMode, filters, hid, loadDiagnostics]);

  useEffect(() => {
    if (!destination?.cityId && destination?.type !== "CITY") return;
    updateFilters({ cityId: Number(destination.cityId || destination.id) });
  }, [destination, updateFilters]);

  return (
    <AppShell health={health.data?.data} diagnosticsOpen={diagnosticsOpen} activeView={activeView} onNavigate={setActiveView}>
      {activeView === "hotels" ? <>
      <div className="workspace">
        <SearchBar
          demoMode={demoMode}
          initialSuggestions={demoSuggestions}
          destination={destination}
          onSelect={handleDestination}
          onKeywordSelect={handleKeywordLocation}
          onClear={clearQuery}
          onRequestStart={showSearchRequest}
          onRequest={loadDiagnostics}
          resetKey={searchResetKey}
        />
        {error ? (
          <div className="error-banner" role="alert">
            <span>{error}</span>
            <button type="button" onClick={() => setError(null)}>关闭</button>
          </div>
        ) : null}
        <div className="destination-chip-row">
          {destination ? (
            <>
              <div className="destination-chip">
                <span className="pin-dot" aria-hidden="true" />
                {destination.type === "COUNTY" ? `${destination.name} · ` : ""}{filters.cityName} · 城市 ID {filters.cityId}
                <button type="button" aria-label="清除目的地" onClick={clearDestination}>×</button>
              </div>
              <button type="button" className="clear-link" onClick={clearDestination}>清除</button>
            </>
          ) : <span className="destination-empty-hint">全国地点模糊查询 · 选择结果后可查询酒店</span>}
        </div>
        <div className="query-content">
          <SearchFilters
            filters={filters}
            updateFilters={updateFilters}
            onSearch={() => searchHotels({ nextPage: 1 })}
            onReset={clearQuery}
            loading={loading}
            demoMode={demoMode}
          />
          <ResultsTable
            hotels={hotels}
            count={hotelCount}
            page={page}
            loading={loading}
            onPage={(nextPage) => searchHotels({ nextPage })}
            onDetail={openDetail}
            onRefresh={() => searchHotels({ nextPage: page, refresh: true })}
            onClear={clearResults}
          />
        </div>
      </div>
      <DiagnosticsPanel
        open={diagnosticsOpen}
        onToggle={() => setDiagnosticsOpen((value) => !value)}
        diagnostics={diagnostics}
        health={health.data?.data}
      />
      <HotelDetailDrawer detail={detail} loading={detailLoading} onClose={() => setDetail(null)} />
      </> : activeView === "geo" ? <GeoDataPage /> : activeView === "chat" ? <ChatPage onApplyToHotels={applyChatSearch} /> : <SettingsPage />}
    </AppShell>
  );
}
