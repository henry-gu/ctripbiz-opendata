# 目的地模糊查询

更新时间:2026-06-15 20:17:55

## 概述

| 项目 | 内容 |
| --- | --- |
| 接口名 | SuggestDestination |
| 描述 | 国内海外酒店目的地模糊查询 |
| 调用方式 | https + post |
| 参数类型 | JSON |
| 调用地址 | 测试环境:https://gateway.fat.ctripqa.com/switchapi/distribution/hotel/suggestDestination<br>生产环境:https://ct.ctrip.com/distribution/hotel/suggestDestination<br>生产环境(海外):https://openapi.trip.biz/distribution/hotel/suggestDestination |
| ticket说明 | Ticket生成说明 |
| 公共鉴权请求<br>节点 |  |

待废弃(请使用上述方式接入)

| 项目 | 内容 |
| --- | --- |
| 功能描述 | 国内海外酒店目的地模糊查询 |
| 接口地址 | 测试:http://openservice.open.uat.ctripqa.com/openservice/serviceproxy.ashx<br>生产:https://sopenservice.ctrip.com/OpenService/ServiceProxy.ashx |
| 请求方式 | POST |
| 请求示例 | 测试:http://openservice.open.uat.ctripqa.com/openservice/serviceproxy.ashx?<br>aid=1&sid=50&icode=1bd1657ffaeb443693bac48b37a72288&token=86f2722e1396bd7383f448db455b005d20a4062fb9339ad1e5dfe6<br>ac6aa8c779&uuid=e9d518cdc93e42e7803b98a495dae0ce&e=r6&mode=1&format=json<br>生产:https://sopenservice.ctrip.com/OpenService/ServiceProxy.ashx?<br>aid=***&sid=***&icode=1bd1657ffaeb443693bac48b37a72288&token=ca8d7ddca5661429e40403897746073785a1d7a1567c330856b<br>03d7701b569a8&uuid=bc379e1b3c9f4cfda14892a25e815477&e=r6&mode=1&format=json |
| 接入流程 | 酒店分销接入流程 |
| token说明 | Token生成说明 |

## 请求契约

| 名称 | 类型 | 是否必填 | 描述 |
| --- | --- | --- | --- |
| suggestDestinationRequestType | SuggestDestinationRequestType | Y | SuggestDestinationRequestType |
| searchEngineBaseInfo | SearchEngineBaseEntity | Y | 搜索引擎服务基础参数 |
| uid | String | N | 登录卡号 |
| languageType | String | N | 语言类型,大写,CN/EN/ZH_HK |
| requestFrom | String | N | 站点标识:CORP_GDS |
| debugInfo | DebugInfoEntity | Y | 地址 |
| traceLogId | String | Y | 日志追溯ID,必传(GUID保证唯一性) |

| 名称 | 类型 | 是否必填 | 描述 |
| --- | --- | --- | --- |
| locale | String | N | zh-CN或en-US,优先使用locale,没传locale使用l<br>anguage |
| corpId | String | Y | 公司ID |
| keyword | String | Y | 目的地关键字(用UTF-8进行Url编码传入) |
| searchRange | String | N | ALL 全部;DOMESTIC 国内(含港澳台);OVERS<br>EA 海外 |
| onlyGeoData | Boolean | N | 只输出地理信息(只返回国家、省份、城市等信<br>息,不返回酒店、品牌等其他信息) |

## 响应契约

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| suggestDestinationResponseType | SuggestDestinationResponseType | SuggestDestinationResponseType |
| status | ResponseStatus | 接口返回状态 |
| success | Boolean |  |
| errorCode | Integer |  |
| errorMessage | String |  |
| destinationInfoList | List<DestinationEntity> | 目的地列表 |
| destinationName | String | 目的地名称 |
| destinationEnName | String | 关键字英文名称 |
| destinationId | Integer | 目的地名称ID |
| resultType | String | 结果类型<br>CORP_PLACE: 企业地标<br>ZONE: 商业区<br>LANDMARK: 地标<br>METRO_STATION: 地铁站<br>METRO: 地铁线<br>CITY: 城市<br>AIRPORT: 机场<br>INTL_AIRPORT: 国际机场<br>RAILWAY_STATION: 火⻋站<br>PLAIN_TEXT: 百度联想结果<br>HOTEL: 酒店<br>HOTEL_BRAND: 酒店品牌<br>HOTEL_GROUP: 酒店集团 |
| cityId | Integer | 城市ID |
| cityName | String | 城市名称 |
| parentCityList | List<CityEntity> | 上级城市列表 |
| cityId | Integer | 城市ID |
| cityName | String | 城市名称 |

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| childCityList | List<CityEntity> | 下级城市列表 |
| cityId | Integer | 城市ID |
| cityName | String | 城市名称 |
| locationList | List<LocationEntity> | 行政区列表 |
| locationId | String | 行政区Id |
| locationName | String | 行政区名称 |
| timeZoneInfo | TimeZoneType | 时区信息 |
| utcOffset | Integer | UTC偏移量(单位:秒) |
| provinceId | Integer | 省份ID |
| provinceName | String | 省份名称 |
| countryId | Integer | 国家ID |
| countryName | String | 国家名称 |
| zoneName | String | 商业区名称 |
| address | String | 地址 |
| ratingScore | Double | 点评分 |
| coordinateInfo | CoordinateInfo | 经纬度信息 |
| bDLat | Double | 百度纬度 |
| bDLon | Double | 百度经度 |
| gLat | Double | 谷歌纬度 |
| gLon | Double | 谷歌经度 |
| gDLat | Double | 高德纬度 |
| gDLon | Double | 高德经度 |
| errorInfo | ErrorEntity | 错误信息 |
| errorCode | String | 错误码 |
| errorDesc | String | 错误信息描述 |

### 示例

请求数据的JSON格式示例

{

"searchEngineBaseInfo":{

"uid":"String",

"languageType":"CN",

"locale":"String",

"requestFrom":"ONLINE",

"debugInfo":{

"traceLogId":"String"

}

},

"corpId":"String",

"keyword":"String",

"searchRange":"ALL",

"onlyGeoData":false

}

返回数据的JSON格式示例

{

"destinationInfoList":[

{

"destinationName":"Strings Ramen",

"destinationEnName":"Strings Ramen",

"destinationId":4801792,

"destinationType":"LANDMARK",

"resultType":"LANDMARK",

"cityId":549,

"cityName":"芝加哥",

"timeZoneInfo":{

"utcOffset":-21600

},

"provinceId":10291,

"provinceName":"伊利诺伊州",

"countryId":66,

"countryName":"美国",

"address":"2141 S Archer Ave,Chicago,IL 60616",

"ratingScore":0.0,

"coordinateInfo":{

"bDLat":41.853402,

"bDLon":-87.633207,

"gLat":41.8534019,

"gLon":-87.6332068,

"gDLat":41.8534019,

"gDLon":-87.6332068

}

]

}

## 附录

ICode附录

| 测试环境 | 生产环境 |
| --- | --- |
| 1bd1657ffaeb443693bac48b37a72288 | 1bd1657ffaeb443693bac48b37a72288 |

ErrorInfo.ErrorCode附录

| errorCode |  |  | errorDesc |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| C00003 |  |  | 服务必传参数没有赋值【languageType、requestFrom、debugInfo】 |  |  |  |  |  |  |  |
|  | C00004 |  | 关键字没有传值 |  |  |  |  |  |  |  |
|  | C00005 |  | C00005 公司Id没有传值 |  |  |  |  |  |  |  |
|  | C00006 |  | 城市ID没有传值 |  |  |  |  |  |  |  |
|  | C00007 |  | 请求输入的关键字为空 |  |  |  |  |  |  |  |
|  | C00001 |  | 商旅酒店预订搜索引擎服务内部报错 |  |  |  |  |  |  |  |
|  | H00001 |  | 散客MTP平台接口报错 |  |  |  |  |  |  |  |
|  | H00002 |  | 散客搜索引擎关键字联想接口报错 |  |  |  |  |  |  |  |
|  | C00002 |  | 调用商旅公司地标接口报错 |  |  |  |  |  |  |  |
|  | C00008 |  | 调用商旅协议酒店列表接口报错 |  |  |  |  |  |  |  |

Status.ErrorCode附录

| 错误码 | 错误描<br>述 | 备注 |
| --- | --- | --- |
| -2 | auth fail | 鉴权失败 |
| 10899000 | 成功 |  |

### 版本

| 版本号 | 编写日期 | 更改内容 | 作者 |
| --- | --- | --- | --- |
| V1.0 | 2022/03/01 | 创建文档 |  |
