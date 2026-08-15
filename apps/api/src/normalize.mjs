function get(source, paths, fallback = null) {
  for (const path of paths) {
    let value = source;
    for (const part of path.split(".")) value = value?.[part];
    if (value !== undefined && value !== null) return value;
  }
  return fallback;
}

function firstArray(source, paths) {
  const value = get(source, paths, []);
  return Array.isArray(value) ? value : [];
}

export function normalizeDestinations(raw) {
  const list = firstArray(raw, ["destinationInfoList", "data.destinationInfoList", "DestinationInfoList"]);
  return list.map((item) => ({
    id: get(item, ["destinationId", "id"]),
    name: get(item, ["destinationName", "keywordName", "name"], "未命名地点"),
    englishName: get(item, ["destinationEnName", "enName"]),
    type: get(item, ["resultType", "destinationType"], "UNKNOWN"),
    cityId: get(item, ["cityId"]),
    cityName: get(item, ["cityName"]),
    provinceName: get(item, ["provinceName"]),
    address: get(item, ["address"]),
    zoneName: get(item, ["zoneName"]),
    coordinates: {
      lat: get(item, ["coordinateInfo.gDLat", "coordinateInfo.bDLat", "gDLat", "bDLat"]),
      lon: get(item, ["coordinateInfo.gDLon", "coordinateInfo.bDLon", "gDLon", "bDLon"]),
    },
  }));
}

const FUZZY_LOCATION_TYPES = new Set(["LANDMARK", "CORP_PLACE", "PLAIN_TEXT"]);

export function filterFuzzyLocations(items, limit = 20) {
  const seen = new Set();
  return items.filter((item) => {
    if (!FUZZY_LOCATION_TYPES.has(item.type)) return false;
    const key = `${item.type}:${item.id ?? ""}:${item.name}:${item.cityId ?? ""}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  }).slice(0, limit);
}

export function normalizeKeywords(raw) {
  const groups = [
    ...firstArray(raw, ["destinationInfoList", "data.destinationInfoList"]),
    ...firstArray(raw, ["baiDuKeywordInfoList", "data.baiDuKeywordInfoList"]),
    ...firstArray(raw, ["otherCityDestinationList", "data.otherCityDestinationList"]),
  ];
  return groups.map((item) => ({
    id: get(item, ["destinationId", "locationId", "id"]),
    name: get(item, ["keywordName", "destinationName", "locationName", "name"], "未命名关键词"),
    type: get(item, ["resultType", "destinationType"], "PLAIN_TEXT"),
    cityId: get(item, ["cityId"]),
    cityName: get(item, ["cityName"]),
    address: get(item, ["address"]),
    rating: get(item, ["ratingScore"]),
  }));
}

function hotelPrice(item) {
  return get(item, [
    "minPriceRoomInfo.minPriceInfo.price",
    "minPriceRoomInfo.price",
    "minPrice.price",
    "priceInfo.price",
    "price",
  ]);
}

export function normalizeHotels(raw) {
  const list = firstArray(raw, ["hotelInfo", "data.hotelInfo", "hotelInfoList", "data.hotelInfoList"]);
  return {
    count: get(raw, ["hotelCount", "data.hotelCount"], list.length),
    hid: get(raw, ["hid", "data.hid"]),
    hotels: list.map((item) => {
      const base = get(item, ["hotelBaseInfo"], item);
      return {
        id: get(base, ["hotelId", "id"]),
        name: get(base, ["hotelName", "name"], "未命名酒店"),
        address: get(base, ["address", "hotelAddress", "detailAddress"], "地址暂缺"),
        zoneName: get(base, ["zoneName", "businessZoneName", "districtName"]),
        star: Number(get(base, ["starNum", "hotelStar", "star"], 0)) || 0,
        rating: Number(get(item, ["hotelCommentInfo.rating", "hotelCommentInfo.total", "rating", "score"], 0)) || 0,
        reviewCount: Number(get(item, ["hotelCommentInfo.totalNumberOfHotelReviews", "totalNumberOfHotelReviews"], 0)) || 0,
        price: hotelPrice(item),
        currency: get(item, ["minPriceRoomInfo.minPriceInfo.currency", "minPriceRoomInfo.currency", "currency"], "CNY"),
        available: get(item, ["isEnable", "available", "canBook"], true) !== false,
        image: get(base, ["hotelImageInfo.imageUrl", "imageUrl", "masterHotelImage", "mainImageUrl"]),
        raw: item,
      };
    }),
  };
}

export function normalizeHotelDetail(raw) {
  const detail = get(raw, ["hotelDetailInfo", "data.hotelDetailInfo"], raw);
  const base = get(detail, ["hotelBaseInfo"], detail);
  return {
    id: get(base, ["hotelId", "id"]),
    name: get(base, ["hotelName", "name"], "酒店详情"),
    address: get(base, ["address", "hotelAddress", "detailAddress"], "地址暂缺"),
    star: Number(get(base, ["starNum", "hotelStar", "star"], 0)) || 0,
    rating: Number(get(detail, ["hotelCommentInfo.total", "rating", "score"], 0)) || 0,
    telephone: get(base, ["telephone", "phone", "hotelTel"]),
    description: get(base, ["description", "hotelDescription", "introduction"]),
    facilities: firstArray(detail, ["hotelFacilityInfo.facilityList", "facilityList", "facilities"]),
    rooms: firstArray(detail, ["roomInfoList", "rooms", "hotelRoomInfoList"]),
    images: firstArray(detail, ["hotelImageInfo.imageList", "imageList", "images"]),
    raw: detail,
  };
}

export function normalizeLookup(raw, kind) {
  if (kind === "brands") {
    return firstArray(raw, ["itemList", "data.itemList"]).map((item) => ({ id: item.id, name: item.name, type: item.type }));
  }
  if (kind === "zones") {
    return firstArray(raw, ["zoneDetailList", "data.zoneDetailList"]).map((item) => ({ id: Number(item.zone), name: item.zoneName || item.zoneCentralName }));
  }
  return firstArray(raw, ["MetroLineDictList", "metroLineDictList", "data.MetroLineDictList"]).map((item) => ({
    id: item.MetroLineID ?? item.metroLineID,
    name: item.MetroLineName ?? item.metroLineName,
    stations: item.StationList ?? item.stationList ?? [],
  }));
}
