# 机票航班查询

更新时间:2026-05-26 13:59:17

## 概述

| 项目 | 内容 |
| --- | --- |
| 接口名 | GetFlights |
| 描述 | 国内机票查询接口 |
| 调用方式 | https + post |
| 参数类型 | JSON |
| 调用地址 | 测试环境:https://gateway.fat.ctripqa.com/switchapi/distribution/flight/getFlights<br>生产环境:https://ct.ctrip.com/distribution/flight/getFlights<br>生产环境(海外):https://openapi.trip.biz/distribution/flight/getFlights |
| ticket说明 | Ticket生成说明 |
| 公共鉴权请求<br>节点 |  |

待废弃(请使用上述方式接入)

| 项目 | 内容 |
| --- | --- |
| 功能描述 | 国内机票查询接口 |
| 接口地址 | 测试:http://openservice.open.uat.ctripqa.com/openservice/serviceproxy.ashx<br>生产:https://sopenservice.ctrip.com/OpenService/ServiceProxy.ashx |
| 请求方式 | POST |
| 请求示例 | 测试:http://openservice.open.uat.ctripqa.com/openservice/serviceproxy.ashx?<br>aid=1&sid=50&icode=b8fe73e5b13a4e85a3130cb5ea36b638&token=fd97eddf285e4b1896df199db6442985c90dca19a8b0e8f7134ae<br>51237102758&uuid=e19959a31765492c92bfa35c5b10e715&e=r6&mode=1&format=json<br>生产:https://sopenservice.ctrip.com/OpenService/ServiceProxy.ashx?<br>aid=***&sid=***&icode=7e51cc0bd5144164844263bbd20363d2&token=37a2614eac9e4edaebf490393cfe743bb5f139a8ab1d8b99cb33<br>6b6d787b6a54&uuid=4e2a47c4db1944ae8d0756d4bb6b206c&e=r6&mode=1&format=json |
| token说明 | Token生成说明 |

## 请求契约

| 名称 | 类型 | 是否必填 | 描述 |
| --- | --- | --- | --- |
| getFlightsRequestType | GetFlightsRequestType | Y | GetFlightsRequestType |
| corpID | String | Y | 公司ID |
| flightWay | String | N | 航程类型。S:单程,D:往返 |
| selectedFlightKeys | List<FlightKeyInfo> | N | 航班key信息列表 |
| key | String | Y | 下游接口组合key,key枚举:getFlights_firstFlight、getSp<br>ecifiedFlight_specifiedFlight、getFltInsurance_flight |
| value | String | Y | 数据组装 |
| routes | List<RouteInfo> | Y | 航线 |
| arriveCityCode | String | Y | 到达城市三字码 |

| 名称 | 类型 | 是否必填 | 描述 |
| --- | --- | --- | --- |
| departCityCode | String | Y | 出发城市三字码 |
| departDate | String | Y | 出发日期 格式:yyyy-MM-dd |
| searchRouteNum | Integer | N | 航程数:1查第一程,2查第二程 |
| transactionID | String | Y | 用来标识事务号,可用于查询在不同应用系统中属于同一<br>事务的所有数据<br>每次请求需唯一 |
| uID | String | Y | 用户ID |
| corpNo | String | N | 公司编号,仅限国央企 |
| locale | String | N | 标准语言格式(如zh-CN,en-US等,默认zh-CN) |
| approvalNo | String | N | (暂未上线)出差申请单号 |
| rcControl | RcControlInfo | N | (暂未上线)管控场景 |
| distributorCheckTravelScene | String | N | (暂未上线)<br>NO_APPROVAL_CONTROL:无审批单号不做管控(若<br>传入approvalNo,则无需传入此字段)<br>FILTER_NO_CONTROL: 执行差标过滤但不做管控 |
| showResultControl | ShowResultControl | N | (暂未上线)展示结果控制 |
| showType | String | N | (暂未上线)<br>GROUP_ONLY_LOWEST:每个航组展示最低价<br>ALL:所有航组价格 |
| singleLoginMode | Boolean | N | (暂未上线)是否单点跳转预定 |

## 响应契约

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| getFlightsResponseType | GetFlightsResponseType | GetFlightsResponseType |
| errorCode | String | 错误码(0或空表示正确) |
| message | String | 消息 |
| searchFlightsResult | List<FlightsResult> | 航班列表 |
| flightList | List<CorpFlightInfo> | 航班信息 |
| flightID | String | 航班ID |
| airline | Airline | 航司 |
| code | String | 航司二字码,[0-9A-Z]{2} |
| name | String | 航司名称 |
| shortName | String | 航司简称 |

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| arriveAirport | AirPort | 到达机场 |
| code | String | 机场三字码 |
| name | String | 机场名称 |
| shortName | String | 机场简称 |
| arriveAirportBuilding | AirportTerminal | 到达航站楼 |
| address | String | 地址 |
| airportCode | String | 所在机场三字码 |
| cityCode | String | 所在城市Code |
| cityID | Integer | 所在城市ID |
| iD | Integer | 航站楼ID |
| name | String | 航站楼名称 |
| shortName | String | 航站楼简称 |
| smsName | String | 短信名称 |
| arriveCity | City | 到达城市 |
| iD | Integer | 城市ID |
| code | String | 城市三字码 |
| name | String | 城市名称 |
| arriveTime | String | 到达时间 yyyy-MM-dd HH:mm:ss |
| craftType | CraftInfo | 机型 |
| code | String | 机型 |
| name | String | 机型名 如 波音737-800 |
| kind | String | 机型种类,值为S 小机型/M 中机型/L 大机型 |
| departAirport | AirPort | 出发机场 |
| code | String | 机场三字码 |
| name | String | 机场名称 |
| shortName | String | 机场简称 |
| departAirportBuilding | AirportTerminal | 出发航站楼 |
| address | String | 地址 |

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| airportCode | String | 所在机场三字码 |
| cityCode | String | 所在城市Code |
| cityID | Integer | 所在城市ID |
| iD | Integer | 航站楼ID |
| name | String | 航站楼名称 |
| shortName | String | 航站楼简称 |
| smsName | String | 短信名称 |
| departCity | City | 出发城市 |
| iD | Integer | 城市ID |
| code | String | 城市三字码 |
| name | String | 城市名称 |
| departTime | String | 出发时间 yyyy-MM-dd HH:mm:ss |
| flightNo | String | 航班号 |
| flightType | List<String> | 航班类型 |
| punctualityRate | Double | 航班准点率 |
| carrierFlight | String | 共享航班号(实际承运航班) |
| stopInfo | List<FlightStopInfo> | 经停信息 |
| stopCity | City | 经停城市 |
| iD | Integer | 城市ID |
| code | String | 城市三字码 |
| name | String | 城市名称 |
| stopInterval | Double | 经停时间 |
| departTime | String | 出发时间 |
| arriveTime | String | 到达时间 |
| tpm | Integer | 里程数 |
| flightTime | Integer | ⻜行时⻓ |
| nextday | Integer | 隔日航班 |
| yClassStandardPrice | BigDecimal | 经济舱全价 |

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| yClassLowPrice | BigDecimal | 经济舱最低价 |
| labelDescList | List<LabelDescType> | 空中快线标签与描述文案 |
| type | String | 枚举类型的type |
| name | String | 标签 |
| desc | String | 描述文案 |
| subClassList | List<CorpSubClassInfo> | 舱等信息 |
| subclassID | Long | 仓等ID |
| agreementInfo | AgreementInfo | 协议信息 |
| code | String | Code |
| customerID | String | 大客户代码 |
| agreementType | String | 前返协议类型 TA:三方协议 BA:二方协议 B2G |
| bfreturn | Boolean | 前返标识: true |
| ulAgreementType | String | 后返协议类型: TA 三方 BA 两方 |
| ulReturn | Boolean | 后返标识: true |
| priceInfo | List<SubClassPriceInfo> | 仓等价格信息 |
| price | BigDecimal | 卖价 |
| standardPrice | BigDecimal | 标准价 |
| rate | BigDecimal | 扣率 |
| oilFee | BigDecimal | 燃油费 |
| tax | BigDecimal | 机建 |
| type | String | 类型(ADU成人 BAB婴儿 CHI儿童) |
| productInfo | List<NormalEntity> | 产品信息 |
| code | String |  |
| name | String |  |
| shortName | String |  |
| desc | String |  |
| refInfo | RefInfo | 退改签信息 |
| list | List<TgqInfo> | 退改签列表 |

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| flag | String | 标示(T不可以、F可以、H有) |
| note | String | 备注 |
| type | String | 退改签类型 |
| passBackInfo | PassBackInfo | 退改签条件 |
| corpRcKey | String | 退改签key |
| backReturnRef | Boolean | 否使用后返退改签 |
| clazzInfo | ClassType | 舱位 |
| clazz | String | 父舱位<br>Y:经济舱<br>C:公务舱<br>F:头等舱 |
| subClass | String | 子舱位 |
| cardTypeList | List<String> | 证件类型列表 |
| hasMeal | Boolean | 是否有餐⻝ |
| minPassengerNum | Integer | 最少成行人数 |
| maxPassengerNum | Integer | 最多成行人数 |
| luggageDetailInfo | LuggageDetailInfo | 行李额详情(待废弃,请使用baggageRegulation.consignment节<br>点) |
| freeLuggageAmount | Integer | 免费携带的行李额度 |
| luggageRemark | String | 行李备注 |
| passengerAgeLimit | String | 特殊运价类的年龄限制<br>示例:18-60(18到20岁)、-60(0到60岁)、20-(20岁以上) |
| provideBillType | String | 提供行程单或发票选项 |
| quantity | Integer | 余票数量,=9时表示余票充足 |
| remarks | String | 备注 |
| specialClass | SpecialClass | 特别舱位信息 |
| name | String | 名称 |
| descList | List<String> | 描述列表 |
| shortName | String | 简称 |
| directFlightChannel | String | 直连航班渠道 |
| directFlightSource | String | 直连航班来源 |

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| payLimitTime | Integer | 支付时限 |
| canAirPlus | Boolean | 是否支持a+支付 |
| baggageRegulation | BaggageRegulation | 格式化-行李额(表格) |
| consignment | Consignment | 托运对象 |
| weight | Integer | 重量(0:无托运;-1:联系航司) |
| size | String | 尺寸 |
| amount | Integer | 件数(99:不限制数量;0:无托运;-1:联系航司) |
| portable | Portable | 手提对象 |
| weight | Integer | 重量(0:无托运;-1:联系航司) |
| size | String | 尺寸 |
| amount | Integer | 件数(99:不限制数量;0:无托运;-1:联系航司) |
| totalWeight | Integer | 总重量 |
| luggageSpcefiedDesc | String | 行李相关的特殊描述信息(如果该字段有值,就在行李额表格下追加一<br>行展示该内容) |
| mileageCredit | Integer | 航班舱位可累计里程(-1代表没有配置里程规则,0表示可累计里程为0,<br>大于0代表可累计里程) |
| passengerAgeLimitExtra | String | 协议年龄限制 |
| ticketDeadline | TicketDeadlineType | 出票时间 |
| referenceTime | String | 参考基准时间的类型,基于预定时间/基于航班起⻜时间,OrderTime:<br>基于预定时间,DepartTime:基于航班起⻜时间 |
| promiseMinutes | Integer | 携程保证出票时间, 单位: 分钟 |
| maleAndFemaleAgeLimitInfo | MaleAndFemaleAgeLimitInfo | 男女年龄限制信息 |
| maleAgeLimit | String | 男性年龄限制<br>示例:18-60(18到20岁)、-60(0到60岁)、20-(20岁以上) |
| femaleAgeLimit | String | 女性年龄限制<br>示例:18-60(18到20岁)、-60(0到60岁)、20-(20岁以上) |
| memberLimited | String | New: 乘机人为新会员可订<br>Old: 乘机人为老会员可订<br>无值则不限制 |
| labelDescList | List<LabelDescType> | 空中快线标签与描述文案 |
| type | String | 枚举类型的type<br>CA_freeRefund_2hours:国航优惠退票<br>Discounted、CorpDiscounted:优惠标签 |

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| name | String | 标签 |
| desc | String | 描述文案 |
| productTypeList | List<String> | 产品类型列表: LimitedCivilServant - 公务员资源 |
| directProduct | Boolean | 是否直连产品 ( true:是 false:否) |
| routeList | List<AirlineCombinationInfo> | 航班组合 |
| flightKeys | List<FlightKeyInfo> | 下游接口返回实体构造数据 |
| key | String | 下游接口组合key:PRODUCT-INDEX (无需处理解析) |
| value | String | 数据组装 |
| segmentProductUnitList | List<SegmentProductUnit> | 航班组合 |
| sequence | Integer | 航段序号 从0开始 |
| flightIDRef | String | 航班索引 |
| subclassIDRef | String | 舱位价格索引 |
| productCombinationTypeList | List<String> | 产品组合类型(freerre,即为联程航班) |
| packageProductList | List<PackageProduct> | 营销产品列表 |
| productType | String | 产品类型,目前支持的取值有:GiftProduct,CashBack,CouponProd<br>uct, FlightXComposition,Hotel,Ancillaries,MemberPrivilege,PriceR<br>eduction,BrandAttribute |
| productRef | Long | 产品索引 |
| marketingProduct | MarketingProduct | 辅营信息 |
| giftList | List<Gift> |  |
| giftServiceList | List<GiftService> | 中转服务(详细⻅附录) |
| serviceID | Long | 服务id |
| serviceName | Long | 服务名 |
| checked | Integer | 是否勾选服务 0:false,1:true |
| productRef | long | 辅营信息对应的产品索引 |
| currency | String | 币种 |
| success | Boolean |  |
| errorCode | Integer |  |
| errorMessage | String |  |

### 示例

请求数据的JSON格式示例

{

"Auth":{

"AppKey":"***",

"Ticket":"580487ff97194e2f64000004"

},

"corpID":"corpAPITest",

"flightWay":"S",

"selectedFlightKeys":[],

"routes":[

{

"arriveCityCode":"XMN",

"departCityCode":"BJS",

"departDate":"2022-02-09"

}

],

"searchRouteNum":1,

"transactionID":"b95e697c-0b33-493a-a7f0-7bf7e9c3db52",

"uID":"_SL2237554779",

"corpNo":null

}

返回数据的JSON格式示例

{

"errorCode":"0",

"message":"成功",

"ResponseStatus":{

"Timestamp":"/Date(1643336653613+0800)/",

"Ack":"Success",

"Errors":[],

"Build":null,

"Version":null,

"Extension":[]

},

"status":null,

"searchFlightsResult":[

{

"flightList":[

{

"flightID":"100433031",

"airline":{

"code":"SC",

"name":"山东航空股份有限公司",

"shortName":"山东航空"

},

"arriveAirport":{

"code":"XMN",

"name":"高崎国际机场",

"shortName":"高崎机场"

}

],

"subClassList":[

{

"subclassID":204589313,

"directProduct":true,

"agreementInfo":{

"code":"",

"customerID":null,

"agreementType":""

},

"priceInfo":[

{

"price":7420,

"standardPrice":8160.0,

"rate":1.00,

"oilFee":20,

"tax":50,

"type":"ADU"

},

{

"price":7420,

"standardPrice":0,

"rate":1.00,

"oilFee":0,

"tax":0,

"type":"BAB"

},

{

"price":7420,

"standardPrice":0,

"rate":1.00,

"oilFee":0,

"tax":0,

"type":"CHI"

}

]

}

],

"routeList":[

{

"flightKeys":[

{

"key":"getFlights_firstFlight",

"value":"

{\"bfReturn\":false,\"departDate\":1644360000000,\"flightNo\":\"CA1154\",\"policyID\":\"10245\",\"priceType\":\"NormalPrice\",\"salePrice\":1570,\"subClass

},

{

"key":"getSpecifiedFlight_specifiedFlight",

"value":"

{\"aCityCode\":\"XMN\",\"agreementType\":\"\",\"airlineCode\":\"CA\",\"bfReturn\":false,\"dCityCode\":\"BJS\",\"departDate\":1644360000000,\"flightNo\":\"

}

]

}

]

}

]

}

## 附录

ICode附录

| 测试环境 | 生产环境 |
| --- | --- |
| b8fe73e5b13a4e85a3130cb5ea36b638 | 7e51cc0bd5144164844263bbd20363d2 |

错误编码信息列表

| 编码 | 描述 | 备注 |
| --- | --- | --- |
| 0 | 成功 |  |
| 20900001 | Request不能为空 |  |
| 20900004 | transactionID不能为空 |  |
| 20900005 | uID与corpID不匹配 |  |
| 20900007 | flightKey错误 |  |
| 20900006 | 调用依赖服务出错 |  |
| 20901001 | 非查询第一程航班时selectedFlightKeys必传 |  |
| 20901002 | routes节点不能为空 |  |
| 20901003 | arriveCityCode不能为空或非法 |  |
| 20901004 | departCityCode不能为空或非法 |  |
| 20901005 | departDate不能为空或非法 |  |
| 20901006 | selectedFlightKeys中的key、value均不能为空或非法 |  |
| 20901007 | searchRouteNum非法 |  |
| 20901008 | SearchRouteNum为1时,selectedFlightKeys必须为空 |  |
| 20901009 | flightWay非法 |  |
| 20901010 | 往返时,routes航线数必须等于2 |  |
| 20901011 | 联程时,routes航线数必须大于1 |  |
| 20901012 | %s非法 | %s:arriveAirportCode、<br>arriveCityCode、<br>departAirportCode、<br>departCityCode |
| 20901013 | 机场三字码非法: %s | %s:提示哪个机场三字码<br>是非法的 |

服务信息-GiftService

| serviceID | serviceName |
| --- | --- |
| 1 | 行李直挂 |
| 21 | 行李代转运 |

### 版本

| 版本号 | 编写日期 | 更改内容 | 作者 |
| --- | --- | --- | --- |

| V1.0 | 2019/11/16 | 初稿 |  |
| --- | --- | --- | --- |
| V1.1 | 2022/01/27 | 增加请求返回报文JSON示例 | ⻩华 |

常⻅问题

1、 问题:“国内机票查询”接口,能否指定只查经济舱?
答复:查询接口目前不支持,需要客户自己进行查询结果过滤。
2、 问题:关于“国内机票查询”接口中,查询返回值中能标识航司直连产品的字段是哪个? directFlightChannel(直连航班渠道) or directFlightSource(直连
航班来源)?具体判断方式是什么?
答复:都不是,是返回结构化信息中的:AirlineCombinationInfo>
FlightKeyInfo>flightKeys>value中的productSource=4是航司直连。如下图:
3、 问题:“国内机票查询”接口下,返回数据: punctualityRate-航班准点率,是否能正常返回数据?下图值 0.0是什么意思?准点率是出发准点率还是到达准点
率?
答复:0.0 是没有到达历史准点率数据,也就是没有准点率信息。准点率是指:到达准点率。
