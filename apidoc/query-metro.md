# 查询地铁列表请求

更新时间:2026-06-15 18:39:18

## 概述

| 项目 | 内容 |
| --- | --- |
| 接口名 | GetCorpHotelDomesticMetro |
| 描述 | 查询地铁列表请求 |
| 调用方式 | https + post |
| 参数类型 | JSON |
| 调用地址 | 测试环境:https://gateway.fat.ctripqa.com/switchapi/distribution/hotel/getCorpHotelDomesticMetro<br>生产环境:https://ct.ctrip.com/distribution/hotel/getCorpHotelDomesticMetro<br>生产环境(海外):https://openapi.trip.biz/distribution/hotel/getCorpHotelDomesticMetro |
| ticket说明 | Ticket生成说明 |
| 公共鉴权请求<br>节点 |  |

待废弃(请使用上述方式接入)

| 项目 | 内容 |
| --- | --- |
| 功能描述 | 查询地铁列表请求 |
| 接口地址 | 测试:http://openservice.open.uat.ctripqa.com/openservice/serviceproxy.ashx<br>生产:https://sopenservice.ctrip.com/OpenService/ServiceProxy.ashx |
| 请求方式 | POST |
| 请求示例 | 测试: http://openservice.open.uat.ctripqa.com/openservice/serviceproxy.ashx?<br>aid=1&sid=50&icode=e807a2de73984f688ebc65e00508cade<br>&token=8d684732c0accbeabb79eb17c44d8375f9f228f10d0ce0d1bc25b4d58744c791<br>&uuid=e9d518cdc93e42e7803b98a495dae0ce&e=r6&mode=1&format=json<br>生产: https://sopenservice.ctrip.com/OpenService/ServiceProxy.ashx?<br>aid=***&sid=***&icode=f0b610e36a83458c8b41182d9fdc6d1f&token=1bd2b053981cc8714a26a9adcae9778160cd09538ce8a81593b2<br>d2962be83acc&uuid=bc379e1b3c9f4cfda14892a25e815477&e=r6&mode=1&format=json |
| 接入流程 | 酒店分销接入流程 |
| token说明 | Token生成说明 |

## 请求契约

| 名称 | 类型 | 是否必填 | 描述 |
| --- | --- | --- | --- |
| getCorpHotelDomesticMetroRequestType | GetCorpHotelDomesticMetroRequestType | Y | GetCorpHotelDomesticMetroReques<br>tType |
| id | Integer | Y | 查询ID,如果ObjectType=1,ID对应<br>城市ID;ObjectType=2,ID对应地铁<br>线Id;ObjectType=3,Id对应站点Id并<br>返回整条地铁线 |
| objectType | Integer | N | 查询的类型: 城市1/地铁线2/地铁站3 |

## 响应契约

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| getCorpHotelDomesticMetroResponseTyp<br>e | GetCorpHotelDomesticMetroResponseType | GetCorpHotelDomesticMetroResponseType |
| MetroLineDictList | List<MetroLineDict> | 国内-地铁信息线路列表 |
| CityID | Integer | 城市Id |
| MetroLineAlias | String | 别名 |
| MetroLineID | Integer | 地铁线Id |
| MetroLineName | String | 地铁线名称 |
| PinYin | String | 地铁线拼音,如果是海外,则为英文名 |
| StationList | List<StationListEntity> | 本地信息列表 |
| GDlat | Float | 高德地图纬度 |
| GDlon | Float | 高德地图经度 |
| Glat | Float | 谷歌地图纬度 |
| Glon | Float | 谷歌地图经度 |
| HotelCount | Integer | 周边可订酒店数量 |
| Lat | Float | 百度地图纬度 |
| Lon | Float | 百度地图经度 |
| OrderRatio | Float | 地铁站周边酒店的订单数在整个城市订单中的占比 |
| PinYin | String | 地铁站拼音,国外地铁站存的是英文名称 |
| SortIndex | Integer | 排序字段 |
| StationID | Integer | 站点ID |
| StationIndex | Integer | 同StationID |
| StationName | String | 站名 |
| stationEnName | String | 英文名 |

## 附录

ICode附录

| 测试环境 | 生产环境 |
| --- | --- |
| e807a2de73984f688ebc65e00508cade | f0b610e36a83458c8b41182d9fdc6d1f |

## 错误码

| 错误码 | 错误描述 | 备注 |
| --- | --- | --- |
| 10899000 | 成功 |  |

| 10800108 | RequestBody is empty |  |
| --- | --- | --- |
| 10800139 | %s can not be empty and must be greater than zero | ID |
| 10800301 | interface error |  |
| -2 | auth fail |  |

### 版本

| 版本号 | 编写日期 | 更改内容 |
| --- | --- | --- |
| V1.0 | 2019/12/16 | 初稿 |
