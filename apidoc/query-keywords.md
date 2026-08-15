# 关键词查询接口

更新时间:2026-06-15 19:54:09

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
| 功能描述 |  | 根据关键词如行政区、地标、地铁线等 |
| 接口地址 |  | 测试:http://openservice.open.uat.ctripqa.com/openservice/serviceproxy.ashx<br>生产:https://sopenservice.ctrip.com/OpenService/ServiceProxy.ashx |
| 请求方式 |  | POST |
| 请求示例 |  | 测试:http://openservice.open.uat.ctripqa.com/openservice/serviceproxy.ashx?<br>aid=1&sid=50&icode=def87cf934d841d6a75ac57c317b80cd&token=62c55c0e980fa2a30f8925be3293021fa9f0532b79d88d4120af8d<br>94de654c23&uuid=e9d518cdc93e42e7803b98a495dae0ce&e=r6&mode=1&format=json<br>生产: https://sopenservice.ctrip.com/OpenService/ServiceProxy.ashx?<br>aid=***&sid=***&icode=f15a8bfda7e74db18b64f6305f656b1b&token=5d209dc368975204530715713e8e452c52464b6f75fd198b1fda4<br>8dc1e9d3278&uuid=bc379e1b3c9f4cfda14892a25e815477&e=r6&mode=1&format=json |
| 接入流程 |  | 酒店分销接入流程 |
| token说明 |  | Token生成说明 |

## 请求契约

| 名称 | 类型 | 是否必填 | 描述 |
| --- | --- | --- | --- |
| corpSuggestKeyWordRequestType | CorpSuggestKeyWordRequestType | Y | CorpSuggestKeyWordRequestType |
| keyword | String | Y | 关键字(用UTF-8进行Url编码传入) |
| countryId | Integer | N | 国家Id |
| corpId | String | N | 公司ID |
| cityId | Integer | Y | 城市ID |
| language | String | N | 语言版本 |

| 名称 | 类型 | 是否必填 | 描述 |
| --- | --- | --- | --- |
| locale | String | N | zh-CN或者en-US,有传入locale优先使用local<br>e,没传使用language |

## 响应契约

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| corpSuggestKeyWordResponseType | CorpSuggestKeyWordResponseType | CorpSuggestKeyWordResponseType |
| status | ResponseStatus | 接口返回状态 |
| success | Boolean |  |
| errorCode | Integer |  |
| errorMessage | String |  |
| destinationInfoList | List<CorpKeywordEntity> | 当前城市关键字列表 |
| keywordName | String | 关键字名称 |
| destinationId | Integer | 目的地名称ID |
| destinationType | String | 目的地类型(待废弃,请使用resultType) |
| address | String | 地址 |
| ratingScore | Double | 点评分 |
| zoneName | String | 商业区名称 |
| coordinateInfo | CorpCoordinateEntity | 经纬度信息 |
| bDLat | Double | 百度纬度 |
| bDLon | Double | 百度经度 |
| gLat | Double | 谷歌纬度 |
| gLon | Double | 谷歌经度 |
| gDLat | Double | 高德纬度 |
| gDLon | Double | 高德经度 |
| cityId | Integer | 城市ID |
| cityName | String | 城市名称 |
| parentCityList | List<CityEntity> | 上级城市列表 |
| cityId | Integer | 城市ID |
| cityName | String | 城市名称 |
| childCityList | List<CityEntity> | 下级城市列表 |

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| cityId | Integer | 城市ID |
| cityName | String | 城市名称 |
| locationList | List<LocationEntity> | 行政区列表 |
| locationId | String | 行政区Id |
| locationName | String | 行政区名称 |
| resultType | String | 结果类型<br>CORP_PLACE: 企业地标<br>ZONE: 商业区<br>LANDMARK: 地标<br>METRO_STATION: 地铁站<br>METRO: 地铁线<br>CITY: 城市<br>SCENIC_AREA: 行政区<br>AIRPORT: 机场<br>INTL_AIRPORT: 国际机场<br>RAILWAY_STATION: 火⻋站<br>PLAIN_TEXT: 百度联想结果<br>HOTEL: 酒店<br>HOTEL_BRAND: 酒店品牌<br>HOTEL_GROUP: 酒店集团 |
| baiDuKeywordInfoList | List<CorpBaiDuKeywordEntity> | 当前城市关键字列表无结果推荐百度联想结果 |
| keywordName | String | 关键字名称 |
| bDLat | Double | 百度纬度 |
| bDLon | Double | 百度经度 |
| otherCityDestinationList | List<CorpDestinationEntity> | 当前城市关键字列表无结果推荐其他城市结果 |
| destinationName | String | 目的地名称 |
| destinationId | Integer | 目的地名称ID |
| destinationType | String | 目的地类型(待废弃) |
| cityId | Integer | 城市ID |
| cityName | String | 城市名称 |
| parentCityList | List<CityEntity> | 上级城市列表 |
| cityId | Integer | 城市ID |
| cityName | String | 城市名称 |
| childCityList | List<CityEntity> | 下级城市列表 |
| cityId | Integer | 城市ID |
| cityName | String | 城市名称 |
| locationList | List<LocationEntity> | 行政区列表 |

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| locationId | String | 行政区Id |
| locationName | String | 行政区名称 |
| provinceId | Integer | 省份ID |
| provinceName | String | 省份名称 |
| countryId | Integer | 国家ID |
| countryName | String | 国家名称 |
| address | String | 地址 |
| ratingScore | Double | 点评分 |
| zoneName | String | 商业区名称 |
| coordinateInfo | CorpCoordinateEntity | 经纬度信息 |
| bDLat | Double | 百度纬度 |
| bDLon | Double | 百度经度 |
| gLat | Double | 谷歌纬度 |
| gLon | Double | 谷歌经度 |
| gDLat | Double | 高德纬度 |
| gDLon | Double | 高德经度 |
| resultType | String | 结果类型<br>CORP_PLACE: 企业地标<br>ZONE: 商业区<br>LANDMARK: 地标<br>METRO_STATION: 地铁站<br>METRO: 地铁线<br>CITY: 城市<br>SCENIC_AREA: 行政区<br>AIRPORT: 机场<br>INTL_AIRPORT: 国际机场<br>RAILWAY_STATION: 火⻋站<br>PLAIN_TEXT: 百度联想结果<br>HOTEL: 酒店<br>HOTEL_BRAND: 酒店品牌<br>HOTEL_GROUP: 酒店集团 |

### 示例

请求数据的JSON格式示例

{

"Auth": {
"AppKey": "***",
"Ticket": "580487ff97194e2f64000004"
},

"keyword":"上海外滩",

"countryId":null,

"corpId":"ForJointTest",

"cityId":2,

"language":null

}

返回数据的JSON格式示例

{

"ResponseStatus":{

"Timestamp":"/Date(1643260613660+0800)/",

"Ack":"Success",

"Errors":[],

"Extension":[]

},

"status":{

"success":true,

"errorCode":10899000,

"errorMessage":"成功"

},

"destinationInfoList":[

{

"keywordName":"外滩",

"destinationId":4189898,

"destinationType":"LANDMARK",

"coordinateInfo":{

"bDLat":31.246186,

"bDLon":121.497149,

"gLat":31.237771,

"gLon":121.490601

}

},

{

"keywordName":"上海外滩W酒店",

"destinationId":7270168,

"destinationType":"HOTEL",

"coordinateInfo":{

"bDLat":31.254817,

"bDLon":121.503035,

"gLat":31.24917275392,

"gLon":121.49643208707

}

},

{

"keywordName":"上海外滩悦榕庄",

"destinationId":374910,

"destinationType":"HOTEL",

"coordinateInfo":{

"bDLat":31.25559715,

"bDLon":121.5135036,

"gLat":31.24993559,

"gLon":121.5069062

}

},

{

"keywordName":"锦江都城经典上海新亚外滩酒店(原新亚大酒店)",

"destinationId":468443,

"destinationType":"HOTEL",

"coordinateInfo":{

"bDLat":31.250991425982,

"bDLon":121.49198116966,

"gLat":31.245251,

"gLon":121.4854

}

},

{

"keywordName":"上海外滩八号艺术酒店(原外滩帕奇艺术酒店)",

"destinationId":963186,

"destinationType":"HOTEL",

"coordinateInfo":{

"bDLat":31.238514651809,

"bDLon":121.498140805,

"gLat":31.232839,

"gLon":121.491537

}

},

{

"keywordName":"上海外滩花园酒店",

"destinationId":662813,

"destinationType":"HOTEL",

"coordinateInfo":{

"bDLat":31.241975808659,

"bDLon":121.49243648619,

"gLat":31.23624,

"gLon":121.485849

}

},

{

"keywordName":"上海外滩和颐酒店",

"destinationId":3792196,

"destinationType":"HOTEL",

"coordinateInfo":{

"bDLat":31.24856504581,

"bDLon":121.49245955335,

"gLat":31.242584555701,

"gLon":121.485968793265

}

},

{

"keywordName":"豫园",

"destinationId":4189948,

"destinationType":"LANDMARK",

"coordinateInfo":{

"bDLat":31.232775,

"bDLon":121.498986,

"gLat":31.226853,

"gLon":121.492083

}

},

{

"keywordName":"上海外滩悦榕庄-会议厅",

"destinationId":7718042,

"destinationType":"LANDMARK",

"coordinateInfo":{

"bDLat":31.255468,

"bDLon":121.513145,

"gLat":31.2498081,

"gLon":121.5065467

}

},

{

"keywordName":"金光外滩中心",

"destinationId":2556296,

"destinationType":"LANDMARK",

"coordinateInfo":{

"bDLat":31.238085,

"bDLon":121.494225,

"gLat":31.232372,

"gLon":121.48763

}

},

{

"keywordName":"外滩地区",

"destinationId":118,

"destinationType":"ZONE",

"coordinateInfo":{

"bDLat":31.244842490314,

"bDLon":121.49601388335,

"gLat":31.239148,

"gLon":121.489417

}

},

{

"keywordName":"外滩soho",

"destinationId":10244806,

"destinationType":"LANDMARK",

"coordinateInfo":{

"bDLat":31.236,

"bDLon":121.50087,

"gLat":31.2303438,

"gLon":121.494261

}

},

{

"keywordName":"外滩3号",

"destinationId":4248597,

"destinationType":"LANDMARK",

"coordinateInfo":{

"bDLat":31.2397499,

"bDLon":121.4975511,

"gLat":31.2340702,

"gLon":121.4909488

}

},

{

"keywordName":"外滩观光隧道-浦⻄进出口",

"destinationId":1085070,

"destinationType":"LANDMARK",

"coordinateInfo":{

"bDLat":31.245443,

"bDLon":121.497086,

"gLat":31.23976,

"gLon":121.490486

}

},

{

"keywordName":"外滩18",

"destinationId":2586001,

"destinationType":"LANDMARK",

"coordinateInfo":{

"bDLat":31.24413,

"bDLon":121.4963,

"gLat":31.238434,

"gLon":121.489692

}

],

"otherCityDestinationList":[]

}

## 附录

ICode附录

| 测试环境 | 生产环境 |
| --- | --- |
| def87cf934d841d6a75ac57c317b80cd | f15a8bfda7e74db18b64f6305f656b1b |

错误编码信息列表

| 10813001 | 酒店关键字查询Keyword值不能为空 |  |
| --- | --- | --- |
| 10813003 | 酒店关键字查询失败 |  |
| 10899000 | 成功 |  |
| 10899001 | Request不能为空 |  |
| -2 | auth fail |  |

### 版本

| 版本号 | 编写日期 | 更改内容 | 作者 |
| --- | --- | --- | --- |
| V1.0 | 2019/12/16 | 初稿 |  |
| V1.1 | 2022/01/27 | 增加请求返回报文JSON示例 | ⻩华 |

常⻅问题

1、 问题:“关键词查询”接口支持多关键字查询么?具体如何使用?
答复:关键字查询不支持多关键字。该查询是一个模糊查询,将查询结果带到酒店列表查询⻚面回填到查询搜索框,写成会根据回填框过滤一下,真实的发送
到“商旅酒店查询列表”接口中。
2、 问题:支持根据酒店名称搜索吗?
答复:支持
3、 问题:返参keywordName是什么?
答复:匹配上关键字的结果,比如关键字是希尔顿,返回可能是成都春熙路希尔顿欢朋酒店
4、 问题:返参destinationType目的地类型有哪些?
关键词查询接口中返回的destinationType类型有哪些?
答复:类型分别为:
HOTEL 酒店
CITY 城市
LOCATION 行政区
SCENIC_AREA 景区
ZONE 商业区
LANDMARK 地标
AIRPORT 机场
INTL_AIRPORT 海外国际机场
METRO_STATION 地铁站
RAILWAY_STATION 火⻋站
METRO 地铁线
HOTEL_BRAND 酒店品牌
HOTEL_GROUP 酒店集团
CORP_PLACE 公司地标
