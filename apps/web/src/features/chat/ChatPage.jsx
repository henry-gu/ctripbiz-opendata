import { useState } from "react";
import { IconCode, IconDatabase, IconMapPin, IconMessageChatbot, IconSend, IconSparkles } from "@tabler/icons-react";
import { api } from "../../lib/api.js";

const blankState = { city: "", cityId: null, cityName: "", countyName: "", location: "", keyword: "", locationUnresolved: false, checkInDate: "", checkOutDate: "", minStar: null, lowPrice: null, highPrice: null, missing: ["city", "location", "checkInDate", "checkOutDate"] };

function ready(state, candidates) {
  return state.cityId && state.keyword && state.checkInDate && state.checkOutDate && !state.missing?.length && !candidates.length && !state.locationUnresolved;
}

function HotelCards({ hotels, onApply, onRestart }) {
  if (!hotels.length) return null;
  return <section className="chat-results"><header><strong>为您找到 {hotels.length} 家可订酒店</strong><div><button type="button" onClick={onRestart}>开始新的推荐</button><button type="button" onClick={onApply}>带入酒店查询</button></div></header>{hotels.map((hotel) => <article key={hotel.id}><strong>{hotel.name}</strong>{hotel.tags?.bayerPreferred ? <em className="bayer-tag">拜耳优选</em> : null}<span>{hotel.address}</span><small>{hotel.price ? `¥ ${hotel.price} 起` : "价格待确认"} · {hotel.star || "—"} 星</small></article>)}</section>;
}

function CandidateChoices({ cityCandidates, candidates, onChooseCity, onChooseLocation }) {
  if (!cityCandidates.length && !candidates.length) return null;
  return <section className="candidate-card chat-candidates" aria-live="polite">
    {cityCandidates.length ? <><strong>请选择目的城市</strong><span>请选择与行程最符合的城市后继续。</span>{cityCandidates.map((item) => <button type="button" key={`${item.resultType}-${item.resultId}`} onClick={() => onChooseCity(item)}><IconMapPin size={15} />{item.resultName}{item.parentCityName ? `（${item.parentCityName}）` : ""}</button>)}</> : null}
    {candidates.length ? <><strong>请选择附近位置</strong><span>请选择一个地点，我会按该位置和已提供的日期查找可订酒店。</span>{candidates.map((item) => <button type="button" key={`${item.type}-${item.id}-${item.name}`} onClick={() => onChooseLocation(item)}><IconMapPin size={15} />{item.name}<small>{item.type}</small></button>)}</> : null}
  </section>;
}

export function ChatPage({ onApplyToHotels }) {
  const [messages, setMessages] = useState([{ role: "assistant", content: "您好，我可以帮您推荐国内可订酒店。请告诉我目的城市、酒店附近的位置，以及入住和退房日期。" }]);
  const [input, setInput] = useState("");
  const [state, setState] = useState(blankState);
  const [candidates, setCandidates] = useState([]);
  const [cityCandidates, setCityCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hotels, setHotels] = useState([]);
  const [debugEntries, setDebugEntries] = useState([]);
  const [ctripLogs, setCtripLogs] = useState([]);

  function restartRecommendation() {
    setMessages([{ role: "assistant", content: "好的，我们开始新的酒店推荐。请告诉我目的城市、附近位置，以及入住和退房日期。" }]);
    setInput(""); setState(blankState); setCandidates([]); setCityCandidates([]); setError(""); setHotels([]); setDebugEntries([]); setCtripLogs([]);
  }

  async function searchHotels(nextState) {
    setLoading(true); setError("");
    try {
      const response = await api.chatSearch({ cityId: nextState.cityId, checkInDate: nextState.checkInDate, checkOutDate: nextState.checkOutDate, keyword: nextState.keyword, minStar: nextState.minStar, lowPrice: nextState.lowPrice, highPrice: nextState.highPrice });
      setHotels(response.data.hotels);
      setCtripLogs((current) => [...current, { endpoint: "getHotelDataV2", requestId: response.requestId, request: { cityId: nextState.cityId, checkInDate: nextState.checkInDate, checkOutDate: nextState.checkOutDate, keyword: nextState.keyword, minStar: nextState.minStar, lowPrice: nextState.lowPrice, highPrice: nextState.highPrice }, response: { count: response.data.count, hotels: response.data.hotels }, meta: response.meta }]);
      setMessages((current) => [...current, { role: "assistant", content: response.data.hotels.length ? "已为您查询到可订酒店，结果如下。" : "暂未找到可订酒店，您可以换一个附近地点或调整日期再试。" }]);
    } catch (caught) { setError(caught.message); } finally { setLoading(false); }
  }

  async function send(text = input) {
    const message = text.trim(); if (!message || loading) return;
    setInput(""); setError(""); setLoading(true); setCandidates([]); setCityCandidates([]); setHotels([]); setDebugEntries([]); setCtripLogs([]);
    const history = messages.slice(-8);
    setMessages((current) => [...current, { role: "user", content: message }, { role: "assistant", content: "", streaming: true }]);
    try {
      const response = await fetch("/api/v1/chat/turn", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ message, state, history }) });
      if (!response.ok || !response.body) throw new Error("智能推荐服务暂时不可用");
      const reader = response.body.getReader(); const decoder = new TextDecoder(); let buffer = ""; let automaticSearch = null;
      while (true) {
        const { done, value } = await reader.read(); if (done) break;
        buffer += decoder.decode(value, { stream: true }); const packets = buffer.split("\n\n"); buffer = packets.pop() || "";
        for (const packet of packets) {
          const event = packet.match(/^event: (.+)$/m)?.[1]; const data = packet.match(/^data: (.+)$/m)?.[1]; if (!event || !data) continue;
          const payload = JSON.parse(data);
          if (event === "token") setMessages((current) => current.map((item, index) => index === current.length - 1 ? { ...item, content: item.content + payload.text } : item));
          if (event === "state" || event === "done") { setState(payload.state); setCandidates(payload.candidates || []); setCityCandidates(payload.cityCandidates || []); if (event === "done" && ready(payload.state, payload.candidates || [])) automaticSearch = payload.state; }
          if (event === "debug") setDebugEntries((current) => [...current, payload]);
          if (event === "ctrip") setCtripLogs((current) => [...current, payload]);
          if (event === "error") setError(payload.error?.message || "智能推荐服务异常");
        }
      }
      if (automaticSearch) await searchHotels(automaticSearch);
    } catch (caught) { setError(caught.message); } finally {
      setLoading(false);
      setMessages((current) => current.map((item) => item.streaming ? { ...item, streaming: false, content: item.content || "请补充上述信息后再试一次。" } : item));
    }
  }

  function chooseCity(item) {
    const county = item.resultType === "COUNTY";
    setState((current) => ({ ...current, city: item.resultName || item.cityName, cityId: Number(county ? item.parentCityId : item.cityId), cityName: county ? item.parentCityName : item.cityName, countyName: county ? item.resultName : "", keyword: county ? item.resultName : current.keyword, missing: current.missing.filter((value) => value !== "city") }));
    setCityCandidates([]);
    setMessages((current) => [...current, { role: "assistant", content: "好的，目的城市已确定。您想住在哪个区域、地标或地铁站附近？" }]);
  }

  function chooseCandidate(item) {
    const next = { ...state, keyword: item.name, location: item.name, locationUnresolved: false, missing: state.missing.filter((value) => value !== "location") };
    setState(next); setCandidates([]);
    setMessages((current) => [...current, { role: "assistant", content: ready(next, []) ? "地点和日期都已齐全，正在为您查询可订酒店。" : "好的，地点已确定。您计划哪天入住、哪天退房？" }]);
    if (ready(next, [])) searchHotels(next);
  }

  const debugPanel = <details className="chat-debug"><summary><IconCode size={15} />LLM 调试信息（仅本次对话）</summary>{debugEntries.length ? debugEntries.map((entry, index) => <section key={index}><strong>{entry.stage}</strong><pre>{JSON.stringify(entry, null, 2)}</pre></section>) : <p>发送消息后显示请求与响应；授权信息不会记录或显示。</p>}</details>;
  const ctripPanel = <details className="chat-debug ctrip-debug"><summary><IconDatabase size={15} />携程 API 调用日志（仅本次对话）</summary>{ctripLogs.length ? ctripLogs.map((entry, index) => <section key={index}><strong>{entry.endpoint} · {entry.requestId || "请求中"}</strong><pre>{JSON.stringify(entry, null, 2)}</pre></section>) : <p>地点匹配和酒店查询后显示请求参数、响应摘要、耗时与缓存状态。</p>}</details>;
  return <section className="chat-page"><header className="chat-heading"><div><div className="geo-kicker"><IconMessageChatbot size={16} />智能推荐</div><h1>对话式酒店推荐</h1><p>告诉我目的城市、酒店附近的位置和入住日期，符合条件后会直接显示可订酒店。</p></div></header><div className="chat-layout"><div className="chat-thread">{messages.map((item, index) => <article className={`chat-message ${item.role}`} key={index}><IconSparkles size={17} /><div>{item.content || (item.streaming ? "正在思考…" : "")}</div></article>)}<CandidateChoices cityCandidates={cityCandidates} candidates={candidates} onChooseCity={chooseCity} onChooseLocation={chooseCandidate} /><HotelCards hotels={hotels} onApply={() => onApplyToHotels(state, hotels)} onRestart={restartRecommendation} />{error ? <div className="error-banner">{error}</div> : null}<div className="chat-input"><textarea value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); send(); } }} placeholder="例如：下周去上海出差，住前滩广场附近；三星级以上，周二入住、周五退房" /><button type="button" onClick={() => send()} disabled={loading || !input.trim()}><IconSend size={18} /></button></div></div></div>{debugPanel}{ctripPanel}</section>;
}
