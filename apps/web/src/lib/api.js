export class ApiError extends Error {
  constructor(message, code, status) {
    super(message);
    this.name = "ApiError";
    this.code = code;
    this.status = status;
  }
}

async function request(path, options = {}) {
  const response = await fetch(path, {
    ...options,
    headers: { "content-type": "application/json", ...options.headers },
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new ApiError(body.error?.message || `请求失败 (${response.status})`, body.error?.code, response.status);
  }
  return body;
}

function post(path, body, signal) {
  return request(path, { method: "POST", body: JSON.stringify(body), signal });
}

export const api = {
  health: () => request("/api/v1/system/health"),
  suggestDestinations: (keyword, signal) => post("/api/v1/destinations/suggest", { keyword }, signal),
  suggestFuzzyLocations: (keyword, signal) => post("/api/v1/destinations/fuzzy", { keyword }, signal),
  suggestKeywords: (cityId, keyword, signal) => post("/api/v1/keywords/suggest", { cityId, keyword }, signal),
  searchHotels: (payload) => post("/api/v1/hotels/search", payload),
  hotelDetail: (hotelId, payload) => post(`/api/v1/hotels/${hotelId}/detail`, payload),
  lookup: (kind, cityId) => request(`/api/v1/lookups/${kind}?cityId=${encodeURIComponent(cityId)}`),
  geoStatus: () => request("/api/v1/geo/status"),
  geoCities: ({ query = "", sortOrder = "asc", page = 1, pageSize = 50 } = {}, signal) => request(`/api/v1/geo/cities?query=${encodeURIComponent(query)}&sortOrder=${sortOrder}&page=${page}&pageSize=${pageSize}`, { signal }),
  geoProvinces: () => request("/api/v1/geo/provinces"),
  geoProvince: (provinceId) => request(`/api/v1/geo/provinces/${encodeURIComponent(provinceId)}`),
  geoRaw: () => request("/api/v1/geo/raw"),
  refreshGeo: () => post("/api/v1/geo/refresh", {}),
  chatSettings: () => request("/api/v1/chat/settings"),
  saveChatSettings: (settings) => request("/api/v1/chat/settings", { method: "PUT", body: JSON.stringify(settings) }),
  chatSearch: (payload) => post("/api/v1/chat/search", payload),
  debug: (requestId) => request(`/api/v1/debug/requests/${encodeURIComponent(requestId)}`),
};
