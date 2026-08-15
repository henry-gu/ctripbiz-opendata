export const demoSuggestions = [
  { id: 2, name: "上海", cityId: 2, cityName: "上海", type: "CITY" },
  { id: 1001, name: "外滩", cityId: 2, cityName: "上海", type: "LANDMARK", address: "黄浦区中山东一路" },
  { id: 1002, name: "外滩地区", cityId: 2, cityName: "上海", type: "ZONE" },
  { id: 1003, name: "上海外滩W酒店", cityId: 2, cityName: "上海", type: "HOTEL" },
  { id: 1004, name: "上海前滩企业天地", cityId: 2, cityName: "上海", type: "CORP_PLACE", address: "浦东新区前滩大道" },
  { id: 1005, name: "上海前滩", cityId: 2, cityName: "上海", type: "PLAIN_TEXT", address: "百度联想结果" },
];

const images = [
  "/assets/hotels/waterfront.jpg",
  "/assets/hotels/heritage.jpg",
  "/assets/hotels/urban.jpg",
];

export const demoHotels = [
  [2354456, "上海外滩W酒店", "黄浦区旅顺路66号", 5, 2588, 4.7],
  [2354457, "上海外滩悦榕庄", "虹口区公平路19号", 5, 2188, 4.6],
  [2354458, "上海外滩英迪格酒店", "虹口区黄浦路585号", 4, 1588, 4.5],
  [2354459, "上海外滩华尔道夫酒店", "黄浦区中山东一路2号", 5, 2988, 4.8],
  [2354460, "上海浦东嘉里大酒店", "浦东新区花木路1388号", 5, 1088, 4.3],
  [2354461, "上海静安瑞吉酒店", "静安区北京西路1008号", 5, 1688, 4.7],
].map(([id, name, address, star, price, rating], index) => ({
  id,
  name,
  address,
  zoneName: index < 4 ? "外滩地区" : index === 4 ? "浦东新区" : "静安区",
  star,
  price,
  currency: "CNY",
  rating,
  available: true,
  image: images[index % images.length],
}));

export const demoDiagnostics = {
  requestId: "req_20260814_154231",
  endpoint: "hotels",
  method: "POST",
  url: "https://ct.ctrip.com/distribution/hotel/getHotelDataV2",
  timestamp: "2026-08-14T15:42:31+08:00",
  latencyMs: 486,
  status: "success",
  cache: { hit: false },
  request: {
    cityId: 2,
    checkInDate: "2026-08-20",
    checkOutDate: "2026-08-22",
    roomQuantity: 1,
    guestQuantity: 1,
    keyword: "",
    page: 1,
    pageSize: 10,
  },
  response: {
    code: 0,
    message: "SUCCESS",
    data: { total: 56, page: 1, pageSize: 10, list: [{ hotelId: 2354456, hotelName: "上海外滩W酒店", price: 2588 }] },
  },
};
