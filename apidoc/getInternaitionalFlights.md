# 机票列表查询接口

更新时间:2026-07-02 14:32:20

## 概述

该文档用于说明携程商旅(以下简称“携程”)向客户提供机票列表查询服务。该服务采用web api的方式来实现。本文档中包含接口方法说明、签名说明、接口规

范设计、调用方法及示例代码。

| 类型 | 说明 |  |
| --- | --- | --- |
| 调用地址 | 测试环境:https://gateway-fat.ctripqa.com/switchapi/stdflight/searchFlightList<br>生产环境:https://ct.ctrip.com/switchapi/stdflight/searchFlightList<br>生产环境(海外):https://openapi.trip.biz/int/distribution/flight/searchFlightList |  |
| 调用方式 | https + post |  |
| 接口名 | searchFlightList |  |
| 描述 | 根据查询条件获取机票列表信息 |  |
| 参数类型 | JSON |  |
| 查询功能 | 根据选中航班productId查询机票列表信息 |  |
| Ticket说明 | Ticket生成说明 |  |

## 请求契约

| 名称 | 类型 | 是否必填 | 描述 |
| --- | --- | --- | --- |
| searchFlightListRequestType | SearchFlightListRequestType | Y | SearchFlightListRequestType |
| requestHead | RequestHead | N | 请求头 |
| corpID | String | N | 公司ID |
| uID | String | N | 携程卡号 |
| language | String | N | 语言版本,中文简体:zh-CN;英文:en-US;繁体中文:<br>zh-HK;日语:ja-JP;不传默认zh-CN(严格区分大小<br>写) |
| requestID | String | N | 请求唯一标识,建议传UUID |
| flightInfo | RequestFlightInfo | N | 航班查询条件 |
| tripType | Integer | N | 0:单程,1:往返,2:多程(必填) |
| cabinClass | String | N | Economy:经济舱,Premium:超级经济舱,Busines<br>s:公务舱,First:头等舱,Economy_Premium:经济<br>+超级经济,First_Business:公务+头等(必填) |
| routeInfoList | List<RouteInfo> | N | 航路信息 |
| departureCityCode | String | N | 出发城市三字码 (必填) |
| arrivalCityCode | String | N | 到达城市三字码 (必填) |
| departureDate | String | N | 出发日期,格式:yyyy-MM-dd (必填) |
| routeSearchControl | RouteSearchControl | N | 基于航路的分段/反查控制 |

| 名称 | 类型 | 是否必填 | 描述 |
| --- | --- | --- | --- |
| itineraryID | Integer | Y | 航程号,去程1,返程2,多程按实际程数传值,最<br>大支持6程(必填) |
| productID | String | N | productID |
| auth | Authentification | Y | 身份验证信息 |
| appKey | String | Y | 接入账号,由携程分配给客户公司 |
| ticket | String | Y | 由ticket接口生成 |
| passengerRequestList | List<PassengerRequestType> | N | 乘客信息列表,空默认一个成人 |
| passengerType | String | Y | 乘客类型,(必填)<br>Adult:成人<br>Child:儿童 |
| passengerCount | Integer | Y | 乘客数量,必须大于0小于等于9 (必填) |
| searchControl | searchControl | N | 分批查询控制 |
| searchResult | String | Y | BATCH 查询部分数据;FULL 查询全量数据 |
| sceneFlag | String | N | 查询场景:DATA_PULLING(数据拉取) |

## 响应契约

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| searchFlightListResponseType | SearchFlightListResponseType | SearchFlightListResponseType |
| status | ResponseStatus |  |
| success | Boolean | 调用接口是否成功 |
| errorCode | Integer | 错误编码 |
| message | String | 错误信息 |
| flightRouteList | List<FlightRoute> | 航路列表 |
| flightList | List<FlightInfo> | 航班组合(多程多段) |
| flightID | String | 航班信息ID |
| itineraryID | Integer | 航程号,去程1,返程2 |
| sectorID | Integer | 航段号 |
| flightNO | String | 票面航班号 |
| marketingCarrierCode | String | 票面航空公司 |
| operatingCarrierCode | String | 承运航空公司 |
| operatingFlightNO | String | 承运航班号 |

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| cabinClass | String | 舱等 |
| seatClass | String | 舱位 |
| departureCityCode | String | 出发城市 |
| departureCityName | String | 出发城市名 |
| arrivalCityCode | String | 到达城市 |
| arrivalCityName | String | 到达城市名 |
| departureAirportCode | String | 出发机场 |
| arrivalAirportCode | String | 到达机场 |
| departureTerminal | String | 出发机场航站楼 |
| arrivalTerminal | String | 到达机场航站楼 |
| departureTime | String | 出发时间,格式:yyyy-MM-dd HH:mm:ss |
| arrivalTime | String | 到达时间,格式:yyyy-MM-dd HH:mm:ss |
| departureTimeUTC | String | 出发时间,带时区,格式:2022-06-06T12:56:34Z |
| arrivalTimeUTC | String | 到达时间,带时区,格式:2022-06-06T12:56:34Z |
| aircraftCode | String | 机型代码 |
| aircraftKind | String | ⻜机大小分类 |
| aircraftName | String | 机型名称 |
| stopoverList | List<Stopover> | 经停信息 |
| airport | String | 经停机场 |
| duration | Integer | 经停时⻓ |
| arrivalDateTime | String | 经停到达时间,格式:yyyy-MM-dd HH:mm:ss |
| duration | Integer | ⻜行时⻓ |
| arrivalDays | Integer | 到达天数 |
| puIndex | Integer | 票张序号,从0开始 |
| carbonEmissions | Integer | 碳排放量 单位:g/人 |
| midCarbonEmissions | Integer | 碳排中位数 单位:g/人 |
| operatingSupplier | OperatingSupplierType | 非标准实际承运(如果原共享航班字段也下发信息,要优先取原字<br>段operatingCarrierCode和operatingFlightNo) |
| name | String | 非标准实际承运对客展示文案 |

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| nameID | String | 非标准实际承运航司对客展示文案id |
| seatCount | Integer | 舱位剩余数量,数量小于9表示舱位紧张 |
| virtualFlightType | int | 虚拟航班类型: 0=⻜机 1=火⻋ 2=汽⻋ 3=水上⻜机(机+船) |
| ticketDetailList | List<TicketDetail> | 票价详情列表(多乘客类型) |
| passengerType | String | 乘客类型 Adult:成人 Child:儿童 |
| passengerEligibility | String | 乘客资质 ADT:普通成人 CHD:儿童 |
| priceDetail | PriceDetail | 人⺠币价格信息 |
| currency | String | 币种 |
| exchange | BigDecimal | 汇率 |
| salePrice | BigDecimal | 卖价 |
| tax | BigDecimal | 税费 |
| basicServiceFee | BigDecimal | 基础服务费 |
| refundServiceFee | BigDecimal | 退票服务费 |
| revalidationServiceFee | BigDecimal | 改签服务费 |
| frontOfflineRefundServiceFee | BigDecimal | 前收offline退票服务费 |
| frontOfflineRebookServiceFee | BigDecimal | 前收offline改签服务费 |
| settlementPriceDetail | PriceDetail | 结算币种价格信息 |
| currency | String | 币种 |
| exchange | BigDecimal | 汇率 |
| salePrice | BigDecimal | 卖价 |
| tax | BigDecimal | 税费 |
| basicServiceFee | BigDecimal | 基础服务费 |
| refundServiceFee | BigDecimal | 退票服务费 |
| revalidationServiceFee | BigDecimal | 改签服务费 |
| frontOfflineRefundServiceFee | BigDecimal | 前收offline退票服务费 |
| frontOfflineRebookServiceFee | BigDecimal | 前收offline改签服务费 |
| passengerRestriction | PassengerRestriction | 乘客限制 |
| minPassengerCount | Integer | 最小乘机人数 |

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| maxPassengerCount | Integer | 最大乘机人数 |
| nationalityInclude | String | 允许国籍 |
| nationalityExclude | String | 不允许国籍 |
| minAgeLimitation | Integer | 最小年龄限制 |
| maxAgeLimitation | Integer | 最大年龄限制 |
| agreementAgeLimitation | String | 协议年龄限制,例如 16-70 16- |
| ticketingTimeLimit | TicketingTimeLimit | 出票时限 |
| timeLimitType | Integer | 出票保护时限类型,1的时候是【支付成功后...出票】,非1的时候是<br>【最晚在起⻜前...出票】 |
| limitTime | Integer | 出票保护时限,单位分钟 |
| agencyInfo | AgencyInfo | 票台信息 |
| agencyCode | String | 票台代码 |
| agencyName | String | 供应商名称 |
| agreementType | String | 协议类型<br>NA-无<br>TripartiteAgreement-三方协议<br>AirlineAgreement-航司协议(两方)<br>Published-公布运价<br>Private-私有运价 |
| instructionType | String | 后返协议类型<br>NA-无<br>TripartiteAgreement-三方协议<br>AirlineAgreement-航司协议(两方)<br>Published-公布运价<br>Private-私有运价 |
| inforcedCheckin | Boolean | 强绑值机标识 |
| ticketDetail | TicketDetail | 票价详情(第一个票价信息,默认成人)【待废弃,后续请使用tick<br>etDetailList】 |
| passengerType | String | 乘客类型 Adult:成人 Child:儿童 |
| passengerEligibility | String | 乘客资质 ADT:普通成人 CHD:儿童 |
| priceDetail | PriceDetail | 人⺠币价格信息 |
| currency | String | 币种 |
| exchange | BigDecimal | 汇率 |
| salePrice | BigDecimal | 卖价 |
| tax | BigDecimal | 税费 |
| basicServiceFee | BigDecimal | 基础服务费 |

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| refundServiceFee | BigDecimal | 退票服务费 |
| revalidationServiceFee | BigDecimal | 改签服务费 |
| frontOfflineRefundServiceFee | BigDecimal | 前收offline退票服务费 |
| frontOfflineRebookServiceFee | BigDecimal | 前收offline改签服务费 |
| settlementPriceDetail | PriceDetail | 结算币种价格信息 |
| currency | String | 币种 |
| exchange | BigDecimal | 汇率 |
| salePrice | BigDecimal | 卖价 |
| tax | BigDecimal | 税费 |
| basicServiceFee | BigDecimal | 基础服务费 |
| refundServiceFee | BigDecimal | 退票服务费 |
| revalidationServiceFee | BigDecimal | 改签服务费 |
| frontOfflineRefundServiceFee | BigDecimal | 前收offline退票服务费 |
| frontOfflineRebookServiceFee | BigDecimal | 前收offline改签服务费 |
| passengerRestriction | PassengerRestriction | 乘客限制 |
| minPassengerCount | Integer | 最小乘机人数 |
| maxPassengerCount | Integer | 最大乘机人数 |
| nationalityInclude | String | 允许国籍 |
| nationalityExclude | String | 不允许国籍 |
| minAgeLimitation | Integer | 最小年龄限制 |
| maxAgeLimitation | Integer | 最大年龄限制 |
| agreementAgeLimitation | String | 协议年龄限制,例如 16-70 16- |
| ticketingTimeLimit | TicketingTimeLimit | 出票时限 |
| timeLimitType | Integer | 出票保护时限类型,0:订单生成出票单后,1:航班起⻜时间前 |
| limitTime | Integer | 出票保护时限,单位分钟 |
| agencyInfo | AgencyInfo | 票台信息 |
| agencyCode | String | 票台代码 |
| agencyName | String | 供应商名称 |

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| agreementType | String | 协议类型<br>NA-无<br>TripartiteAgreement-三方协议<br>AirlineAgreement-航司协议(两方)<br>Published-公布运价<br>Private-私有运价 |
| instructionType | String | 后返协议类型<br>NA-无<br>TripartiteAgreement-三方协议<br>AirlineAgreement-航司协议(两方)<br>Published-公布运价<br>Private-私有运价 |
| inforcedCheckin | Boolean | 强绑值机标识 |
| fareBasisList | List<string> | 运价基础代码 fareBasis 列表 |
| baggageRefList | List<BaggageRef> | 当前航班组合的特定行李额 |
| itineraryID | Integer | 航程号,去程1,返程2 |
| passengerType | String | 乘客类型 Adult:成人 Child:儿童 |
| baggageList | List<BaggageInfo> | 新节点行李额信息 |
| baggageID | String | 行李额索引ID |
| baggageSize | BaggageSize | 行李额尺寸大小和限制 |
| size | String | 尺寸大小,格式:180CM 或者 10*12*14 |
| sizeLimitType | Integer | 尺寸限制类型。1:三边之和;2:⻓*宽*高 |
| type | Integer | type=0表示托运,type=1表示手提,type=2表示打包,type=3表<br>示加购,type=4表示随身 |
| hasMorePrice | Boolean | 是否存在更多价格 |
| productID | String | productID |
| productFlag | String | 产品标签:1.协议 2.尊享 3优选 4直联 5套餐 |
| labelIdList | List<Long> | 标签id列表 |
| nonCredentials | Integer | 是否可以无证件,0:不可以(默认),1:可以 |
| noIdentityCard | NoIdentityCardType | 无证件信息 |
| noIdentityCardInd | Integer | 无证件标识 0:不支持无证件 1:支持无证件 |
| nationInclude | List<String> | 无证件国籍白名单 |
| nationExclude | List<String> | 无证件国籍黑名单 |
| multiTicketDetailList | List<MultiTicketDetail> | 票价详情列表(兼容多票) |
| puIndex | Integer | 票张序号,从0开始 |

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| ticketDetailList | List<TicketDetail> | 票价详情列表 |
| passengerType | String | 乘客类型 Adult:成人 Child:儿童 |
| passengerEligibility | String | 乘客资质 ADT:普通成人 CHD:儿童 |
| priceDetail | PriceDetail | 人⺠币价格信息 |
| currency | String | 币种 |
| exchange | BigDecimal | 汇率 |
| salePrice | BigDecimal | 卖价 |
| tax | BigDecimal | 税费 |
| basicServiceFee | BigDecimal | 基础服务费 |
| refundServiceFee | BigDecimal | 退票服务费 |
| revalidationServiceFee | BigDecimal | 改签服务费 |
| frontOfflineRefundServiceFe<br>e | BigDecimal | 前收offline退票服务费 |
| frontOfflineRebookServiceFe<br>e | BigDecimal | 前收offline改签服务费 |
| settlementPriceDetail | PriceDetail | 结算币种价格信息 |
| currency | String | 币种 |
| exchange | BigDecimal | 汇率 |
| salePrice | BigDecimal | 卖价 |
| tax | BigDecimal | 税费 |
| basicServiceFee | BigDecimal | 基础服务费 |
| refundServiceFee | BigDecimal | 退票服务费 |
| revalidationServiceFee | BigDecimal | 改签服务费 |
| frontOfflineRefundServiceFe<br>e | BigDecimal | 前收offline退票服务费 |
| frontOfflineRebookServiceFe<br>e | BigDecimal | 前收offline改签服务费 |
| passengerRestriction | PassengerRestriction | 乘客限制 |
| minPassengerCount | Integer | 最小乘机人数 |
| maxPassengerCount | Integer | 最大乘机人数 |
| nationalityInclude | String | 允许国籍 |

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| nationalityExclude | String | 不允许国籍 |
| minAgeLimitation | Integer | 最小年龄限制 |
| maxAgeLimitation | Integer | 最大年龄限制 |
| agreementAgeLimitation | String | 协议年龄限制,例如 16-70 |
| ticketingTimeLimit | TicketingTimeLimit | 出票时限 |
| timeLimitType | Integer | 出票保护时限类型,1的时候是【支付成功后...出票】,非1的时候是<br>【最晚在起⻜前...出票】 |
| limitTime | Integer | 出票保护时限,单位分钟 |
| agencyInfo | AgencyInfo | 票台信息 |
| agencyCode | String | 票台代码 |
| agencyName | String | 供应商名称 |
| agreementType | String | 协议类型<br>NA-无<br>TripartiteAgreement-三方协议<br>AirlineAgreement-航司协议(两方)<br>Published-公布运价<br>Private-私有运价 |
| instructionType | String | 后返协议类型<br>NA-无<br>TripartiteAgreement-三方协议<br>AirlineAgreement-航司协议(两方)<br>Published-公布运价<br>Private-私有运价 |
| inforcedCheckin | Boolean | 强绑值机标识 |
| fareBasisList | List<string> | 运价基础代码 fareBasis 列表 |
| extLabelList | List<ExtLabelType> | 扩展标签 |
| id | Long | 标签模版id,和labelList关联 |
| labelParam | List<labelParam> | 标签参数 |
| index | Integer | 占位符索引 |
| type | String | 占位符对应的业务含义 |
| value | String | 占位符中替换的值 |
| interChangeList | List<InterChangeType> | 机+船换乘提示索引;textRemarkRef 关联 baseData.textRemarkL<br>ist.remarkID 获取换乘文案 |
| segmentNo | int | 行程序号 |
| sequenceNo | int | 航段序号 |
| position | int | 中转点/航段位置序号 |

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| textRemarkRef | string | 换乘提示文本索引,关联 textRemarkList.remarkID |
| checkInRemarkRef | string | 值机提示文本索引,关联 textRemarkList.remarkID |
| baseData | SearchFlightsBaseData | 基础数据 |
| airlineList | List<AirlineInfo> | 航空公司列表 |
| airlineCode | String | 航空公司Code |
| airlineName | String | 航空公司中文名 |
| airlineNameEN | String | 航空公司英文名 |
| shortName | String | 简短名称 |
| allianceInfo | AllianceInfo | 航空公司联盟 |
| allianceName | String | 中文名称 |
| allianceNameEN | String | 英文名称 |
| airportList | List<AirportInfo> | 机场列表 |
| airportCode | String | 机场三字码 |
| airportName | String | 机场中文名 |
| airportNameEN | String | 机场英文名 |
| baggageList | List<Baggage> | 行李列表 |
| baggageID | String | 行李额索引ID |
| baggageCN | String |  |
| baggageEN | String |  |
| baggageDetailList | List<BaggageDetail> | 行李额详细数据 |
| amount | Integer | 数量 |
| unit | String | 数量单位 |
| type | String | 单位标识,Piece、Weight、TotalWeight |
| extentionFileds | BaggageExtensionFields | 行李额扩展字段 |
| containFreeBaggage | Boolean | 是否包含免费行李额 |
| textRemarkList | List<TextRemark> | 文本描述信息(行李额/退改签/备注)表,以TextRemarkID为主键 |
| remarkID | String |  |
| textCN | String |  |

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| textEN | String |  |
| labelList | List<LabelType> | 标签列表,航班、运价等标签集合,通过id索引 |
| id | Long | 标签id |
| type | String | 标签类型,AGREEMENT代表协议价,Discounted代表优惠标签 |
| name | String | 标签名称 |
| description | String | 标签描述 |
| terms | String | 标签条款 |
| agencyList | List<AgencyInfo> | 票台信息 |
| agencyCode | String | 票台代码 |
| agencyName | String | 供应商名称 |
| agencyID | Integer |  |
| cityID | Integer |  |
| cityCode | String |  |
| cityList | List<CityInfo> | 城市列表 |
| cityID | Integer |  |
| cityCode | String |  |
| cityName | String |  |
| cityNameEN | String |  |
| provinceID | Integer |  |
| countryID | Integer |  |
| domestic | Boolean |  |
| continentID | Integer |  |
| countryList | List<CountryInfo> | 国家列表 |
| countryID | Integer |  |
| countryCode | String |  |
| countryName | String |  |
| countryNameEN | String |  |

### 示例

| POST JSON示例 |  |
| --- | --- |
| {<br>"requestHead": {<br>"corpID": "****", | {<br>"****", |

| "uID": "****",<br>"language": "zh-CN",<br>"requestID": "requestID"<br>},<br>"flightInfo": {<br>"tripType": 0,<br>"cabinClass": "Economy"<br>},<br>"routeInfoList": [<br>{<br>"departureCityCode": "SHA",<br>"arrivalCityCode": "HKG",<br>"departureDate": "****"<br>}<br>]<br>}} | "****",<br>"zh-CN",<br>"requestID"<br>{<br>0,<br>"Economy"<br>[<br>"departureCityCode":"SHA",<br>"arrivalCityCode":"HKG",<br>"departureDate":"****" |
| --- | --- |
| 返回JSON示例 |  |
| {<br>"status": {<br>"success": true,<br>"errorCode": 0,<br>"message": "success"<br>},<br>"flightRouteList": [<br>{<br>"flightList": [<br>{<br>"flightID": "1",<br>"itineraryID": 1,<br>"sectorID": 1,<br>"flightNO": "****",<br>"marketingCarrierCode": "****",<br>"operatingCarrierCode": null,<br>"operatingFlightNO": "",<br>"cabinClass": "Economy",<br>"seatClass": "P",<br>"departureCityCode": "SHA",<br>"departureCityName": "上海",<br>"arrivalCityCode": "BJS",<br>"arrivalCityName": "北京",<br>"departureAirportCode": "SHA",<br>"arrivalAirportCode": "PEK",<br>"departureTerminal": "****",<br>"arrivalTerminal": "****",<br>"departureTime": "2023-01-15 11:30:00",<br>"arrivalTime": "2023-01-15 13:55:00",<br>"departureTimeUTC": "2023-01-15T03:30:00Z",<br>"arrivalTimeUTC": "2023-01-15T05:55:00Z",<br>"aircraftCode": "***",<br>"aircraftKind": "L",<br>"aircraftName": "波音 777-300",<br>"stopoverList": [],<br>"duration": 145,<br>"arrivalDays": 0,<br>"puIndex": 0<br>}<br>],<br>"ticketDetail": {<br>"priceDetail": {<br>"currency": "CNY",<br>"exchange": 1,<br>"salePrice": 1030,<br>"tax": 365,<br>"basicServiceFee": 0,<br>"refundServiceFee": 0,<br>"revalidationServiceFee": 0<br>},<br>"settlementPriceDetail": {<br>"currency": "CNY",<br>"exchange": 1.0,<br>"salePrice": 1030,<br>"tax": 365,<br>"basicServiceFee": 0,<br>"refundServiceFee": 0,<br>"revalidationServiceFee": 0<br>},<br>"passengerRestriction": {<br>"minPassengerCount": 1,<br>"maxPassengerCount": 9,<br>"nationalityInclude": "",<br>"nationalityExclude": "",<br>"minAgeLimitation": 0,<br>"maxAgeLimitation": 0,<br>"agreementAgeLimitation": null<br>},<br>"ticketingTimeLimit": {<br>"timeLimitType": 1,<br>"limitTime": 45<br>},<br>"agencyInfo": {<br>"agencyCode": "****",<br>"agencyName": "上海携程宏睿国际旅行社有限公司"<br>}<br>},<br>"baggageRefList": [<br>{<br>"itineraryID": 1, | {<br>"success":true,<br>"errorCode":0,<br>"message":"success"<br>"flightRouteList":[<br>"flightList":[<br>{<br>"flightID":"1",<br>"itineraryID":1,<br>"sectorID":1,<br>"flightNO":"****",<br>"marketingCarrierCode":"****",<br>"operatingCarrierCode":null,<br>"operatingFlightNO":"",<br>"cabinClass":"Economy",<br>"seatClass":"P",<br>"departureCityCode":"SHA",<br>"departureCityName":"上海",<br>"arrivalCityCode":"BJS",<br>"arrivalCityName":"北京",<br>"departureAirportCode":"SHA",<br>"arrivalAirportCode":"PEK",<br>"departureTerminal":"****",<br>"arrivalTerminal":"****",<br>"departureTime":"2023-01-15 11:30:00",<br>"arrivalTime":"2023-01-15 13:55:00",<br>"departureTimeUTC":"2023-01-15T03:30:00Z",<br>"arrivalTimeUTC":"2023-01-15T05:55:00Z",<br>"aircraftCode":"***",<br>"aircraftKind":"L",<br>"aircraftName":"波音777-300",<br>"stopoverList":[],<br>"duration":145,<br>"arrivalDays":0,<br>"puIndex":0<br>}<br>],<br>"ticketDetail":{<br>"priceDetail":{<br>"currency":"CNY",<br>"exchange":1,<br>"salePrice":1030,<br>"tax":365,<br>"basicServiceFee":0,<br>"refundServiceFee":0,<br>"revalidationServiceFee":0<br>},<br>"settlementPriceDetail":{<br>"currency":"CNY",<br>"exchange":1.0,<br>"salePrice":1030,<br>"tax":365,<br>"basicServiceFee":0,<br>"refundServiceFee":0,<br>"revalidationServiceFee":0<br>},<br>"passengerRestriction":{<br>"minPassengerCount":1,<br>"maxPassengerCount":9,<br>"nationalityInclude":"",<br>"nationalityExclude":"",<br>"minAgeLimitation":0,<br>"maxAgeLimitation":0,<br>"agreementAgeLimitation":null<br>},<br>"ticketingTimeLimit":{<br>"timeLimitType":1,<br>"limitTime":45<br>},<br>"agencyInfo":{<br>"agencyCode":"****",<br>"agencyName":"上海携程宏睿国际旅行社有限公司"<br>}<br>},<br>"baggageRefList":[<br>{<br>"itineraryID":1, |

"baggageList":[

{

"baggageID":"1",

"baggageSize":null,

"type":0

}

]

}

],

"hasMorePrice":true,

"productID":"****",

"productFlag":null

}

]

}

## 附录

提示信息列表

| Error Code | Error Message | Success |  |
| --- | --- | --- | --- |
| 0 | success | true |  |
| 20900001 | param is blank | false |  |
| 20900002 | param is invalid | false |  |

### 版本

| 版本号 | 编写日期 | 更改内容 | 作者 |
| --- | --- | --- | --- |
| V1.1 | 2024/01/25 | 新增:前收offline退票服务<br>费,前收offline改签服务费 | 钟炳汶 |
| V1.2 | 2024/02/07 | 更新乘客国籍年龄限制描述 | 钟炳汶 |
| V1.3 | 2024/02/22 | 新增碳排放字段输出 | 钟炳汶 |
| V1.4 | 2024/08/28 | 新增支持儿童票,添加相关<br>字段 | 钟炳汶 |
