# 标准地理信息(全量)1.0

更新时间:2026-06-16 11:23:24

| 1 概述 |  |  |  |  |
| --- | --- | --- | --- | --- |
| 该文档用于说明携程商旅(以下简称“携程”)向客户提供 |  | 标准国家、城市、机场、⻋站数据查询, | 客户需按照下面文档中的接口开发规范进行接口开发。 |  |
| 客户获取数据的步骤如下: |  |  |  |  |

1)获取ticket

2)获取全量国家数据

3)获取全量标准地理信息数据

### 2接口方法说明

| 2.1 获取Ticket |  |
| --- | --- |
| 服务地址(测试环<br>境): | https://gateway.fat.ctripqa.com/SwitchAPI/Order/Ticket |
| 服务地址(生产环<br>境): | https://ct.ctrip.com/SwitchAPI/Order/Ticket |
| 调用方式: | https + post |
| 描述: | 进行商旅身份认证获取Ticket(有效时间为2个小时。如2个小时内有使用该ticket, 那么<br>有效时间将往后延迟2小时。如2小时之内未使用该ticket,则需要重新获取ticket.) |

| 2.2 获取全量国家+地区数据 |  |
| --- | --- |
| 服务地址(测试环<br>境): | https://gateway.fat.ctripqa.com/switchAPI/basedata/v2/getcountry |
| 服务地址(生产环<br>境): | https://ct.ctrip.com/switchAPI/basedata/v2/getcountry |
| 调用方式: | https + post |
| 描述: | 实时获取全量国家数据信息 |

| 2.3 获取全量标准地理信息数据 |  |
| --- | --- |
| 服务地址(测试环<br>境): | https://gateway.fat.ctripqa.com/switchapi/basedata/v2/queryAllPOIInfo |
| 服务地址(生产环<br>境): | https://ct.ctrip.com/switchapi/basedata/v2/queryAllPOIInfo |
| 调用方式: | https + post |
| 描述: | 按需获取所需的国家、省份、城市、机场、火⻋站、汽⻋站等信息 |
| 查询方法: | 1.国家,查询该国家所需数据;<br>2.国家+省份,查询该省份所需数据,国家与省份信息需匹配;<br>3.国家+省份+地级市,查询该地级市所需数据,国家、省份、地级市信息需匹配;<br>4.国家+地级市,查询该地级市所需数据,国家、地级市信息需匹配。<br>*国家、省份、地级市三者组合入参时,只要组合中有匹配项,即可返回相应数据;<br>*Id与name均支持批量查询英文逗号隔开,国家Id仅支持单个入参,类型为Long;<br>*Id与name同时入参时优先查询Id参数;<br>*新接口不输出cityCode属性,提前审批全产线支持cityId、countyId入参。<br>*21000000前缀的城市仅能用于机票预订!!!如果用于非机票场景,使用corpTag=0<br>过滤 |

### 3接口契约

| 3.1 获取Ticket |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- |
| 3.1.1 请求契约 |  |  |  |  |  |
| 无 |  |  | 无 |  |  |
| 字段 | 类型 | 描述 | 默认值 | 可为空 | 备注 |
| appKey | String | 接入账号 | 无 | N | 由携程分配给客户公司 |
| appSecurity | String | 接入密码 | 无 | N | 由携程分配给客户公司 |

3.1.2返回契约

| TicketResponse |  | TicketResponse |  |
| --- | --- | --- | --- |
| 字段 | 类型 | 描述 | 备注 |
| Ticket | String | 生成的Ticket | 用于后续接口访问 |
| Status | ResponseStatus | 返回状态 | ⻅下表描述 |

| ResponseStatus |  | ResponseStatus |  |
| --- | --- | --- | --- |
| 字段 | 类型 | 描述 | 备注 |
| Success | Boolean | 是否调用成功 | True:调用成功False:调用失败 |
| Message | String | 推送错误消息 |  |
| ErrorCode | Int | 错误编号 | 正确为0,其他编号为错误 |

| 3.2 获取全量国家数据 |  | 获取全量国家数据 |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- |
| 3.2.1 请求契约 | 请求契约 |  |  |  |  |  |
| SearchRequest |  |  |  | SearchRequest |  |  |
| 字段 | 字段 | 类型 | 描述 | 默认值 | 可为空 | 备注 |
| requestId | requestId | string | 请求唯一标识 |  | Y |  |
| locale |  | string | 使用ISO标准<br>Locale | zh-CN | Y |  |
| auth |  | Authentification | 验证实体 | 无 | N |  |

| Authentification |  |  | Authentification |  |  |
| --- | --- | --- | --- | --- | --- |
| 字段 | 类型 | 描述 | 默认值 | 可为空 | 备注 |
| AppKey | string | 由携程分配 | 无 | N |  |
| Ticket | string | 令牌 | 无 | N |  |

3.2.2返回契约

| FlightSearchResponse |  | FlightSearchResponse |  |
| --- | --- | --- | --- |
| 字段 | 类型 | 描述 | 备注 |
| responseCode | int | 响应码 | 20000 成功 |
| responseDesc | string | 响应描述 |  |
| countryList | List<CountryBaseInfo> | 国家基础信息集合 |  |

| CountryBaseInfo |  | CountryBaseInfo |  |
| --- | --- | --- | --- |
| 字段 | 类型 | 描述 | 备注 |
| countryId | long | 国家ID |  |
| name | string | 国家名(支持多语言) |  |
| enName | string | 国家英文名 |  |
| code | string | 国家码 |  |
| continentId | long | 国家所在洲ID |  |
| continentName | string | 国家所在洲名称 |  |

| 3.3 获取全量标准地理信息数据 | 获取全量标准地理信息数据 |  |  |  |  |
| --- | --- | --- | --- | --- | --- |
| 3.3.1 请求契约 |  |  |  |  |  |
| QueryAllPOIInfoRequestType |  |  | QueryAllPOIInfoRequestType |  |  |
| 字段 | 类型 | 描述 | 默认值 | 可为空 | 备注 |
| auth | Authentification | 验证实体 | 无 | 否 |  |
| countryId | Long | 国家id |  | 否 |  |
| provinceConditions | ProvinceCondition | 查询条件 |  | 是 |  |
| poiConditions | POICondition | 返回条件 |  | 是 |  |
| startDate | String | 查询增量数据的起<br>始日期(闭区间)<br>格式 yyyy-MM-<br>dd |  | 是 | 查询增量数据用;该字段不为空时,<br>provinceConditions和poiConditions查询条件<br>不生效,时间范围为前一天到前15天(若今天<br>日期为2025-09-30,则限制输入的startDate<br>范围是2025-09-15到2025-09-29;查询结<br>果为输入的startDate到到2025-09-29这个时<br>间段内更新的城市数据) |

| ProvinceCondition |  | ProvinceCondition |  |  |  |
| --- | --- | --- | --- | --- | --- |
| 字段 | 类型 | 描述 | 默认值 | 可为空 | 备注 |

| provinceIds | String | 省份id |  | 是 | 多个英文逗号分隔 |
| --- | --- | --- | --- | --- | --- |
| provinceNames | String | 省份名称 |  | 是 | 模糊匹配,多个英文逗号分隔,优先省份id |
| prefectureLevelCityConditions | PrefectureLevelCityCondition | 地级市查询条件 |  | 是 |  |

| PrefectureLevelCityCondition |  |  | PrefectureLevelCityCondition |  |  |
| --- | --- | --- | --- | --- | --- |
| 字段 | 类型 | 描述 | 默认值 | 可为空 | 备注 |
| prefectureLevelCityIds | String | 地级市id |  | 是 | 多个英文逗号分隔 |
| prefectureLevelCityNames | String | 地级市名称 |  | 是 | 模糊匹配,多个英文逗号分隔,优先地级市id |
| returnDistrict | Boolean | 是否返回地级市下属区 | true | 是 | 默认返回 |
| returnCounty | Boolean | 是否返回地级市下属县 | true | 是 | 默认返回 |

| POICondition |  | POICondition |  |  |  |
| --- | --- | --- | --- | --- | --- |
| 字段 | 类型 | 描述 | 默认值 | 可为空 | 备注 |
| returnAirport | Boolean | 是否返回机场信息 | true | 是 | 默认返回,增量查询时,可通过<br>该字段指定是否返回机场变更对<br>应的城市id |
| returnTrainStation | Boolean | 是否返回火⻋站 | true | 是 | 默认返回,仅支持国内火⻋,增<br>量查询时,可通过该字段指定是<br>否返回火⻋站变更对应的城市id |
| returnBusStation | Boolean | 是否返回汽⻋站 | true | 是 | 默认返回,增量查询时,可通过<br>该字段指定是否返回汽⻋站站变<br>更对应的城市id |

3.3.2返回契约

| QueryAllPOIInfoResponseType |  | QueryAllPOIInfoResponseType |  |
| --- | --- | --- | --- |
| 字段 | 类型 | 描述 | 备注 |
| status | ResponseStatus | 返回状态 |  |
| dataList | List<POIData> | 查询结果 |  |
| invalidGeoList | List<InvalidGeoInfo> | 失效地理信息 | 增量查询返回 |
| invalidGeoList | List<InvalidGeoInfo> | 失效地理信息 | 增量查询返回 |

| ResponseStatus |  | ResponseStatus |  |
| --- | --- | --- | --- |
| 字段 | 类型 | 描述 | 备注 |
| success | Boolean | 是否调用成功 | true:调用成功 false:调用失败 |
| errorMessage | String | 错误消息 |  |
| errorCode | Int | 错误编号 | 错误码,详⻅附录一 |

| POIData | POIData |  |  |
| --- | --- | --- | --- |
| 字段 | 类型 | 描述 | 备注 |
| provinceId | Long | 城市所属省份id |  |
| provinceName | String | 城市所属省份中文名称 |  |
| provinceEnName | String | 城市所属省份英文名称 |  |
| prefectureLevelCityInfoList | List<PrefectureLevelCityInfo> | 地级市信息 |  |

| PrefectureLevelCityInfo | PrefectureLevelCityInfo |  |  |
| --- | --- | --- | --- |
| 字段 | 类型 | 描述 | 备注 |
| cityId | Long | 城市id |  |
| cityName | String | 城市中文名称 |  |
| cityEnName | String | 城市英文名称 |  |
| corpTag | Short | 0:标准城市信息,1:非标城市信息(只可预订<br>机票) |  |
| stationInfo | StationInfo | 交通站信息 |  |
| countyList | List<CountyLevelCityPOI> | 县级城市集合 |  |
| districtList | List<DistrictPOIInfo> | 行政区集合 |  |
| districtCode | String | 行政区划代码 |  |
| cityCode | String | 城市code |  |
| cityPinYin | string | 城市pinyin |  |

| CountyLevelCityPOI |  | CountyLevelCityPOI |  |
| --- | --- | --- | --- |
| 字段 | 类型 | 描述 | 备注 |
| countyId | Long | 县级市id |  |
| countyName | String | 县级市中文名称 |  |
| countyEnName | String | 县级市英文名称 |  |
| corpTag | Short | 0:标准城市信息,1:非标城市信息(只可预订机票) |  |
| stationInfo | StationInfo | 交通站信息 |  |
| countyCode | String | 县级市code |  |
| countyPinyin | String | 县级市pinyin |  |
| districtCode | String | 行政区划代码 |  |

| DistrictPOIInfo |  | DistrictPOIInfo |  |
| --- | --- | --- | --- |
| 字段 | 类型 | 描述 | 备注 |
| districtId | Long | 行政区id |  |
| districtName | String | 行政区名称 |  |
| districtEnName | String | 行政区英文名称 |  |
| districtCode | String | 行政区划代码 |  |

| StationInfo | StationInfo |  |  |
| --- | --- | --- | --- |
| 字段 | 类型 | 描述 | 备注 |
| airportList | List<AirportPOIInfo> | 城市机场信息 |  |
| trainStationList | List<TrainStationPOIInfo> | 城市火⻋站信息 |  |
| busStationList | List<BusStationPOIInfo> | 城市汽⻋站信息 |  |

| AirportPOIInfo | AirportPOIInfo |  |  |
| --- | --- | --- | --- |
| 字段 | 类型 | 描述 | 备注 |
| airportCode | String | 机场三字码 |  |
| airportName | String | 机场中文名称 |  |
| airportEnName | String | 机场英文名称 |  |
| airportBuildingList | List<AirportBuildingPOIInfo> | 当前机场所有航站楼 |  |
| airportTypeList | List<String> | 机场类型,为null或者为空: ⺠用机 |  |
|  |  | 场,特殊标识的类型(可能多个类 |  |
|  |  | 型,用英文逗号分隔):1: 通用机场 |  |
|  |  | 2: 无效废弃机场 3: 火⻋站/停机坪 |  |
|  |  | 城市等 4: 军用机场 |  |

| AirportBuildingPOIInfo | AirportBuildingPOIInfo |  |  |
| --- | --- | --- | --- |
| 字段 | 类型 | 描述 | 备注 |
| buildingId | int | 航站楼id |  |
| buildingName | String | 中文名称 |  |
| buildingEnName | String | 英文名称 |  |
| shortName | String | 航站楼中文短名 |  |
| shortNameEN | String | 航站楼英文短名 |  |
| smsName | String | 航站楼标识 |  |

| TrainStationPOIInfo | TrainStationPOIInfo |  |  |
| --- | --- | --- | --- |
| 字段 | 类型 | 描述 | 备注 |
| trainCode | String | 火⻋站三字码 |  |
| trainName | String | 火⻋站中文名称 |  |
| trainEnName | String | 火⻋站英文名称 |  |

| BusStationPOIInfo | BusStationPOIInfo |  |  |
| --- | --- | --- | --- |
| 字段 | 类型 | 描述 | 备注 |
| busName | String | 汽⻋站中文名称 |  |
| busPinYinName | String | 汽⻋站名称拼音 |  |

| InvalidGeoInfo | InvalidGeoInfo |  |  |
| --- | --- | --- | --- |
| 字段 | 类型 | 描述 | 备注 |
| geoId | Long | 地理id |  |
| geoCategoryId | Integer | 地理类别ID | 3:城市/县;<br>目前只返回这个类别 |

### 4接口调用示例

4.1获取Ticket

4.1.1请求POST JSON示例

{

"appKey":"***",

"appSecurity":"***"

}

4.1.2返回JSON示例

{

"Status":{

"Success":true,

"ErrorCode":0,

"Message":"调用成功。"

},

"Ticket":"******"

}

4.2获取全量国家数据

4.2.1请求POST JSON示例

{

"Auth":{

"AppKey":"***",

"Ticket":"***"

},

"requestId":"62f343b94ec6b0e48777b6fa",

"locale":"zh-CN"

}

4.2.2返回JSON示例

{

"responseCode":20000,

"responseDesc":"Success",

"countryList":[

{

"countryId":99,

"name":"匈牙利",

"enName":"Hungary",

"code":"HU",

"continentId":2

},

{

"countryId":198,

"name":"尼加拉瓜",

"enName":"Nicaragua",

"code":"NI",

"continentId":4

},

{

"countryId":297,

"name":"圣巴泰勒米",

"enName":"Saint Barthelemy",

"code":"BL",

"continentId":4

}

]

}

*以上均为部分报文信息

4.3获取全量标准地理信息数据

4.3.1请求POST JSON示例

{

"auth":{

"AppKey":"***",

"Ticket":"***"

},

"countryId":1,

"provinceConditions":{

"provinceIds":"",

"provinceNames":"",

"prefectureLevelCityConditions":{

"prefectureLevelCityIds":"",

"prefectureLevelCityNames":"",

"returnLocation":null,

"returnCounty":null

}

},

"poiConditions":{

"returnAirport":null,

"returnTrainStation":null,

"returnBusStation":null

}

4.3.2返回JSON示例

{

"responseStatus":{

"timestamp":"/Date(1664236198602+0800)/",

"ack":"Success",

"errors":[]

},

"status":{

"success":true,

"errorCode":20000,

"errorMessage":"成功"

},

"dataList":[

{

"provinceId":15,

"provinceName":"江苏",

"provinceEnName":"Jiangsu",

"prefectureLevelCityInfoList":[

{

"cityId":82,

"cityName":"南通",

"cityEnName":"Nantong",

"corpTag":0,

"districtCode":"320600",

"stationInfo":{

"airportList":[

{

"airportCode":"NTG",

"airportName":"兴东国际机场",

"airportEnName":"Xingdong International Airport",

"airportBuildingList":[

{

"buildingId":1119,

"buildingName":"南通兴东国际机场航站楼",

"buildingEnName":"Xingdong International Airport"

},

{

"buildingId":2966,

"buildingName":"南通兴东国际机场新航站楼",

"buildingEnName":"Xingdong International Airport"

}

]

}

],

"trainStationList":[

{

"trainCode":"NUH",

"trainName":"南通",

"trainEnName":"Nantong"

},

{

"trainCode":"NXU",

"trainName":"南通⻄",

"trainEnName":"Nantong West"

}

],

"busStationList":[

{

"busName":"南通东站",

"busPinYinName":"nantongdongzhan"

},

{

"busName":"南通永兴汽⻋站",

"busPinYinName":"nantongyongxingqichezhan"

},

{

"busName":"南通汽⻋客运⻄站",

"busPinYinName":"nantongqichekeyunxizhan"

},

{

"busName":"海⻔正余站",

"busPinYinName":"haimenzhengyuzhan"

},

{

"busName":"海⻔汽⻋站",

"busPinYinName":"haimenqichezhan"

},

{

"busName":"海⻔包场站",

"busPinYinName":"haimenbaochangzhan"

},

{

"busName":"通州三余客运站",

"busPinYinName":"tongzhousanyukeyunzhan"

},

{

"busName":"海⻔大兴站",

"busPinYinName":"haimendaxingzhan"

},

{

"busName":"通州汽⻋站",

"busPinYinName":"tongzhouqichezhan"

},

{

"busName":"海⻔货隆站",

"busPinYinName":"haimenhuolongzhan"

},

{

"busName":"海⻔六甲站",

"busPinYinName":"haimenliujiazhan"

},

{

"busName":"海⻔树勋站",

"busPinYinName":"haimenshuxunzhan"

},

{

"busName":"南通家纺城汽⻋站",

"busPinYinName":"nantongjiafangchengqichezhan"

},

{

"busName":"海⻔叠石桥站",

"busPinYinName":"haimendieshiqiaozhan"

},

{

"busName":"如东⻢塘站",

"busPinYinName":"rudongmatangzhan"

},

{

"busName":"如东汽⻋站",

"busPinYinName":"rudongqichezhan"

},

{

"busName":"海安沙岗站",

"busPinYinName":"haianshagangzhan"

},

{

"busName":"如皋石庄站",

"busPinYinName":"rugaoshizhuangzhan"

},

{

"busName":"海安⻆斜站",

"busPinYinName":"haianjiaoxiezhan"

},

{

"busName":"启东汽⻋站",

"busPinYinName":"qidongqichezhan"

},

{

"busName":"启东城东站",

"busPinYinName":"qidongchengdongzhan"

},

{

"busName":"如东双甸站",

"busPinYinName":"rudongshuangdianzhan"

},

{

"busName":"如东栟茶站",

"busPinYinName":"rudongbenchazhan"

},

{

"busName":"海安南莫站",

"busPinYinName":"haiannanmozhan"

},

{

"busName":"如东丰利站",

"busPinYinName":"rudongfenglizhan"

},

{

"busName":"如东岔河站",

"busPinYinName":"rudongchahezhan"

},

{

"busName":"如皋港站",

"busPinYinName":"rugaogangzhan"

},

{

"busName":"如东兵房站",

"busPinYinName":"rudongbingfangzhan"

},

{

"busName":"苏通园区站",

"busPinYinName":"sutongyuanquzhan"

}

]

},

"countyList":[

{

"countyId":697,

"countyName":"启东",

"countyEnName":"Qidong",

"corpTag":0,

"stationInfo":{

"trainStationList":[

{

"trainCode":"QOU",

"trainName":"启东",

"trainEnName":"Qidong"

}

],

"busStationList":[

{

"busName":"吕四客运站",

"busPinYinName":"lvsikeyunzhan"

},

{

"busName":"启东城⻄站",

"busPinYinName":"qidongchengxizhan"

}

]

}

},

{

"countyId":7557,

"countyName":"如东",

"countyEnName":"Rudong",

"corpTag":0,

"stationInfo":{

"trainStationList":[

{

"trainCode":"FWH",

"trainName":"栟茶",

"trainEnName":"Bencha"

},

{

"trainCode":"RIH",

"trainName":"如东",

"trainEnName":"Rudong"

}

],

"busStationList":[

{

"busName":"如东洋口闸站",

"busPinYinName":"rudongyangkouzhazhan"

}

]

}

},

{

"countyId":4139,

"countyName":"如皋",

"countyEnName":"Rugao",

"corpTag":0,

"stationInfo":{

"trainStationList":[

{

"trainCode":"RBH",

"trainName":"如皋",

"trainEnName":"Rugao"

},

{

"trainCode":"RNU",

"trainName":"如皋南",

"trainEnName":"Rugaonan"

}

],

"busStationList":[

{

"busName":"如皋汽⻋站",

"busPinYinName":"rugaoqichezhan"

},

{

"busName":"如皋⻄来桥站",

"busPinYinName":"rugaoxilaiqiaozhan"

},

{

"busName":"如皋白蒲站",

"busPinYinName":"rugaobaipuzhan"

}

]

}

},

{

"countyId":3923,

"countyName":"海安",

"countyEnName":"Hai'an",

"corpTag":0,

"stationInfo":{

"trainStationList":[

{

"trainCode":"HIH",

"trainName":"海安",

"trainEnName":"Haian"

}

],

"busStationList":[

{

"busName":"海安汽⻋站",

"busPinYinName":"haianqichezhan"

},

{

"busName":"海安曲塘站",

"busPinYinName":"haianqutangzhan"

},

{

"busName":"海安胡集站",

"busPinYinName":"haianhujizhan"

},

{

"busName":"海安李堡站",

"busPinYinName":"haianlibaozhan"

},

{

"busName":"海安白甸站",

"busPinYinName":"haianbaidianzhan"

},

{

"busName":"海安雅周站",

"busPinYinName":"haianyazhouzhan"

}

]

}

],

"districtList":[

{

"districtId":624,

"districtName":"崇川区",

"districtEnName":"Chongchuan District"

},

{

"districtId":696962,

"districtName":"海⻔区",

"districtEnName":"Haimen District"

},

{

"districtId":1261,

"districtName":"通州区",

"districtEnName":"Tongzhou District"

}

]

}

]

}

]

}

*以上均为测试环境mock数据,仅供参考数据格式

### 5附录

5.1附录一

| 错误码 | 错误信息 |
| --- | --- |
| 20000 | 成功 |
| 309 | 无接口访问权限 |
| 19300001 | Request为空 |
| 19301007 | countryId can not be blank |
| 19302001 | 输入省份与国家不匹配 |
| 19302002 | 输入城市与国家不匹配 |
| 19302003 | 输入城市与省份不匹配 |
| 302 | Token校验失败 |

### 6文档版本说明

| 版本 | 编写日期 | 更改内容 |
| --- | --- | --- |
| V1.0 | 2022/09/27 | 初稿 |
| V2.0 | 2022/09/27 | 完善接口内容 |
| V3.0 | 2022/11/3 | 提前审批全产线支持cityId、conntyId入参 |
| V4.0 | 2022/12/30 | PrefectureLevelCityInfo节点新增districtCode字段 |
| V4.1 | 2023/05/10 | 请求增加auth节点 |
| V4.2 | 2023/01/11 | 增加交通站信息StationInfo相关节点描述 |

| V4.3 | 2023/08/14 | 全量查询接口返回报文示例优化 |
| --- | --- | --- |
| V4.4 | 2024/03/19 | AirportBuildingPOIInfo节点新增航站楼中英文短名和标识字段 |
| V4.5 | 2024/09/25 | 新增城市cod,城市拼音,县级code,县级拼音字段 |
| V4.6 | 2025/05/14 | 入参新增startDate字段,返参新增valid字段,支持增量查询 |
| V4.7 | 2025/05/27 | 调整startDate入参备注 |
| V4.8 | 2025/07/02 | 删除valid字段,新增失效城市信息节点<br>InvalidGeoInfo |
| V4.9 | 2025/07/09 | 修改地理类别ID描述 |
| V4.10 | 2025/10/09 | startDate描述优化 |
