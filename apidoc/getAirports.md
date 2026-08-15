# 航站楼信息查询

更新时间:2025-01-14 16:03:32

## 概述

| 项目 | 内容 |
| --- | --- |
| 接口名 | GetAirPortBuildings |
| 描述 | 获取航站楼信息 |
| 调用方式 | https + post |
| 参数类型 | JSON |
| 调用地址 | 测试环境:https://gateway.fat.ctripqa.com/switchapi/distribution/flight/getAirPortBuildings<br>生产环境:https://ct.ctrip.com/distribution/flight/getAirPortBuildings<br>生产环境(海外):https://openapi.trip.biz/distribution/flight/getAirPortBuildings |
| ticket说明 | Ticket生成说明 |
| 公共鉴权请求<br>节点 |  |

待废弃(请使用上述方式接入)

| 项目 | 内容 |
| --- | --- |
| 功能描述 | 获取航站楼信息 |
| 接口地址 | 测试:http://openservice.open.uat.ctripqa.com/openservice/serviceproxy.ashx<br>生产:Https://sopenservice.ctrip.com/OpenService/ServiceProxy.ashx |
| 请求方式 | POST |
| 请求示例 | 测试:http://openservice.open.uat.ctripqa.com/openservice/serviceproxy.ashx?<br>aid=1&sid=272&icode=826c86d449964919bc4f301ac7f758fc&token=424c7420b330e752ef3fd17e2d24a38b1dbc95e5b26fe23578bc2<br>3c1aff7afc0&uuid=fdd6ed2d-4770-4f7c-840d-e8825217a3f6&e=r6&mode=1&format=json<br>生产:https://sopenservice.ctrip.com/OpenService/ServiceProxy.ashx?<br>aid=***&sid=***&icode=3de8df1503b04f86a29a83daf37d9a21&token=4758a26091a0874e3af1b795e257d833636658f8933abffc51cb19<br>a5a43fcb5f&uuid=d0bf4db2cb3d48d69492c6fb41d1e7f3&e=r6&mode=1&format=json |
| token说明 | Token生成说明 |

## 请求契约

| 名称 | 类型 | 是否必填 | 描述 |
| --- | --- | --- | --- |
| getAirPortBuildingsRequestType | GetAirPortBuildingsRequestType | Y | GetAirPortBuildingsRequestType |
| uID | String | Y | 用户ID 必传 |
| corpID | String | Y | 公司ID 必传 |
| transactionID | String | Y | 用来标识事务号,必传 |
| smsName | String | N | 航站楼标识 T1,T2 非必传 |
| airportCode | String | N | 机场三字码 非必传 |
| cityCode | String | N | 城市三字码 非必传 |
| locale | String | N | 标准语言格式(如zh-CN,en-US等,默认zh-C<br>N) |

## 响应契约

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| getAirPortBuildingsResponseType | GetAirPortBuildingsResponseType | GetAirPortBuildingsResponseType |
| errorCode | String | 错误码(0或空表示正确) |
| message | String | 错误信息 |
| airPortBuildingList | List<AirportBuildingInfo> | 航站楼列表 |
| id | Integer |  |
| name | String | 航站楼中文名 |
| nameEN | String | 航站楼英文名 |
| shortName | String | 航站楼中文短名 |
| shortNameEN | String | 航站楼英文短名 |
| smsName | String | 航站楼标识 T1,T2 |
| airportCode | String | 机场三字码 |
| cityID | Integer | 城市 |
| airline | String | 航司 |
| effectDate | String | 起始有效时间 |
| expirtyDate | String | 过期时间 |
| flightClass | String | N:国内, I:国际 |

### 示例

请求数据的JSON格式示例

{

"Auth":{

"AppKey":"***",

"Ticket":"580487ff97194e2f64000004"

},

"uID":"M02701605",

"corpID":"SHflower001",

"transactionID":"123154",

"smsName":null,

"airportCode":"PEK",

"cityCode":null

}

返回数据的JSON格式示例

{

"ResponseStatus":{

"Timestamp":"/Date(1643335985174+0800)/",

"Ack":"Success",

"Errors":[],

"Build":null,

"Version":null,

"Extension":[]

},

"errorCode":"0",

"message":"成功",

"airPortBuildingList":[

{

"id":1,

"name":"首都国际机场1号航站楼",

"nameEN":"Terminal 1 of Capital International Airport",

"shortName":"T1航站楼",

"shortNameEN":"Terminal 1 of Capital Airport",

"smsName":"T1",

"airportCode":"PEK",

"cityID":1,

"airline":null,

"effectDate":null,

"expirtyDate":null,

"flightClass":null

},

{

"id":2,

"name":"首都国际机场2号航站楼",

"nameEN":"Terminal 2 of Capital International Airport",

"shortName":"T2航站楼",

"shortNameEN":"Terminal 2 of Capital Airport",

"smsName":"T2",

"airportCode":"PEK",

"cityID":1,

"airline":null,

"effectDate":null,

"expirtyDate":null,

"flightClass":null

},

{

"id":3,

"name":"首都国际机场3号航站楼",

"nameEN":"Terminal 3 of Capital International Airport",

"shortName":"T3航站楼",

"shortNameEN":"Terminal 3 of Capital Airport",

"smsName":"T3",

"airportCode":"PEK",

"cityID":1,

"airline":null,

"effectDate":null,

"expirtyDate":null,

"flightClass":null

},

{

"id":1814,

"name":"北京首都国际机场公务机候机楼",

"nameEN":"Capital jet company ltd.",

"shortName":"北京首都公务机楼",

"shortNameEN":"Beijing Capital jet",

"smsName":"FBO",

"airportCode":"PEK",

"cityID":1,

"airline":null,

"effectDate":null,

"expirtyDate":null,

"flightClass":null

}

]

}

## 附录

ICode附录

| 测试环境 | 生产环境 |
| --- | --- |
| 826c86d449964919bc4f301ac7f758fc | 3de8df1503b04f86a29a83daf37d9a21 |

错误编码信息列表

| 编码 | 描述 | 备注 |
| --- | --- | --- |
| 0 | 成功 |  |
| 20912001 | 调用查询航站楼接口失败,Request不能为空 |  |
| 20912002 | 调用查询航站楼接口失败,TransactionID不能为空 |  |
| 20900005 | uID与corpID不匹配 |  |

### 版本

| 版本号 | 编写日期 | 更改内容 | 作者 |
| --- | --- | --- | --- |
| V1.0 | 2019/11/16 | 初稿 |  |
| V1.1 | 2022/01/26 | 增加请求返回报文JSON示例 | ⻩华 |
