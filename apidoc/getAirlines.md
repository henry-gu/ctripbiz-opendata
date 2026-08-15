# 航司信息查询接口

更新时间:2025-01-14 16:09:36

## 概述

| 项目 | 内容 |
| --- | --- |
| 接口名 | GetAirlines |
| 描述 | 航司信息查询接口 |
| 调用方式 | https + post |
| 参数类型 | JSON |
|  | 测试环境:https://gateway.fat.ctripqa.com/switchapi/distribution/flight/getAirlines |
| 调用地址 | 生产环境:https://ct.ctrip.com/distribution/flight/getAirlines |
|  | 生产环境(海外):https://openapi.trip.biz/distribution/flight/getAirlines |
| ticket说明 | Ticket生成说明 |
| 公共鉴权请求 |  |
| 节点 |  |
| 废弃(请使用上述方 | 式接入) |
| 功能描述 | 航司信息查询接口 |
| 接口地址 | 测试:http://openservice.open.uat.ctripqa.com/openservice/serviceproxy.ashx |
|  | 生产:https://sopenservice.ctrip.com/OpenService/ServiceProxy.ashx |
| 请求方式 | POST |
| 请求示例 | 测试:http://openservice.open.uat.ctripqa.com/openservice/serviceproxy.ashx? |
|  | aid=1&sid=50&icode=08f5aea7df604c77ae4ffa0350886d03&token=52f3f8472b5d642d808b4e8db54c7c |
|  | 208fed404ffe8f2&uuid=1f5f11c84dec4c77a830eb60ddd16582&e=r6&mode=1&format=json |
|  | 生产:https://sopenservice.ctrip.com/openservice/serviceproxy.ashx? |
|  | aid=***&sid=***&icode=4a150df57cf44473bcbfa65836829e14&token=1f620afe106df162f0532048975ee |
|  | 3beffd3444be91a&uuid=1f5f11c84dec4c77a830eb60ddd16582&e=r6&mode=1&format=json |
| token说明 | Token生成说明 |

## 请求契约

| 名称 | 类型 | 是否必填 |
| --- | --- | --- |
| getAirlinesRequestType | GetAirlinesRequestType | Y |
| uID | String | Y |
| corpID | String | Y |
| transactionID | String | Y |
| airline | String | N |
| locale | String | N |

描述

Booking request contra

用户ID必传

公司ID必传

用来标识事务号,必传

航司二字码,非必传传,

标准语言格式(如zh-C

## 响应契约

| 名称 | 类型 |
| --- | --- |
| getAirlinesResponseType | GetAirlinesResponseType |
| status | ResponseStatus |
| success | Boolean |
| errorCode | Integer |
| message | String |
| data | GetAirlinesResponseType |
| errorCode | String |
| message | String |
| airlineList | List<AirlineInfo> |
| code | String |
| name | String |
| nameEN | String |
| shortName | String |

描述

Booking response

interface status

Is call success

error code

error message

GetAirlinesRespons

错误码(0或空表示

错误信息

航司列表

航空公司code

航空公司中文名

航空公司英文名

简称

| 名称 | 类型 |
| --- | --- |
| alliance | String |
| allianceEN | String |
| supportAirPlus | Boolean |
| flightClass | String |

描述

航空公司联盟

航空公司联盟英文名

是否支持AirPlus

航空公司类别I:国际

## 示例

请求数据的JSON格式示例

{

"Auth":{

"AppKey":"***",

"Ticket":"580487ff97194e2f64000004"

},

"corpID":"corpAPITest",

"transactionID":"b95e697c-0b33-493a-a7f0-7bf7e9c3db52",

"uID":"_SL2237554779",

"airline":"0D"

}

返回数据的JSON格式示例

{

"ResponseStatus":{

"Timestamp":"/Date(1643338040245+0800)/",

"Ack":"Success",

"Errors":[],

"Build":null,

"Version":null,

"Extension":[]

},

"errorCode":"0",

"message":"成功",

"airlineList":[

{

"code":"0D",

"name":"达尔文航空",

"nameEN":"Darwinairline",

"shortName":"达尔文",

"alliance":"",

"allianceEN":"",

"supportAirPlus":false,

"flightClass":"I"

}

]

}

## 附录

ICode附录

测试环境
08f5aea7df604c77ae4ffa0350886d03

生产环境

4a150df57cf44473bcbfa65836829e14

错误编码信息列表

编码
0
1000
20913001
20913002
20900005

描述

成功

接口内部错误

调用查询航司接口失败,Request不能为空

调用查询航司接口失败,TransactionID不能为空

uID与corpID不匹配

## 版本

| 版本号 | 编写日期 | 更改内容 |
| --- | --- | --- |
| V1.0 | 2022/01/05 | 初稿 |
| V1.1 | 2022/01/26 | 增加请求示例,修改请<br>求,返回字段名称 |

作者

⻩华
