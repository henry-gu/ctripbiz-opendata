# 酒店列表V2.0

更新时间:2026-06-15 20:00:39

## 概述

接口名
描述
调用方式
参数类型
调用地址
ticket说明
公共鉴权请求节点

| 待废弃 | (请使用上述方式接入) |  |
| --- | --- | --- |
| 功能描述 |  | 通过调节获取城市列表信息 |
| 接口地址 |  | 测试:http://openservice.open.uat.ctripqa.com/openservice/serviceproxy.ashx<br>生产:Https://sopenservice.ctrip.com/OpenService/ServiceProxy.ashx |
| 请求方式 |  | POST |
| 请求示例 |  | 测试:http://openservice.open.uat.ctripqa.com/openservice/serviceproxy.ashx?<br>aid=1&sid=50&icode=76bc8a14ddd64d15bc3716bc525f7767&token=1ff3955c8a0178d9ba056abf81eebc5e1f883f5eab9659de0f2843<br>b50f21064c&uuid=e9d518cdc93e42e7803b98a495dae0ce&e=r6&mode=1&format=json<br>生产:https://sopenservice.ctrip.com/OpenService/ServiceProxy.ashx?<br>aid=***&sid=***&icode=76bc8a14ddd64d15bc3716bc525f7767&token=e799b6e7aed2cd8085f25afb3121a92921de1b1ece46b9e4235f<br>1d17f488a701&uuid=bc379e1b3c9f4cfda14892a25e815477&e=r6&mode=1&format=json |
| 接入流程 |  | 酒店分销接入流程 |
| token说明 |  | Token生成说明 |

## 请求契约

| 名称 | 类型 | 是否必填 | 描述 |
| --- | --- | --- | --- |
| getHotelDataV2RequestType | GetHotelDataV2RequestType | Y | GetHotelDataV2RequestType |
| baseInfo | BaseEntity | Y | 本次查询用户相关信息 |
| uid | String | Y | 商旅客户卡号,必填 |
| corpId | String | Y | 公司ID,必填 |
| language | String | N | 语言类别;枚举类型:ZH_CN EN_US;选填,默认<br>ZH_CN |
| selectedCountryCode | String | N | 用户所选国家code二字码 |

| 名称 | 类型 | 是否必填 | 描述 |
| --- | --- | --- | --- |
| userBelongInfo | UserBelongType | N | 用户归属地信息 |
| usersCityId | Integer | N | 用户所在城市 |
| roomFilterInfo | RoomFilterType | N | 房型层面的过滤条件 |
| roomInfoFilter | RoomInfoFilterType | N | 房型信息筛选条件 |
| bedType | String | N | 出有这些床型的酒店,支持的类型:All或者空表示所<br>有;KING_BED-大床 TWIN_BED-双床 SINGLE_BE<br>D-单人床 MULTI_BED-多床 |
| windowType | String | N | 出有这些窗型的酒店,支持的类型:All或者空表示所<br>有;0-无窗 1-部分有窗 2-有窗 4-内窗 5-天窗 6-封<br>闭窗 7-飘窗 -100-未知 |
| roomType | String | N | 起价房型的房型类型 |
| roomPolicyFilter | RoomPolicyFilterType | N | 房型政策筛选条件 |
| onlyFGRoom | Boolean | N | 出有现付房型的酒店 |
| onlyPPRoom | Boolean | N | 出有预付房型的酒店 |
| justifyConfirm | Boolean | N | 出有立即确认房型的酒店 |
| hasBreakfast | Boolean | N | 出含早餐房型的酒店 |
| companyAccountPayment | Boolean | N | 出支持公司账户支付房型的酒店 |
| freeCancel | Boolean | N | 出免费取消房型的酒店 |
| specialInvoice | Boolean | N | 出可以开专票房型的酒店 |
| onlyHourRoom | Boolean | N | 出有钟点房的酒店 |
| onlyLongRental | Boolean | N | 出有⻓租房的酒店 |
| applicativeAreaInfo | ApplicativeAreaInfoType | N | 房型的适用人群 |
| foreignGuestsApplicative | Boolean | N | 外宾适用 |
| gATApplicative | Boolean | N | 港澳台适用 |
| onlyBonusPoint | Boolean | N | 出有可积分房型的酒店 |
| roomType | String | N | 房型类型,目前只支持传C, C:协议房型 |
| filterWithServiceCharge | String | N | 是否根据前收服务费进行差标管控 |
| roomPriceRange | RoomPriceRangeType | N | 房型价格的区间筛选 |
| lowPrice | BigDecimal | N | 价格区间的最低价(结算币种) |
| highPrice | BigDecimal | N | 价格区间的最高价(结算币种) |

| 名称 | 类型 | 是否必填 | 描述 |
| --- | --- | --- | --- |
| priceFilterType | String | N | 价格筛选方式(AVG_PRICE:均价管控;DAILY_PRI<br>CE:每日价管控);不传默认按均价管控 |
| filterWithExtraPayTax | boolean | N | 是否根据到店付税过滤 |
| hotelFilterInfo | HotelFilterType | N | 酒店层面的过滤条件 |
| hotelInfoFilter | HotelInfoFilterType | N | 酒店信息筛选条件 |
| hotelBrandGroupInfo | HotelBrandGroupFilterType | N | 酒店品牌集团信息 |
| hotelBrand | List<Integer> | N | 酒店品牌Id |
| hotelGroup | List<Integer> | N | 酒店集团Id |
| hotelBrandFeature | List<String> | N | 酒店品牌特色 取值范围:HIGH_END_CHAIN:高端<br>连锁 MID_RANGE_CHAIN:中端连锁 QUICK_CHAI<br>N:快捷连锁 |
| hotelStar | List<Integer> | N | 酒店星级 |
| onlyViewAgreementHotel | Boolean | N | 只看协议酒店 |
| premiumHotel | Boolean | N | 尊享酒店 |
| keyword | String | N | 直搜关键词 |
| hotelCommentInfo | HotelCommentFilterType | N | 酒店评论筛选信息 |
| maxComments | Integer | N | 最高评论数 |
| minComments | Integer | N | 最低评论数 |
| maxRating | Double | N | 最高评分 |
| minRating | Double | N | 最低评分 |
| hotelFeatureFilterList | List<String> | N | 住宿类型筛选条件(HOTEL_RESORT:酒店/度假<br>村,INN:旅馆,APARTMENT:公寓式住宿,HOLI<br>DAY_VILLA:度假别墅,HOMESTAY_INN:⺠宿/客<br>栈,SPECIALITY_ACCOMMODATION:特色型住<br>宿) |
| hotelPositionFilter | HotelPositionFilterType | N | 酒店位置筛选条件 |
| zoneId | List<Integer> | N | 商业区Id |
| districtId | Integer | N | 行政区Id |
| metroId | Integer | N | 地铁线Id |
| metroDistance | Integer | N | 地铁沿线距离(公里) |
| mapSearchInfo | MapSearchInfoType | N | 地图查询条件,当该节点传参时,子节点都需必填 |
| lat | Double | N | 纬度 |
| lon | Double | N | 经度 |

| 名称 | 类型 | 是否必填 | 描述 |
| --- | --- | --- | --- |
| mapType | String | N | 地图的类型,取值范围:BAI_DU-百度 GAO_DE-高<br>德 GOOGLE-谷歌 |
| radius | Double | N | 此经纬度为原点多少公里半径,例如:500米传0.5 |
| hotelFacilitiesFilter | HotelFacilitiesFilterType | N | 酒店设施设备筛选条件 |
| hasAirportShuttle | Boolean | N | 机场巴士接送 |
| hasFitnessCenter | Boolean | N | 健身中心 |
| hasSwimmingPool | Boolean | N | 游泳池 |
| hasParking | Boolean | N | 停⻋场 |
| hasAirportPickup | Boolean | N | 接机服务 |
| chineseFriendly | Boolean | N | 华人礼遇 |
| sPA | Boolean | N | SPA |
| freeWirelessBroadband | Boolean | N | 有免费无线宽带房型的酒店 |
| freeWiredBroadband | Boolean | N | 有免费有线宽带房型的酒店 |
| searchBaseInfo | SearchBaseInfoType | Y | 酒店查询基础信息 |
| hotelIdList | List<Integer> | N | 母酒店Id列表 |
| cityId | Integer | Y | 城市Id |
| checkInDate | String | Y | 入住日期,酒店当地日期(yyyy-MM-dd格式) |
| checkOutDate | String | Y | 离店日期,酒店当地日期(yyyy-MM-dd格式) |
| roomQuantity | Integer | Y | 预订房间数量 |
| guestQuantity | Integer | Y | 总入住人数 |
| pagingInfo | PagingInfoType | Y | 酒店翻⻚信息 |
| pageIndex | Integer | Y | 当前⻚码,从1开始;1表示第1⻚ |
| pageSize | Integer | Y | 每⻚酒店数(最大50) |
| sortInfo | SortInfoType | N | 酒店排序信息 |
| sortType | String | N | 酒店排序名称 取值范围 DEFAULT或者空-默认 STAR<br>-星级 MIN_PRICE-酒店起价 DISTANCE-距离 CUST<br>OMER_RATINGS-客人评分 |
| sortDirection | String | N | 酒店排序方向 取值范围 DESC-降序 ASC-升序 |
| sceneFlag | String | N | 使用场景<br>BI_PRICE_COMPARE(bi比价)<br>DYNAMIC_TRAVEL_POLICY(动态差标:保证价格新<br>鲜度和一致性,抛弃非必须静态信息)<br>DATA_PULLING(数据拉取) |

| 名称 | 类型 | 是否必填 | 描述 |
| --- | --- | --- | --- |
| platform | String | N | 用户感知到的入口平台,可选项:ios、android、ha<br>rmony、applet、h5、online、offline |
| ExpandStrategy | List<ExpandStrategyType> | N | 扩展策略 |
| StrategyType | String | N | 策略类型(⻅附录:扩展策略) |
| StrategyValue | List<String> | N | 策略内容 |

## 响应契约

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| getHotelDataV2ResponseType | GetHotelDataV2ResponseType | GetHotelDataV2ResponseType |
| hotelInfo | List<HotelInfoType> | 酒店列表 |
| hotelBaseInfo | HotelBaseInfoType | 酒店基础信息 |
| hotelId | Integer | 母酒店Id |
| hotelName | String | 酒店名称(当前请求传入的语言环境) |
| hotelEnName | String | 酒店英文名称 |
| hotelAddress | String | 酒店地址 |
| hotelLogoUrl | String | 酒店Logo |
| hotelStar | Integer | 酒店星级 |
| starLicence | Boolean | 是否挂牌 |
| hotelBrandInfo | HotelBrandInfoType | 酒店品牌信息 |
| groupId | Integer | 集团id |
| hotelStaticInfo | HotelStaticInfoType | 酒店静态信息 |
| hotelFacilitiesInfo | HotelFacilitiesInfoType | 酒店设施信息 |
| facilityInfoList | List<FacilityInfoType> | 设施列表 |
| facilityType | String | 设施类型 取值范围:PARKING-停⻋场 FITNESS_CENTER-健身<br>房 WIFI-公共区域WIFI SWIMMING_POOL-游泳池 Airport_Pick_<br>up-接机服务 Airport_Shuttle-机场巴士接送 RESTAURANT-餐厅<br>MEETING-会议室 SPA-SPA |
| facilityName | String | 设施名称 |
| hotelGeoInfo | HotelGeoInfoType | 酒店的地理位置信息 |
| hotelMapInfo | List<HotelMapInfoType> | 酒店的地图信息 |
| lat | Double | 维度 |

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| lon | Double | 经度 |
| mapType | String | 地图的类型,取值范围:BAI_DU-百度 GAO_DE-高德 GOOGLE-<br>谷歌 |
| districtInfo | IdNameType | 酒店所在的行政区信息 |
| id | Integer | ID |
| name | String | 名称 |
| cityInfo | CityType | 酒店所在的城市信息 |
| id | Integer | ID |
| name | String | 名称 |
| parentCityList | List<IdNameType> | 上级城市列表 |
| id | Integer | ID |
| name | String | 名称 |
| childCityList | List<IdNameType> | 下级城市列表 |
| id | Integer | ID |
| name | String | 名称 |
| provinceInfo | IdNameType | 酒店所在的省份信息 |
| id | Integer | ID |
| name | String | 名称 |
| countryInfo | IdNameType | 酒店所在的国家信息 |
| id | Integer | ID |
| name | String | 名称 |
| zoneInfoList | List<IdNameType> | 酒店所在的商圈列表 |
| id | Integer | ID |
| name | String | 名称 |
| landMarkDistance | Double | * * 距离某地标的距离(只有传了经纬度才有此值) |
| hotelReviewInfo | HotelReviewInfoType | 酒店的评论信息 |
| hotelReviewScore | Double | 酒店评分 |
| totalNumberOfHotelReviews | Integer | 酒店评论总人数 |
| hotelTagInfo | List<HotelTagType> | 酒店标签信息 |

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| hotelTagList | List<HotelTagInfoType> | 酒店Tag列表 |
| tagCode | String | 标签Code |
| name | String | 标签名称 |
| desc | String | 标签描述 |
| hotelTagType | String | 酒店Tag类型 取值范围 HOTEL_RECOMMEND:酒店推荐 PRICE_P<br>ROMOTION:酒店促销 USER_LEVEL:会员等级 DEFAUT:其他Tag<br>信息(不好归类的Tag信息) |
| minPriceRoomInfo | MinPriceRoomInfoType | 酒店起价房型信息 |
| saleRoomId | Long | 起价房型Id |
| canReserve | Boolean | 起价房型是否可订 |
| minPriceInfo | MinPriceInfoType | 房型起价信息 |
| avgPriceExcludeTax | PriceInfoType | 不含税房型均价 |
| originPriceInfo | PriceType | 原币种金额信息 |
| price | BigDecimal | 金额 |
| currency | String | 币种 |
| customPrice | BigDecimal | 传入CustomCurrency币种对应金额 |
| avgPriceIncludeTax | PriceInfoType | 含税房型均价 |
| originPriceInfo | PriceType | 原币种金额信息 |
| price | BigDecimal | 金额 |
| currency | String | 币种 |
| customPrice | BigDecimal | 传入CustomCurrency币种对应金额 |
| promotionsPriceInfo | PromotionsPriceType | 起价房型的促销金额 |
| avgDiscountedPrice | PriceInfoType | 所有促销活动平均优惠金额 |
| originPriceInfo | PriceType | 原币种金额信息 |
| price | BigDecimal | 金额 |
| currency | String | 币种 |
| customPrice | BigDecimal | 传入CustomCurrency币种对应金额 |
| promotionsDetailInfoList | List<PromotionsDetailInfoType> | 所有促销活动明细信息 |
| avgPromotionsPrice | PriceInfoType | 促销每间夜均价 |

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| originPriceInfo | PriceType | 原币种金额信息 |
| price | BigDecimal | 金额 |
| currency | String | 币种 |
| customPrice | BigDecimal | 结算币种金额 |
| totalPromotionsPrice | PriceInfoType | 促销总价 |
| originPriceInfo | PriceType | 原币种金额信息 |
| price | BigDecimal | 金额 |
| currency | String | 币种 |
| customPrice | BigDecimal | 结算币种金额 |
| minSalePrice | BigDecimal | 最低售价金额 |
| minSalePriceIncludeTax | BigDecimal | 最低售价金额(含税) |
| taxInfoList | List<TaxInfoType> | 起价房型的税费明细列表 |
| taxPrice | PriceInfoType | 此种税费金额 |
| originPriceInfo | PriceType | 原币种金额信息 |
| price | BigDecimal | 金额 |
| currency | String | 币种 |
| customPrice | BigDecimal | 传入CustomCurrency币种对应金额 |
| taxType | String | 此种税费类型 ADD_BED:加床价格 BREAKFAST:加早价格 WIRED<br>_BROADNET:有线宽带 WIRELESS_BROADNET:无线宽带 SERVI<br>CE_FEE:服务费 CITY_TAX:城市税费 VAT:增值税 RESORT_FEE:度<br>假税 OTHER:其它 |
| includeInTotalPrice | Boolean | 税费金额是否包含在房价 |
| serviceChargeInfo | ServiceChargeInfoType | 起价房型的前收服务费信息(默认支付类型为公付) |
| customChargePrice | BigDecimal | 结算币种前收服务费总额 |
| customChargePricePerUnit | BigDecimal | 结算币种前收服务费金额·每收费单位(按成交金额比例收费时,输<br>出平均每间夜金额) |
| customChargePricePerRoomNi<br>ghts | BigDecimal | 结算币种前收服务费金额·每间夜 |
| roomType | String | 起价房型的房间类型, M 会员、C 协议 |
| hasContractRoom | Boolean | 酒店是否含协议房型 |
| unavailableReason | String | 不可订描述(Full-满房,Priceless-无价,OutOfBusiness-歇业) |

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| hid | String | 会话标识,调用酒店详情接口时需传入 |
| searchResult | SearchResultType | 酒店列表查询结果 |
| firstPage | Boolean | 第一⻚ |
| lastPage | Boolean | 最后一⻚ |
| hotelCount | Integer | 当前查询条件下酒店总数(预估酒店数量,可能存在偏差) |
| status | ResponseStatus | 接口返回状态 |
| success | Boolean |  |
| errorCode | Integer |  |
| errorMessage | String |  |

### 示例

请求数据的JSON格式示例

{

"Auth": {
"AppKey": "***",
"Ticket": "580487ff97194e2f64000004"
},

"baseInfo":{

"uid":"4000021548",

"corpId":"2731184",

"language":"ZH_CN"

},

"roomFilterInfo":{

"roomInfoFilter":null,

"roomPolicyFilter":{

"onlyFGRoom":null,

"onlyPPRoom":null,

"justifyConfirm":false,

"hasBreakfast":false,

"companyAccountPayment":null,

"freeCancel":false,

"specialInvoice":null,

"onlyHourRoom":null,

"applicativeAreaInfo":null

},

"roomPriceRange":{

"lowPrice":null,

"highPrice":null

}

},

"hotelFilterInfo":{

"hotelInfoFilter":{

"hotelBrandGroupInfo":{

"hotelBrand":[],

"hotelGroup":null,

"hotelBrandFeature":null

},

"hotelStar":null,

"onlyViewAgreementHotel":false,

"keyword":"新加坡圣淘沙名胜世界新加坡"

},

"hotelPositionFilter":{

"zoneId":null,

"districtId":null,

"metroId":null,

"metroDistance":null,

"mapSearchInfo":null

},

"hotelFacilitiesFilter":{

"hasAirportShuttle":null,

"hasFitnessCenter":null,

"hasSwimmingPool":null,

"hasParking":null,

"hasAirportPickup":null,

"chineseFriendly":null,

"sPA":null,

"freeWirelessBroadband":null,

"freeWiredBroadband":null

}

},

"searchBaseInfo":{

"hotelIdList":null,

"cityId":73,

"checkInDate":"2022-01-27",

"checkOutDate":"2022-01-28",

"roomQuantity":null,

"guestQuantity":null,

"pagingInfo":{

"pageIndex":1,

"pageSize":11

},

"sortInfo":{

"sortType":null,

"sortDirection":"DEFAULT"

}

返回数据的JSON格式示例

{

"hotelInfo":[

{

"hotelBaseInfo":{

"hotelId":687474,

"hotelName":"新加坡莱佛士酒店",

"hotelEnName":"Raffles Hotel Singapore",

"hotelAddress":"1 Beach Road Singapore 189673 Singapore",

"hotelLogoUrl":"http://images4.fx.ctripcorp.com/target/200w18000001590rfC9E9_R_120_120.jpg",

"hotelStar":5,

"starLicence":false

},

"hotelStaticInfo":{

"hotelFacilitiesInfo":{

"facilityInfoList":[

{

"facilityType":"PARKING",

"facilityName":"停⻋场"

}

],

"chineseFriendlyList":[]

},

"hotelGeoInfo":{

"hotelMapInfo":[

{

"lat":-1.0,

"lon":-1.0,

"mapType":"BAI_DU"

},

{

"lat":-1.0,

"lon":-1.0,

"mapType":"GAO_DE"

},

{

"lat":1.29512842771385,

"lon":103.854360580444,

"mapType":"GOOGLE"

}

],

"cityInfo":{

"id":73,

"name":"新加坡"

},

"countryInfo":{

"id":3,

"name":"新加坡"

},

"zoneInfoList":[

{

"id":376,

"name":"滨海湾"

}

],

"landMarkDistance":0.0

},

"hotelReviewInfo":{

"hotelReviewScore":4.5,

"totalNumberOfHotelReviews":14

}

},

"hotelTagInfo":[

{

"hotelTagList":[

{

"tagCode":"HJHY",

"name":"⻩金会员",

"desc":""

},

{

"tagCode":"JTHYHT",

"name":"会员互通",

"desc":""

}

],

"hotelTagType":"USER_LEVEL"

}

],

"minPriceRoomInfo":{

"saleRoomId":13463713,

"canReserve":true,

"minPriceInfo":{

"avgPriceExcludeTax":{

"originPriceInfo":{

"price":193.1,

"currency":"SGD"

},

"customPrice":935

},

"avgPriceIncludeTax":{

"originPriceInfo":{

"price":244.7,

"currency":"SGD"

},

"customPrice":1185

}

},

"promotionsPriceInfo":{

"avgDiscountedPrice":{

"originPriceInfo":{

"price":12.24,

"currency":"SGD"

},

"customPrice":60

}

},

"minSalePrice":875,

"minSalePriceIncludeTax":1125,

"taxInfoList":[

{

"taxPrice":{

"originPriceInfo":{

"price":13.24,

"currency":"SGD"

},

"customPrice":64

},

"taxType":"OTHER",

"includeInTotalPrice":true

},

{

"taxPrice":{

"originPriceInfo":{

"price":9.04,

"currency":"SGD"

},

"customPrice":44

},

"taxType":"VAT",

"includeInTotalPrice":true

},

{

"taxPrice":{

"originPriceInfo":{

"price":6.62,

"currency":"SGD"

},

"customPrice":32

},

"taxType":"OTHER",

"includeInTotalPrice":true

},

{

"taxPrice":{

"originPriceInfo":{

"price":3.61,

"currency":"SGD"

},

"customPrice":18

},

"taxType":"OTHER",

"includeInTotalPrice":true

},

{

"taxPrice":{

"originPriceInfo":{

"price":19.09,

"currency":"SGD"

},

"customPrice":92

},

"taxType":"OTHER",

"includeInTotalPrice":true

}

]

},

"hasContractRoom":false

},

{

"hotelBaseInfo":{

"hotelId":687624,

"hotelName":"新加坡君悦酒店",

"hotelEnName":"Grand Hyatt Singapore",

"hotelAddress":"10 Scotts Road新加坡,新加坡共和国,228211",

"hotelLogoUrl":"http://images4.fx.ctripcorp.com/target/220q0f0000007k2wfD0E6_R_120_120.jpg",

"hotelStar":5,

"starLicence":false

},

"hotelStaticInfo":{

"hotelFacilitiesInfo":{

"facilityInfoList":[

{

"facilityType":"PARKING",

"facilityName":"停⻋场"

}

],

"chineseFriendlyList":[]

},

"hotelGeoInfo":{

"hotelMapInfo":[

{

"lat":-1.0,

"lon":-1.0,

"mapType":"BAI_DU"

},

{

"lat":-1.0,

"lon":-1.0,

"mapType":"GAO_DE"

},

{

"lat":1.3064572,

"lon":103.83323,

"mapType":"GOOGLE"

}

],

"cityInfo":{

"id":73,

"name":"新加坡"

},

"countryInfo":{

"id":3,

"name":"新加坡"

},

"zoneInfoList":[

{

"id":318,

"name":"乌节路"

}

],

"landMarkDistance":0.0

},

"hotelReviewInfo":{

"hotelReviewScore":0.0,

"totalNumberOfHotelReviews":0

}

},

"hotelTagInfo":[

{

"hotelTagList":[

{

"tagCode":"SJZX",

"name":"手机专享",

"desc":"手机用户专享价,仅限活动房型"

}

],

"hotelTagType":"PRICE_PROMOTION"

}

],

"minPriceRoomInfo":{

"saleRoomId":12407628,

"canReserve":true,

"minPriceInfo":{

"avgPriceExcludeTax":{

"originPriceInfo":{

"price":88.89,

"currency":"USD"

},

"customPrice":571

},

"avgPriceIncludeTax":{

"originPriceInfo":{

"price":88.89,

"currency":"USD"

},

"customPrice":571

}

},

"promotionsPriceInfo":{

"avgDiscountedPrice":{

"originPriceInfo":{

"price":0.02,

"currency":"USD"

},

"customPrice":1

}

},

"minSalePrice":570,

"minSalePriceIncludeTax":570,

"taxInfoList":[

{

"taxPrice":{

"originPriceInfo":{

"price":20,

"currency":"USD"

},

"customPrice":128

},

"taxType":"OTHER",

"includeInTotalPrice":false

},

{

"taxPrice":{

"originPriceInfo":{

"price":5,

"currency":"USD"

},

"customPrice":32

},

"taxType":"OTHER",

"includeInTotalPrice":false

}

]

},

"hasContractRoom":false

},

{

"hotelBaseInfo":{

"hotelId":687796,

"hotelName":"新加坡威斯汀酒店",

"hotelEnName":"The Westin Singapore",

"hotelAddress":"12 Marina View,Asia Square Tower 2",

"hotelLogoUrl":"http://images4.fx.ctripcorp.com/target/t1/hotel/718000/717394/77bb0ff243dd4c37bb806d9535fe2a65_R_120_120.jpg",

"hotelStar":5,

"starLicence":false

},

"hotelStaticInfo":{

"hotelFacilitiesInfo":{

"facilityInfoList":[],

"chineseFriendlyList":[]

},

"hotelGeoInfo":{

"hotelMapInfo":[

{

"lat":-1.0,

"lon":-1.0,

"mapType":"BAI_DU"

},

{

"lat":-1.0,

"lon":-1.0,

"mapType":"GAO_DE"

},

{

"lat":1.27834739643305,

"lon":103.851195573807,

"mapType":"GOOGLE"

}

],

"cityInfo":{

"id":73,

"name":"新加坡"

},

"countryInfo":{

"id":3,

"name":"新加坡"

},

"zoneInfoList":[

{

"id":376,

"name":"滨海湾"

}

],

"landMarkDistance":0.0

},

"hotelReviewInfo":{

"hotelReviewScore":4.5,

"totalNumberOfHotelReviews":2

}

},

"hotelTagInfo":[],

"minPriceRoomInfo":{

"saleRoomId":21779271,

"canReserve":true,

"minPriceInfo":{

"avgPriceExcludeTax":{

"originPriceInfo":{

"price":1445.00,

"currency":"SGD"

},

"customPrice":6998

},

"avgPriceIncludeTax":{

"originPriceInfo":{

"price":1448.13,

"currency":"SGD"

},

"customPrice":7013

}

},

"minSalePrice":6998,

"minSalePriceIncludeTax":7013,

"taxInfoList":[

{

"taxPrice":{

"originPriceInfo":{

"price":3.13,

"currency":"SGD"

},

"customPrice":15

},

"taxType":"VAT",

"includeInTotalPrice":true

},

{

"taxPrice":{

"originPriceInfo":{

"price":5.22,

"currency":"SGD"

},

"customPrice":25

},

"taxType":"OTHER",

"includeInTotalPrice":false

},

{

"taxPrice":{

"originPriceInfo":{

"price":2.09,

"currency":"SGD"

},

"customPrice":10

},

"taxType":"OTHER",

"includeInTotalPrice":false

},

{

"taxPrice":{

"originPriceInfo":{

"price":43.35,

"currency":"SGD"

},

"customPrice":210

},

"taxType":"OTHER",

"includeInTotalPrice":false

},

{

"taxPrice":{

"originPriceInfo":{

"price":4.18,

"currency":"SGD"

},

"customPrice":20

},

"taxType":"OTHER",

"includeInTotalPrice":false

},

{

"taxPrice":{

"originPriceInfo":{

"price":1.04,

"currency":"SGD"

},

"customPrice":5

},

"taxType":"OTHER",

"includeInTotalPrice":false

},

{

"taxPrice":{

"originPriceInfo":{

"price":1.04,

"currency":"SGD"

},

"customPrice":5

},

"taxType":"OTHER",

"includeInTotalPrice":false

},

{

"taxPrice":{

"originPriceInfo":{

"price":4.18,

"currency":"SGD"

},

"customPrice":20

},

"taxType":"OTHER",

"includeInTotalPrice":false

},

{

"taxPrice":{

"originPriceInfo":{

"price":2.09,

"currency":"SGD"

},

"customPrice":10

},

"taxType":"OTHER",

"includeInTotalPrice":false

},

{

"taxPrice":{

"originPriceInfo":{

"price":20.88,

"currency":"SGD"

},

"customPrice":101

},

"taxType":"OTHER",

"includeInTotalPrice":false

}

]

},

"hasContractRoom":false

},

{

"hotelBaseInfo":{

"hotelId":890394,

"hotelName":"新加坡M酒店",

"hotelEnName":"M Hotel Singapore",

"hotelAddress":"81 Anson Road",

"hotelLogoUrl":"http://images4.fx.ctripcorp.com/target/220t0s000000hri5096FA_R_120_120.jpg",

"hotelStar":4,

"starLicence":false

},

"hotelStaticInfo":{

"hotelFacilitiesInfo":{

"facilityInfoList":[

{

"facilityType":"PARKING",

"facilityName":"停⻋场"

}

],

"chineseFriendlyList":[]

},

"hotelGeoInfo":{

"hotelMapInfo":[

{

"lat":-1.0,

"lon":-1.0,

"mapType":"BAI_DU"

},

{

"lat":-1.0,

"lon":-1.0,

"mapType":"GAO_DE"

},

{

"lat":1.27366273926121,

"lon":103.84489774704,

"mapType":"GOOGLE"

}

],

"cityInfo":{

"id":73,

"name":"新加坡"

},

"countryInfo":{

"id":3,

"name":"新加坡"

},

"zoneInfoList":[

{

"id":319,

"name":"牛⻋水"

}

],

"landMarkDistance":0.0

},

"hotelReviewInfo":{

"hotelReviewScore":0.0,

"totalNumberOfHotelReviews":0

}

},

"hotelTagInfo":[

{

"hotelTagList":[

{

"tagCode":"SJZX",

"name":"手机专享",

"desc":"手机用户专享价,仅限活动房型"

}

],

"hotelTagType":"PRICE_PROMOTION"

}

],

"minPriceRoomInfo":{

"saleRoomId":95233888,

"canReserve":true,

"minPriceInfo":{

"avgPriceExcludeTax":{

"originPriceInfo":{

"price":89,

"currency":"RMB"

},

"customPrice":89

},

"avgPriceIncludeTax":{

"originPriceInfo":{

"price":89,

"currency":"RMB"

},

"customPrice":89

}

},

"promotionsPriceInfo":{

"avgDiscountedPrice":{

"originPriceInfo":{

"price":1,

"currency":"RMB"

},

"customPrice":1

}

},

"minSalePrice":88,

"minSalePriceIncludeTax":88,

"taxInfoList":[]

},

"hasContractRoom":false

},

{

"hotelBaseInfo":{

"hotelId":932167,

"hotelName":"新加坡泛太平洋酒店",

"hotelEnName":"Pan Pacific Singapore",

"hotelAddress":"7 RAFFLES BOULEVARD,MARINA SQUARE",

"hotelLogoUrl":"http://images4.fx.ctripcorp.com/target/0202f1200000dmzsi31DE_R_120_120.jpg",

"hotelStar":2,

"starLicence":false

},

"hotelStaticInfo":{

"hotelFacilitiesInfo":{

"facilityInfoList":[],

"chineseFriendlyList":[]

},

"hotelGeoInfo":{

"hotelMapInfo":[

{

"lat":-1.0,

"lon":-1.0,

"mapType":"BAI_DU"

},

{

"lat":-1.0,

"lon":-1.0,

"mapType":"GAO_DE"

},

{

"lat":1.29201249514013,

"lon":103.858609199524,

"mapType":"GOOGLE"

}

],

"cityInfo":{

"id":73,

"name":"新加坡"

},

"countryInfo":{

"id":3,

"name":"新加坡"

},

"zoneInfoList":[

{

"id":376,

"name":"滨海湾"

}

],

"landMarkDistance":0.0

},

"hotelReviewInfo":{

"hotelReviewScore":0.0,

"totalNumberOfHotelReviews":0

}

},

"hotelTagInfo":[],

"minPriceRoomInfo":{

"saleRoomId":10825486,

"canReserve":true,

"minPriceInfo":{

"avgPriceExcludeTax":{

"originPriceInfo":{

"price":154.92,

"currency":"SGD"

},

"customPrice":750

},

"avgPriceIncludeTax":{

"originPriceInfo":{

"price":288.02,

"currency":"SGD"

},

"customPrice":1395

}

},

"minSalePrice":750,

"minSalePriceIncludeTax":1395,

"taxInfoList":[

{

"taxType":"OTHER",

"includeInTotalPrice":false

},

{

"taxPrice":{

"originPriceInfo":{

"price":80,

"currency":"SGD"

},

"customPrice":387

},

"taxType":"OTHER",

"includeInTotalPrice":true

},

{

"taxPrice":{

"originPriceInfo":{

"price":3.1,

"currency":"SGD"

},

"customPrice":15

},

"taxType":"OTHER",

"includeInTotalPrice":true

},

{

"taxPrice":{

"originPriceInfo":{

"price":50,

"currency":"SGD"

},

"customPrice":242

},

"taxType":"OTHER",

"includeInTotalPrice":true

},

{

"taxPrice":{

"originPriceInfo":{

"price":50,

"currency":"SGD"

},

"customPrice":242

},

"taxType":"OTHER",

"includeInTotalPrice":false

}

]

},

"hasContractRoom":false

},

{

"hotelBaseInfo":{

"hotelId":962739,

"hotelName":"Mandarin Orchard Singapor宾馆(Mandarin Orchard Singapore)",

"hotelEnName":"testintl",

"hotelAddress":"7 Raffles Avenue",

"hotelLogoUrl":"http://images4.fx.ctripcorp.com/target/2003180000015h92uDB2B_R_120_120.jpg",

"hotelStar":5,

"starLicence":false

},

"hotelStaticInfo":{

"hotelFacilitiesInfo":{

"facilityInfoList":[

{

"facilityType":"PARKING",

"facilityName":"停⻋场"

}

],

"chineseFriendlyList":[]

},

"hotelGeoInfo":{

"hotelMapInfo":[

{

"lat":1.19,

"lon":103.38,

"mapType":"BAI_DU"

},

{

"lat":1.19,

"lon":103.38,

"mapType":"GAO_DE"

},

{

"lat":1.19,

"lon":103.38,

"mapType":"GOOGLE"

}

],

"cityInfo":{

"id":73,

"name":"新加坡"

},

"countryInfo":{

"id":3,

"name":"新加坡"

},

"zoneInfoList":[

{

"id":376,

"name":"滨海湾"

}

],

"landMarkDistance":0.0

},

"hotelReviewInfo":{

"hotelReviewScore":0.0,

"totalNumberOfHotelReviews":0

}

},

"hotelTagInfo":[],

"minPriceRoomInfo":{

"saleRoomId":18592856,

"canReserve":true,

"minPriceInfo":{

"avgPriceExcludeTax":{

"originPriceInfo":{

"price":131.22,

"currency":"USD"

},

"customPrice":842

},

"avgPriceIncludeTax":{

"originPriceInfo":{

"price":137.78,

"currency":"USD"

},

"customPrice":884

}

},

"minSalePrice":842,

"minSalePriceIncludeTax":884,

"taxInfoList":[

{

"taxPrice":{

"originPriceInfo":{

"price":1.72,

"currency":"USD"

},

"customPrice":11

},

"taxType":"OTHER",

"includeInTotalPrice":false

},

{

"taxPrice":{

"originPriceInfo":{

"price":6.56,

"currency":"USD"

},

"customPrice":42

},

"taxType":"VAT",

"includeInTotalPrice":true

},

{

"taxPrice":{

"originPriceInfo":{

"price":7.87,

"currency":"USD"

},

"customPrice":50

},

"taxType":"OTHER",

"includeInTotalPrice":false

},

{

"taxPrice":{

"originPriceInfo":{

"price":1.56,

"currency":"USD"

},

"customPrice":10

},

"taxType":"OTHER",

"includeInTotalPrice":false

},

{

"taxPrice":{

"originPriceInfo":{

"price":0.78,

"currency":"USD"

},

"customPrice":5

},

"taxType":"OTHER",

"includeInTotalPrice":false

},

{

"taxPrice":{

"originPriceInfo":{

"price":1.25,

"currency":"USD"

},

"customPrice":8

},

"taxType":"OTHER",

"includeInTotalPrice":false

},

{

"taxPrice":{

"originPriceInfo":{

"price":0.94,

"currency":"USD"

},

"customPrice":6

},

"taxType":"OTHER",

"includeInTotalPrice":false

}

]

},

"hasContractRoom":false

},

{

"hotelBaseInfo":{

"hotelId":996053,

"hotelName":"新加坡圣淘沙名胜世界新加坡Hard Rock酒店aaa",

"hotelEnName":"Resorts World Sentosa-Hard Rock Hotel(Staycation Approved)",

"hotelAddress":"8 Sentosa Gateway",

"hotelLogoUrl":"http://images4.fx.ctripcorp.com/target/220s0p000000fo132D205_R_120_120.jpg",

"hotelStar":3,

"starLicence":false

},

"hotelStaticInfo":{

"hotelFacilitiesInfo":{

"facilityInfoList":[],

"chineseFriendlyList":[]

},

"hotelGeoInfo":{

"hotelMapInfo":[

{

"lat":-1.0,

"lon":-1.0,

"mapType":"BAI_DU"

},

{

"lat":-1.0,

"lon":-1.0,

"mapType":"GAO_DE"

},

{

"lat":1.25737229404887,

"lon":103.819770812988,

"mapType":"GOOGLE"

}

],

"cityInfo":{

"id":73,

"name":"新加坡"

},

"countryInfo":{

"id":3,

"name":"新加坡"

},

"zoneInfoList":[

{

"id":794,

"name":"圣淘沙岛"

}

],

"landMarkDistance":0.0

},

"hotelReviewInfo":{

"hotelReviewScore":4.4,

"totalNumberOfHotelReviews":2275

}

},

"hotelTagInfo":[

{

"hotelTagList":[

{

"tagCode":"TTTJ",

"name":"天天特价",

"desc":"活动房型每间每晚最高可减{0}元"

},

{

"tagCode":"HYYX",

"name":"会员优享",

"desc":"激励话术"

},

{

"tagCode":"SLHD",

"name":"时令活动",

"desc":"活动房型,可立减{0}"

},

{

"tagCode":"JDCX",

"name":"酒店促销",

"desc":""

}

],

"hotelTagType":"PRICE_PROMOTION"

}

],

"minPriceRoomInfo":{

"saleRoomId":99647237,

"canReserve":true,

"minPriceInfo":{

"avgPriceExcludeTax":{

"originPriceInfo":{

"price":260.28,

"currency":"RMB"

},

"customPrice":260

},

"avgPriceIncludeTax":{

"originPriceInfo":{

"price":276,

"currency":"RMB"

},

"customPrice":276

}

},

"promotionsPriceInfo":{

"avgDiscountedPrice":{

"originPriceInfo":{

"price":87,

"currency":"RMB"

},

"customPrice":87

}

},

"minSalePrice":173,

"minSalePriceIncludeTax":189,

"taxInfoList":[

{

"taxPrice":{

"originPriceInfo":{

"price":15.72,

"currency":"RMB"

},

"customPrice":16

},

"taxType":"OTHER",

"includeInTotalPrice":true

}

]

},

"hasContractRoom":false

},

{

"hotelBaseInfo":{

"hotelId":996300,

"hotelName":"新加坡香格里拉圣淘沙度假村",

"hotelEnName":"Shangri-La Rasa Sentosa Resort Singapore",

"hotelAddress":"101 Siloso Road",

"hotelLogoUrl":"http://images4.fx.ctripcorp.com/target/200q1g000001h5mb08F31_R_120_120.jpg",

"hotelStar":5,

"starLicence":false

},

"hotelStaticInfo":{

"hotelFacilitiesInfo":{

"facilityInfoList":[

{

"facilityType":"PARKING",

"facilityName":"停⻋场"

}

],

"chineseFriendlyList":[]

},

"hotelGeoInfo":{

"hotelMapInfo":[

{

"lat":-1.0,

"lon":-1.0,

"mapType":"BAI_DU"

},

{

"lat":-1.0,

"lon":-1.0,

"mapType":"GAO_DE"

},

{

"lat":1.25776112067967,

"lon":103.809725940228,

"mapType":"GOOGLE"

}

],

"cityInfo":{

"id":73,

"name":"新加坡"

},

"countryInfo":{

"id":3,

"name":"新加坡"

},

"zoneInfoList":[

{

"id":794,

"name":"圣淘沙岛"

}

],

"landMarkDistance":0.0

},

"hotelReviewInfo":{

"hotelReviewScore":0.0,

"totalNumberOfHotelReviews":0

}

},

"hotelTagInfo":[

{

"hotelTagList":[

{

"tagCode":"SLHD",

"name":"时令活动",

"desc":"活动房型,可立减{0}"

},

{

"tagCode":"CXTH",

"name":"出行特惠",

"desc":"订过火⻋票(含高铁)或国内外机票的用户(预订时间在90天内且订单未取消),订酒店活动房型每间每晚最高可减{0}元(同一个账号

在一个自然年内最多享受12单优惠)"

},

{

"tagCode":"JDCX",

"name":"酒店促销",

"desc":""

}

],

"hotelTagType":"PRICE_PROMOTION"

},

{

"hotelTagList":[

{

"tagCode":"HJHY",

"name":"⻩金会员",

"desc":""

}

],

"hotelTagType":"USER_LEVEL"

}

],

"minPriceRoomInfo":{

"saleRoomId":70763370,

"canReserve":true,

"minPriceInfo":{

"avgPriceExcludeTax":{

"originPriceInfo":{

"price":232.44,

"currency":"JPY"

},

"customPrice":14

},

"avgPriceIncludeTax":{

"originPriceInfo":{

"price":368.16,

"currency":"JPY"

},

"customPrice":22

}

},

"minSalePrice":14,

"minSalePriceIncludeTax":22,

"taxInfoList":[

{

"taxPrice":{

"originPriceInfo":{

"price":135.72,

"currency":"JPY"

},

"customPrice":8

},

"taxType":"OTHER",

"includeInTotalPrice":true

},

{

"taxPrice":{

"originPriceInfo":{

"price":11.62,

"currency":"JPY"

},

"customPrice":1

},

"taxType":"OTHER",

"includeInTotalPrice":false

},

{

"taxPrice":{

"originPriceInfo":{

"price":16.27,

"currency":"JPY"

},

"customPrice":1

},

"taxType":"OTHER",

"includeInTotalPrice":false

},

{

"taxPrice":{

"originPriceInfo":{

"price":169.65,

"currency":"JPY"

},

"customPrice":10

},

"taxType":"OTHER",

"includeInTotalPrice":false

},

{

"taxPrice":{

"originPriceInfo":{

"price":16.27,

"currency":"JPY"

},

"customPrice":1

},

"taxType":"OTHER",

"includeInTotalPrice":false

},

{

"taxPrice":{

"originPriceInfo":{

"price":13.95,

"currency":"JPY"

},

"customPrice":1

},

"taxType":"OTHER",

"includeInTotalPrice":false

},

{

"taxPrice":{

"originPriceInfo":{

"price":508.96,

"currency":"JPY"

},

"customPrice":30

},

"taxType":"OTHER",

"includeInTotalPrice":false

},

{

"taxPrice":{

"originPriceInfo":{

"price":18.59,

"currency":"JPY"

},

"customPrice":1

},

"taxType":"OTHER",

"includeInTotalPrice":false

},

{

"taxPrice":{

"originPriceInfo":{

"price":203.58,

"currency":"JPY"

},

"customPrice":12

},

"taxType":"OTHER",

"includeInTotalPrice":false

}

]

},

"hasContractRoom":false

},

{

"hotelBaseInfo":{

"hotelId":1308129,

"hotelName":"新加坡文华东方酒店",

"hotelEnName":"Mandarin Oriental Singapore",

"hotelAddress":"5 Raffles Avenue Marina Square 039797",

"hotelLogoUrl":"http://images4.fx.ctripcorp.com/target/20061a0000019c2fl2202_R_120_120.jpg",

"hotelStar":5,

"starLicence":false

},

"hotelStaticInfo":{

"hotelFacilitiesInfo":{

"facilityInfoList":[

{

"facilityType":"PARKING",

"facilityName":"停⻋场"

}

],

"chineseFriendlyList":[]

},

"hotelGeoInfo":{

"hotelMapInfo":[

{

"lat":-1.0,

"lon":-1.0,

"mapType":"BAI_DU"

},

{

"lat":-1.0,

"lon":-1.0,

"mapType":"GAO_DE"

},

{

"lat":1.29186232961828,

"lon":103.857327103615,

"mapType":"GOOGLE"

}

],

"cityInfo":{

"id":73,

"name":"新加坡"

},

"countryInfo":{

"id":3,

"name":"新加坡"

},

"zoneInfoList":[

{

"id":376,

"name":"滨海湾"

}

],

"landMarkDistance":0.0

},

"hotelReviewInfo":{

"hotelReviewScore":0.0,

"totalNumberOfHotelReviews":0

}

},

"hotelTagInfo":[],

"minPriceRoomInfo":{

"saleRoomId":98904530,

"canReserve":true,

"minPriceInfo":{

"avgPriceExcludeTax":{

"originPriceInfo":{

"price":66.27,

"currency":"RMB"

},

"customPrice":66

},

"avgPriceIncludeTax":{

"originPriceInfo":{

"price":78,

"currency":"RMB"

},

"customPrice":78

}

},

"minSalePrice":66,

"minSalePriceIncludeTax":78,

"taxInfoList":[

{

"taxPrice":{

"originPriceInfo":{

"price":11.7298215802889,

"currency":"RMB"

},

"customPrice":12

},

"taxType":"SERVICE_FEE",

"includeInTotalPrice":true

}

]

},

"hasContractRoom":false

},

{

"hotelBaseInfo":{

"hotelId":1406594,

"hotelName":"RELC国际酒店",

"hotelEnName":"Relc International Hotel",

"hotelAddress":"30 Orange Grove Road",

"hotelLogoUrl":"http://images4.fx.ctripcorp.com/target/220l180000014gux0B72B_R_120_120.jpg",

"hotelStar":4,

"starLicence":false

},

"hotelStaticInfo":{

"hotelFacilitiesInfo":{

"facilityInfoList":[

{

"facilityType":"PARKING",

"facilityName":"停⻋场"

}

],

"chineseFriendlyList":[]

},

"hotelGeoInfo":{

"hotelMapInfo":[

{

"lat":-1.0,

"lon":-1.0,

"mapType":"BAI_DU"

},

{

"lat":-1.0,

"lon":-1.0,

"mapType":"GAO_DE"

},

{

"lat":1.31287468982834,

"lon":103.825894296169,

"mapType":"GOOGLE"

}

],

"cityInfo":{

"id":73,

"name":"新加坡"

},

"countryInfo":{

"id":3,

"name":"新加坡"

},

"zoneInfoList":[

{

"id":318,

"name":"乌节路"

}

],

"landMarkDistance":0.0

},

"hotelReviewInfo":{

"hotelReviewScore":0.0,

"totalNumberOfHotelReviews":0

}

},

"hotelTagInfo":[

{

"hotelTagList":[

{

"tagCode":"TTTJ",

"name":"天天特价",

"desc":"活动房型每间每晚最高可减{0}元"

}

],

"hotelTagType":"PRICE_PROMOTION"

}

],

"minPriceRoomInfo":{

"saleRoomId":15310970,

"canReserve":true,

"minPriceInfo":{

"avgPriceExcludeTax":{

"originPriceInfo":{

"price":55.55,

"currency":"SGD"

},

"customPrice":270

},

"avgPriceIncludeTax":{

"originPriceInfo":{

"price":56.17,

"currency":"SGD"

},

"customPrice":273

}

},

"minSalePrice":270,

"minSalePriceIncludeTax":273,

"taxInfoList":[

{

"taxPrice":{

"originPriceInfo":{

"price":0.21,

"currency":"SGD"

},

"customPrice":1

},

"taxType":"VAT",

"includeInTotalPrice":true

},

{

"taxPrice":{

"originPriceInfo":{

"price":0.41,

"currency":"SGD"

},

"customPrice":2

},

"taxType":"OTHER",

"includeInTotalPrice":true

},

{

"taxPrice":{

"originPriceInfo":{

"price":0.83,

"currency":"SGD"

},

"customPrice":4

},

"taxType":"OTHER",

"includeInTotalPrice":false

}

]

},

"hasContractRoom":false

},

{

"hotelBaseInfo":{

"hotelId":2084551,

"hotelName":"22新加坡牛津酒店",

"hotelEnName":"1Oxford Hotel Singapore",

"hotelAddress":"218 Queen Street",

"hotelLogoUrl":"http://images4.fx.ctripcorp.com/target/220k0g00000080oftB8E9_R_120_120.jpg",

"hotelStar":2,

"starLicence":false

},

"hotelStaticInfo":{

"hotelFacilitiesInfo":{

"facilityInfoList":[],

"chineseFriendlyList":[]

},

"hotelGeoInfo":{

"hotelMapInfo":[

{

"lat":-1.0,

"lon":-1.0,

"mapType":"BAI_DU"

},

{

"lat":-1.0,

"lon":-1.0,

"mapType":"GAO_DE"

},

{

"lat":1.29793911003452,

"lon":103.851917088032,

"mapType":"GOOGLE"

}

],

"cityInfo":{

"id":73,

"name":"新加坡"

},

"countryInfo":{

"id":3,

"name":"新加坡"

},

"zoneInfoList":[

{

"id":881,

"name":"武吉士"

}

],

"landMarkDistance":0.0

},

"hotelReviewInfo":{

"hotelReviewScore":0.0,

"totalNumberOfHotelReviews":0

}

},

"hotelTagInfo":[],

"minPriceRoomInfo":{

"saleRoomId":99705744,

"canReserve":true,

"minPriceInfo":{

"avgPriceExcludeTax":{

"originPriceInfo":{

"price":240.90,

"currency":"SGD"

},

"customPrice":1167

},

"avgPriceIncludeTax":{

"originPriceInfo":{

"price":284.22,

"currency":"SGD"

},

"customPrice":1377

}

},

"minSalePrice":1167,

"minSalePriceIncludeTax":1377,

"taxInfoList":[

{

"taxPrice":{

"originPriceInfo":{

"price":31.32,

"currency":"SGD"

},

"customPrice":152

},

"taxType":"OTHER",

"includeInTotalPrice":true

},

{

"taxPrice":{

"originPriceInfo":{

"price":12,

"currency":"SGD"

},

"customPrice":58

},

"taxType":"OTHER",

"includeInTotalPrice":true

}

]

},

"hasContractRoom":false

}

],

"searchResult":{

"firstPage":true,

"lastPage":false,

"hotelCount":513

},

"ResponseStatus":{

"Timestamp":"/Date(1643263112111+0800)/",

"Ack":"Success",

"Errors":[],

"Extension":[]

},

"status":{

"success":true,

"errorCode":22700000,

"errorMessage":"处理成功"

}

## 附录

ICode附录

| 测试环境 | 生产环境 |
| --- | --- |
| 76bc8a14ddd64d15bc3716bc525f7767 | 76bc8a14ddd64d15bc3716bc525f7767 |

## 错误码

| 10899000 | 成功 |  |
| --- | --- | --- |
| 10899001 | Request不能为空 |  |
| 10812000 | baseInfo节点不能缺失 |  |
| 10810001 | corpID不能为空 |  |
| 10810016 | uID不能为空 |  |
| 10810005 | %s can not be empty | SearchBaseInfo、MapType、Lat、Lon、<br>Radius |
| 10810025 | cityID不能为空 |  |
| 10810004 | cityID非法 |  |
| 10810026 | checkInDate不能为空 |  |
| 10810002 | checkInDate非法 |  |
| 10810027 | checkOutDate不能为空 |  |
| 10810003 | checkOutDate非法 |  |

| 10810024 | checkOutDate不能早于<br>checkInDate |  |
| --- | --- | --- |
| -2 | auth fail | 鉴权失败 |

扩展策略

| SHIELD_OFFICIAL_STAR | 0,1,2,3,4,5 | 屏蔽对应挂牌星级的酒店 |
| --- | --- | --- |
| SHIELD_DIAMOND | 0,1,2,3,4,5 | 屏蔽对应钻级的酒店 |

*可与HotelFilter节点下的hotelStar同时生效,hotelStar设置的是白名单,扩展策略设置的是黑名单。

例:hotelStar:{3,4},SHIELD_DIAMOND:{1,2,3},SHIELD_OFFICIAL_STAR:{4},此时仅会输出星级为3;或钻级为4的酒店

### 版本

| 版本号 | 编写日期 | 更改内容 | 作者 |
| --- | --- | --- | --- |
| V1.1 | 2022/01/27 | 完善概述请求地址的icode,增<br>加请求返回报文JSON示例 | ⻩华 |
| V1.2 | 2022/02/16 | 增加错误码附录 | ⻩华 |

常⻅问题

1、 问题:入参hotelIdList母酒店Id列表是什么?什么是母酒店?
答复:母酒店:指具体的一个物理酒店,有统一的酒店ID;就理解为酒店id就可以了,母子酒店是携程的概念
2、 问题:入参keyword直搜关键字,取自关键字查询接口返参吗?关键字查询接口返参有destinationInfoList、baiDuKeywordInfoList、
otherCityDestinationList,优先取哪个集合下面的keywordname?
答复:模糊查询,可以直接传入keyword,选搜,先调关键字查询接口,拿到id,传对应的搜索条件。用户选择:选搜的展示方式参考携程商旅的设计,先展
示destinationInfoList(baiDuKeywordInfoList)、再展示其他城市otherCityDestinationList
3、 问题:入参hotelStar酒店星级,列举一下各种取值?
答复:0,1,2,3,4,5
4、 问题:入参metroId地铁线id,为什么没有地铁站点id?我们查询酒店列表的时候,不都是选择在某个地铁站附近吗?
答复:目前我们调用的下游接口,只提供了地铁线的筛选
5、 问题:入参有酒店起价的价格区间字段吗?(根据酒店最低价区间筛选酒店,比如筛选酒店起步价在100-300的酒店)
答复:RoomPriceRange节点
6、 问题:入参缺少机场⻋站?
答复:没有,没有的走关键字搜索方案
7、 问题:入参不需要关键字类型吗?取自关键字查询接口返参
答复:是的。
8、 问题:返参hasContractRoom酒店是否含协议房型,如果酒店包含协议房型,是不是代表该酒店是协议酒店?
答复:可以这么判断,这个我们可以扩展
9、 问题:返参酒店最低价是哪个字段?
答复:minPriceRoomInfo.MinPriceInfo.AvgPriceIncludeTax.CustomPrice
10、 问题:返参没有酒店品牌?

答复:没有,可以通过品牌静态接口关联
11、 问题:返参缺少酒店是否含早字段?
答复:酒店没有,到房型才有,可以用HasBreakfast做搜索条件
12、 问题:返参缺少推荐级别?
答复:没有,酒店静态信息接口中有评分和推荐度,可以关联
13、 问题:酒店图片?
答复:HotelLogoUrl,酒店Logo
14、 酒店星级hotelStar字段可以传哪些值?是否有钻级评分?
可以传入0~5,对应无星级~五星级。目前暂无钻级概念。
