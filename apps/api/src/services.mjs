import { randomUUID } from "node:crypto";
import { config } from "./config.mjs";
import { TtlLruCache, stableCacheKey } from "./cache.mjs";
import { callCtrip } from "./ctrip-client.mjs";
import { AppError } from "./errors.mjs";
import { geoStore } from "./geo-store.mjs";
import { filterFuzzyLocations, normalizeDestinations, normalizeHotelDetail, normalizeHotels, normalizeKeywords, normalizeLookup } from "./normalize.mjs";

const cache = new TtlLruCache(300);
const TTL_STATIC = 24 * 60 * 60 * 1000;
const TTL_HOTEL = 60 * 1000;

function required(value, name) {
  if (value === undefined || value === null || value === "") {
    throw new AppError("VALIDATION_ERROR", `${name}不能为空`, { statusCode: 400 });
  }
  return value;
}

function destinationSuggestion(body) {
  const keyword = String(required(body.keyword, "关键词")).trim();
  return cachedCall("destinations", {
    searchEngineBaseInfo: {
      uid: config.uid,
      languageType: "CN",
      locale: "zh-CN",
      requestFrom: "CORP_GDS",
      debugInfo: { traceLogId: randomUUID() },
    },
    corpId: config.corpId,
    keyword,
    searchRange: "DOMESTIC",
    onlyGeoData: false,
  }, normalizeDestinations, TTL_STATIC, { refresh: body.refresh, staleIfError: true, timeoutMs: 8000 });
}

async function cachedCall(kind, payload, normalizer, ttlMs, { refresh = false, staleIfError = false, timeoutMs } = {}) {
  const key = stableCacheKey(kind, payload);
  const cached = !refresh ? cache.get(key) : null;
  if (cached && !cached.stale) {
    return { ...cached.value, meta: { ...cached.value.meta, cache: { hit: true, stale: false, expiresAt: cached.expiresAt } } };
  }
  try {
    const result = await callCtrip(kind, payload, { timeoutMs });
    const response = {
      requestId: result.requestId,
      data: normalizer(result.raw),
      meta: { latencyMs: result.latencyMs, cache: { hit: false, stale: false, expiresAt: Date.now() + ttlMs } },
    };
    cache.set(key, response, ttlMs);
    return response;
  } catch (error) {
    if (staleIfError) {
      const stale = cache.get(key, { allowStaleMs: 7 * 24 * 60 * 60 * 1000 });
      if (stale) return { ...stale.value, meta: { ...stale.value.meta, cache: { hit: true, stale: true, expiresAt: stale.expiresAt } } };
    }
    throw error;
  }
}

export const services = {
  suggestDestinations(body) {
    return destinationSuggestion(body);
  },

  async suggestFuzzyLocations(body) {
    const response = await destinationSuggestion(body);
    return { ...response, data: filterFuzzyLocations(response.data, 20) };
  },

  suggestKeywords(body) {
    const cityId = Number(required(body.cityId, "城市"));
    const keyword = String(required(body.keyword, "关键词")).trim();
    return cachedCall("keywords", {
      keyword,
      countryId: 1,
      corpId: config.corpId,
      cityId,
      language: "ZH_CN",
      locale: "zh-CN",
    }, normalizeKeywords, TTL_STATIC, { refresh: body.refresh, staleIfError: true, timeoutMs: 8000 });
  },

  searchHotels(body) {
    const cityId = Number(required(body.cityId, "城市"));
    const checkInDate = String(required(body.checkInDate, "入住日期"));
    const checkOutDate = String(required(body.checkOutDate, "离店日期"));
    if (checkOutDate <= checkInDate) throw new AppError("VALIDATION_ERROR", "离店日期必须晚于入住日期", { statusCode: 400 });
    const roomQuantity = Math.max(1, Number(body.roomQuantity || 1));
    const guestQuantity = Math.max(1, Number(body.guestQuantity || 1));
    const filters = body.filters ?? {};
    const payload = {
      baseInfo: { uid: config.uid, corpId: config.corpId, language: "ZH_CN", selectedCountryCode: "CN" },
      roomFilterInfo: {
        roomInfoFilter: null,
        roomPolicyFilter: {
          hasBreakfast: filters.hasBreakfast ?? null,
          freeCancel: filters.freeCancel ?? null,
          onlyFGRoom: filters.onlyFGRoom ?? null,
          onlyPPRoom: filters.onlyPPRoom ?? null,
        },
        roomPriceRange: {
          lowPrice: filters.lowPrice ? Number(filters.lowPrice) : null,
          highPrice: filters.highPrice ? Number(filters.highPrice) : null,
        },
      },
      hotelFilterInfo: {
        hotelInfoFilter: {
          hotelBrandGroupInfo: {
            hotelBrand: filters.brandIds?.length ? filters.brandIds.map(Number) : null,
            hotelGroup: null,
            hotelBrandFeature: null,
          },
          hotelStar: filters.stars?.length ? filters.stars.map(Number) : null,
          onlyViewAgreementHotel: filters.onlyAgreement ?? false,
          keyword: filters.keyword || null,
        },
        hotelPositionFilter: {
          zoneId: filters.zoneIds?.length ? filters.zoneIds.map(Number) : null,
          districtId: filters.districtId ? Number(filters.districtId) : null,
          metroId: filters.metroId ? Number(filters.metroId) : null,
          metroDistance: filters.metroDistance ? Number(filters.metroDistance) : null,
          mapSearchInfo: filters.mapSearchInfo ?? null,
        },
        hotelFacilitiesFilter: {
          hasFitnessCenter: filters.hasFitnessCenter ?? null,
          hasSwimmingPool: filters.hasSwimmingPool ?? null,
          hasParking: filters.hasParking ?? null,
          freeWirelessBroadband: filters.freeWirelessBroadband ?? null,
        },
      },
      searchBaseInfo: {
        hotelIdList: body.hotelIdList ?? null,
        cityId,
        checkInDate,
        checkOutDate,
        roomQuantity,
        guestQuantity,
        pagingInfo: { pageIndex: Math.max(1, Number(body.page || 1)), pageSize: Math.min(50, Math.max(1, Number(body.pageSize || 10))) },
        sortInfo: { sortType: body.sortType || "DEFAULT", sortDirection: body.sortDirection || "DESC" },
      },
      sceneFlag: "DATA_PULLING",
      platform: "h5",
    };
    return cachedCall("hotels", payload, normalizeHotels, TTL_HOTEL, { refresh: body.refresh, timeoutMs: 15000 }).then((result) => {
      if (!filters.onlyBayerPreferred) return result;
      const hotels = result.data.hotels.filter((hotel) => hotel.tags?.bayerPreferred);
      return { ...result, data: { ...result.data, count: hotels.length, hotels } };
    });
  },

  async chatSearch(body) {
    const result = await this.searchHotels({
      cityId: body.cityId,
      checkInDate: body.checkInDate,
      checkOutDate: body.checkOutDate,
      roomQuantity: body.roomQuantity || 1,
      guestQuantity: body.guestQuantity || 1,
      page: 1,
      pageSize: 20,
      filters: {
        keyword: body.keyword || "",
        stars: body.minStar ? Array.from({ length: 6 - Number(body.minStar) }, (_, index) => Number(body.minStar) + index) : [],
        lowPrice: body.lowPrice ?? "",
        highPrice: body.highPrice ?? "",
      },
    });
    const hotels = result.data.hotels.filter((hotel) => hotel.available).sort((left, right) => Number(Boolean(right.tags?.bayerPreferred)) - Number(Boolean(left.tags?.bayerPreferred)));
    return { ...result, data: { ...result.data, count: hotels.length, hotels } };
  },

  hotelDetail(hotelId, body) {
    const payload = {
      hotelId: Number(required(hotelId, "酒店ID")),
      baseInfo: { uid: config.uid, corpId: config.corpId, language: "ZH_CN", selectedCountryCode: "CN" },
      checkInDate: String(required(body.checkInDate, "入住日期")),
      checkOutDate: String(required(body.checkOutDate, "离店日期")),
      roomQuantity: Math.max(1, Number(body.roomQuantity || 1)),
      roomQuantityLimited: false,
      guestQuantity: Math.max(1, Number(body.guestQuantity || 1)),
      roomFilter: null,
      hid: body.hid || null,
      platform: "h5",
      sceneFlag: "DATA_PULLING",
    };
    return cachedCall("hotelDetail", payload, normalizeHotelDetail, TTL_HOTEL, { refresh: body.refresh, timeoutMs: 20000 });
  },

  lookup(kind, cityId, refresh = false) {
    const id = Number(required(cityId, "城市"));
    const payload = kind === "brands"
      ? { cityBrandGroupParameter: { cityID: id, districtID: -1, isEnable: 1 } }
      : kind === "zones"
        ? { corpID: config.corpId, uID: config.uid, cityID: id, districtID: null, isValidPosition: "T", dataType: null, topNum: 500, zone: null, orderBy: 0, isViewHotel: "T" }
        : { id, objectType: 1 };
    return cachedCall(kind, payload, (raw) => normalizeLookup(raw, kind), TTL_STATIC, { refresh, staleIfError: true, timeoutMs: 10000 });
  },

  cacheSize() {
    return cache.size;
  },

  geoStatus() {
    return geoStore.status();
  },

  geoCities(query) {
    return geoStore.cities(query);
  },

  geoProvinces() {
    return geoStore.provinces();
  },

  geoProvince(provinceId) {
    return geoStore.province(provinceId);
  },

  geoRaw() {
    return geoStore.raw();
  },

  async geoRefresh() {
    await geoStore.refresh();
    return geoStore.status();
  },
};
