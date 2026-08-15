# 机票更多查询接口

更新时间:2026-07-01 13:51:22

## 概述

该文档用于说明携程商旅(以下简称“携程”)向客户提供机票更多查询服务。该服务采用web api的方式来实现。本文档中包含接口方法说明、签名说明、接口规
范设计、调用方法及示例代码。

| 调用地址 | 测试环境:https://gateway-fat.ctripqa.com/switchapi/stdflight/searchMore<br>生产环境:https://ct.ctrip.com/switchapi/stdflight/searchMore<br>生产环境(海外):https://openapi.trip.biz/int/distribution/flight/searchMore |  |
| --- | --- | --- |
| 调用方式 | https + post |  |
| 接口名 | searchMore |  |
| 描述 | 根据查询条件获取机票更多信息 |  |
| 参数类型 | JSON |  |
| 查询功能 | 根据选中航班productId查询机票更多信息 |  |
| Ticket说明 | Ticket生成说明 |  |

## 请求契约

| 名称 | 类型 | 是否必填 | 描述 |
| --- | --- | --- | --- |
| searchMoreRequestType | SearchMoreRequestType | Y | SearchMoreRequestType |
| requestHead | RequestHead | N | 请求头 |
| corpID | String | N | 公司ID |
| uID | String | N | 携程卡号 |
| language | String | N | 语言版本,中文简体:zh-CN;英文:en-US;繁体中文:zh-H<br>K;日语:ja-JP;不传默认zh-CN(严格区分大小写) |
| requestID | String | N | 请求唯一标识,建议传UUID |
| routeSearchControl | MoreRouteSearchControl | N | 基于航路的分段/反查控制 |
| productID | String | N | productID |
| auth | Authentification | Y | 身份验证信息 |
| appKey | String | Y | 接入账号,由携程分配给客户公司 |
| ticket | String | Y | 由ticket接口生成 |

## 响应契约

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| searchMoreResponseType | SearchMoreResponseType | SearchMoreResponseType |
| status | ResponseStatus |  |
| success | Boolean | 调用接口是否成功 |

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| errorCode | Integer | 错误编码 |
| message | String | 错误信息 |
| cabinClassList | List<CabinClass> | 舱等舱位列表 |
| itineraryIDs | String | 航程号 |
| sectorIDs | String | 航段号 |
| cabinClass | String | 舱等 |
| seatClass | String | 舱位 |
| seatCount | Integer | 舱位剩余数量,数量小于9表示舱位紧张 |
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

| 名称 | 类型 | 描述 |
| --- | --- | --- |
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
| timeLimitType | Integer | 出票保护时限类型:1的时候是【支付成功后...出票】,非1的时候是<br>【最晚在起⻜前...出票】 |
| limitTime | Integer | 出票保护时限,单位分钟 |
| agencyInfo | AgencyInfo | 票台信息 |
| agencyCode | String | 票台代码 |
| agencyName | String | 供应商名称 |
| agreementType | String | 协议类型<br>NA-无<br>TripartiteAgreement-三方协议<br>AirlineAgreement-航司协议(两方)<br>Published-公布运价<br>Private-私有运价 |
| instructionType | String | 后返协议类型<br>NA-无<br>TripartiteAgreement-三方协议<br>AirlineAgreement-航司协议(两方)<br>Published-公布运价<br>Private-私有运价 |
| fareBasisList | List<string> | 运价基础代码 fareBasis 列表 |
| ticketDetail | TicketDetail | 票价详情(第一个票价信息,默认成人)【待废弃,后续请使用ticket<br>DetailList】 |
| passengerType | String | 乘客类型 Adult:成人 Child:儿童 |
| passengerEligibility | String | 乘客资质 ADT:普通成人 CHD:儿童 |
| priceDetail | PriceDetail | 人⺠币价格信息 |

| 名称 | 类型 | 描述 |
| --- | --- | --- |
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
| maxPassengerCount | Integer | 最大乘机人数 |
| nationalityInclude | String | 允许国籍 |
| nationalityExclude | String | 不允许国籍 |
| minAgeLimitation | Integer | 最小年龄限制 |
| maxAgeLimitation | Integer | 最大年龄限制 |
| agreementAgeLimitation | String | 协议年龄限制,例如 16-70 16- |
| ticketingTimeLimit | TicketingTimeLimit | 出票时限 |

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| timeLimitType | Integer | 出票保护时限类型,0:订单生成出票单后,1:航班起⻜时间前 |
| limitTime | Integer | 出票保护时限,单位分钟 |
| agencyInfo | AgencyInfo | 票台信息 |
| agencyCode | String | 票台代码 |
| agencyName | String | 供应商名称 |
| agreementType | String | 协议类型<br>NA-无<br>TripartiteAgreement-三方协议<br>AirlineAgreement-航司协议(两方)<br>Published-公布运价<br>Private-私有运价 |
| instructionType | String | 后返协议类型<br>NA-无<br>TripartiteAgreement-三方协议<br>AirlineAgreement-航司协议(两方)<br>Published-公布运价<br>Private-私有运价 |
| fareBasisList | List<string> | 运价基础代码 fareBasis 列表 |
| baggageRefList | List<BaggageRef> | 当前航班组合的特定行李额 |
| itineraryID | Integer | 航程号,去程1,返程2 |
| passengerType | String | 乘客类型 Adult:成人 Child:儿童 |
| baggageList | List<BaggageInfo> | 新节点行李额信息 |
| baggageID | String | 行李额索引ID |
| baggageSize | BaggageSize | 行李额尺寸大小和限制 |
| size | String | 尺寸大小,格式:180CM 或者 10*12*14 |
| sizeLimitType | Integer | 尺寸限制类型。1:三边之和;2:⻓*宽*高 |
| type | Integer | type=0表示托运,type=1表示手提,type=2表示打包,type=3表示<br>加购,type=4表示随身 |
| productID | String | productID |
| productFlag | String | 产品标签:1.协议 2.尊享 4直联 |
| carbonEmissionsList | List<Integer> | 碳排放量(按航段号顺序输出,空默认输出0) 单位:g/人 |
| midCarbonEmissionsList | List<Integer> | 碳排中位数(按航段号顺序输出,空默认输出0) 单位:g/人 |
| extendFieldList | List<TagEntity> | key:CaaJointFlightFlag,Value=1,则为联程航班。 |
| key | String |  |
| value | String |  |

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| brandRefList | List<BrandAttributeRefType> | 权益引用集合 |
| brandRefNum | Integer | 权益下标 |
| labelIdList | List<Long> | 标签id列表 |
| puIndexs | String | 票张序号 |
| brandRefNums | String | 权益ref |
| extLabelList | List<ExtLabelType> | 扩展标签 |
| id | Long | 标签模版id,和labelList关联 |
| labelParam | String | 标签参数 |
| index | Integer | 占位符索引 |
| type | String | 占位符对应的业务含义 |
| value | String | 占位符中替换的值 |
| interChangeList | List<InterChangeType> | 机+船换乘提示索引;textRemarkRef 关联 baseData.textRemarkLis<br>t.remarkID 获取换乘文案 |
| segmentNo | int | 行程序号 |
| sequenceNo | int | 航段序号 |
| position | int | 中转点/航段位置序号 |
| textRemarkRef | string | 换乘提示文本索引,关联 textRemarkList.remarkID |
| checkInRemarkRef | string | 值机提示文本索引,关联 textRemarkList.remarkID |
| baseData | SearchMoreBaseData | 基础数据 |
| baggageList | List<Baggage> | 行李列表 |
| baggageID | String | 行李额索引ID |
| baggageCN | String |  |
| baggageEN | String |  |
| baggageDetailList | List<BaggageDetail> | 行李额详细数据 |
| amount | Integer | 数量 |
| unit | String | 数量单位 |
| type | String | 单位标识 |
| extentionFileds | BaggageExtensionFields | 行李额扩展字段 |
| containFreeBaggage | Boolean | 是否包含免费行李额 |

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| textRemarkList | List<TextRemark> | 文本描述信息(行李额/退改签/备注)表,以TextRemarkID为主键 |
| remarkID | String |  |
| textCN | String |  |
| textEN | String |  |
| brandAttributeList | List<BrandAttributeType> | 权益集合 |
| refNum | Integer | 索引号 |
| brandName | String | 品牌名称 |
| labelList | List<LabelType> | 标签列表,航班、运价等标签集合,通过id索引 |
| id | Long | 标签id |
| type | String | 标签类型:"BrandLowestPrice":"品牌最低价","OverAllLowestPric<br>e":"整体最低价","NonLimitedLowestPrice":"非限制类最低价","AGR<br>EEMENT":"协议价" |
| name | String | 标签名称 |
| description | String | 标签描述 |
| terms | String | 标签条款 |

### 示例

| POST JSON示例 |  |  |
| --- | --- | --- |
| {<br>"requestHead":{<br>"corpID":"bytedance",<br>"uID":"****",<br>"language":"zh-CN",<br>"requestID":"requestID"<br>},<br>"productID":"productID",//航班列表查询接口获取<br>"auth":{<br>"appKey":"appKey",<br>"ticket":"****"//ticket接口获取<br>}<br>} |  |  |
| 返回JSON示例 |  |  |
| {<br>"status": {<br>"success": true,<br>"errorCode": 0,<br>"message": "success"<br>},<br>"cabinClassList": [<br>{<br>"itineraryIDs": "1,1,2,2",<br>"sectorIDs": "1,2,1,2",<br>"cabinClass": "Economy,Economy,Economy,Economy",<br>"seatClass": "V,V,V,V",<br>"seatCount": 9,<br>"ticketDetail": {<br>"priceDetail": {<br>"currency": "CNY",<br>"exchange": 1,<br>"salePrice": 2390,<br>"tax": 1427,<br>"basicServiceFee": 0,<br>"refundServiceFee": 0,<br>"revalidationServiceFee": 80<br>},<br>"settlementPriceDetail": {<br>"currency": "CNY",<br>"exchange": 1.0,<br>"salePrice": 2390,<br>"tax": 1427,<br>"basicServiceFee": 0, |  |  |

"refundServiceFee":0,

"revalidationServiceFee":80

},

"passengerRestriction":{

"minPassengerCount":1,

"maxPassengerCount":9,

"nationalityInclude":"",

"nationalityExclude":"",

"minAgeLimitation":0,

"maxAgeLimitation":0,

"agreementAgeLimitation":null

},

"ticketingTimeLimit":{

"timeLimitType":1,

"limitTime":1440

},

"agencyInfo":{

"agencyCode":"****",

"agencyName":"****"

}

},

"baggageRefList":[

{

"itineraryID":1,

"baggageList":[

{

"baggageID":"1",

"baggageSize":null,

"type":0

},

{

"baggageID":"2",

"baggageSize":null,

"type":1

},

{

"baggageID":"3",

"baggageSize":null,

"type":4

}

]

}

],

"productID":"****",

"productFlag":null

}

],

"baseData":{

"baggageList":[

{

"baggageID":"1",

"baggageCN":"",

"baggageEN":"",

"baggageDetailList":[

{

"amount":1,

"unit":"PC",

"type":"Piece"

},

{

"amount":23,

"unit":"KG",

"type":"Weight"

},

{

"amount":-1,

"unit":"KG",

"type":"TotalWeight"

}

],

"extentionFileds":{

"containFreeBaggage":true

}

],

"textRemarkList":[

{

"remarkID":"1",

"textCN":"按航司客规为准;",

"textEN":"Please check Airline’s penalties."

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
| --- | --- | --- | --- |
