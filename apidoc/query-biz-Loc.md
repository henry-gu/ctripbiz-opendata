# 查询商业区列表请求

更新时间:2026-06-15 18:36:41

## 概述

| 项目 | 内容 |
| --- | --- |
| 接口名 | GetDomesticZone |
| 描述 | 查询商业区列表请求 |
| 调用方式 | https + post |
| 参数类型 | JSON |
| 调用地址 | 测试环境:https://gateway.fat.ctripqa.com/switchapi/distribution/hotel/getDomesticZone<br>生产环境:https://ct.ctrip.com/distribution/hotel/getDomesticZone<br>生产环境(海外):https://openapi.trip.biz/distribution/hotel/getDomesticZone |
| ticket说明 | Ticket生成说明 |
| 公共鉴权请求<br>节点 |  |

待废弃(请使用上述方式接入)

| 项目 | 内容 |
| --- | --- |
| 功能描述 | 查询商业区列表请求 |
| 接口地址 | 测试:http://openservice.open.uat.ctripqa.com/openservice/serviceproxy.ashx<br>生产:https://sopenservice.ctrip.com/OpenService/ServiceProxy.ashx |
| 请求方式 | POST |
| 请求示例 | 测试: http://openservice.open.uat.ctripqa.com/openservice/serviceproxy.ashx?<br>aid=1&sid=50&icode=6942cc89044e4834ad2ffda3c5124d78<br>&token=32fbd23f7c46e8958a0bc244643e1907ff460fa0b58ab6ac356a4cf1153a55ae<br>&uuid=e9d518cdc93e42e7803b98a495dae0ce&e=r6&mode=1&format=json<br>生产: https://sopenservice.ctrip.com/OpenService/ServiceProxy.ashx?<br>aid=***&sid=***&icode=85ef532b240446c681b7ebc12927216a&token=b1febd0290153886ecb98359c54db225e897f4ff5ca59f5d11369<br>d8e58955e12&uuid=bc379e1b3c9f4cfda14892a25e815477&e=r6&mode=1&format=json |
| 接入流程 | 酒店分销接入流程 |
| token说明 | Token生成说明 |

## 请求契约

| 名称 | 类型 | 是否必填 | 描述 |
| --- | --- | --- | --- |
| getDomesticZoneRequestType | GetDomesticZoneRequestType | Y | GetDomesticZoneRequestType |
| corpID | String | Y | 公司ID 必传 |
| uID | String | Y | 卡号 必传 |
| cityID | Integer | Y | 城市id (值传 -1 需要返回所有城市)必传,值需大<br>于0 |
| isValidPosition | String | N | IsValidPosition=T 是根据position过滤掉position<br><=0的数据 并且 根据city和position正序排列,Or<br>derBy无效<br>IsValidPosition=F 或不传 OrderBy才可以生效 |

| 名称 | 类型 | 是否必填 | 描述 |
| --- | --- | --- | --- |
| dataType | Integer | N | 数据类型,字段已废弃,(接口已经下线景区字<br>段,只返回商业区数据,筛选无效) |
| topNum | Integer | N | 返回记录数量 |
| zone | Integer | N | 区域 |
| orderBy | Integer | N | 排序规则:<br>OrderBy=0 按照城市和商圈名称正序<br>OrderBy=1 按照City,DynamicResult倒序,商圈名<br>称正序<br>OrderBy=2按照City,Position,DynamicResult倒序<br>OrderBy=3 按照商业区热度比(商业区的热度比H<br>itsRatios,该商业区的订单量/该商业区所在城市<br>的订单量),倒序<br>OrderBy=4 按照销量比(国内算一个月的,海外<br>算3个月的 你们不必关心)倒序 |
| isViewHotel | String | N | T表示为只显示有可订酒店的商业区,其他表示显<br>示所有 |

## 响应契约

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| getDomesticZoneResponseType | GetDomesticZoneResponseType | GetDomesticZoneResponseType |
| zoneDetailList | List<ZoneDetail> | 国内-显示城市商业区地图 |
| city | String | 城市ID |
| cityName | String | 城市名称 |
| district | String | 景区ID |
| gdLat | Double | 高德地图纬度 |
| gdLon | Double | 高德地图经度 |
| height | String | height |
| positon | Integer | 商业区Online显示位置(等于0则不显示) |
| width | String | width |
| zone | String | 商业区ID |
| zoneCentralName | String | 商业中心名称 |
| zoneDesc | String | 商业区描述 |
| zoneEName | String | 商业区英文名 |
| zoneMapPic | String | 商业区对应图片名 |

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| zoneMapPicURL | String | 商业区对应图片的URL地址(相对路径) |
| zoneMapuse | String | 商业区是否有地图 F或T |
| zoneName | String | 商业区名称 |
| zoneRange | String | 商业区范围 |
| zoneShortName | String | 商业区短名称,可能为空 |
| bdLon | Double | 百度经度 |
| bdLat | Double | 百度纬度 |
| polygonInfo | PolygonInfo | 商业区多边形地图信息 |
| zone | String | 商业区ID |
| hotelAmount | Integer | 酒店数量 |
| ploygonDetailInfoList | List<PloygonDetailInfo> | 划分商业区多边形范围的坐标信息 |
| pointLon | String | 多边形某个点的经度 |
| pointLat | String | 多边形某个点的纬度 |
| zoneEnDesc | String | 商区英文描述 |
| status |  | 调用结果 |
| success | Boolean | 是否成功 |
| errorCode | Integer | 错误码 |
| errorMessage | String | 错误描述 |

### 示例

请求数据的JSON格式示例

{

"Auth":{

"AppKey":"***",

"Ticket":"580487ff97194e2f64000004"

},

"corpID":"corpid",

"uID":"2122506531",

"cityID":537,

"districtID":null,

"isValidPosition":null,

"dataType":null,

"topNum":5,

"zone":null,

"orderBy":null,

"isViewHotel":null

}

返回数据的JSON格式示例

{

"ResponseStatus":{

"Timestamp":"/Date(1643338891395+0800)/",

"Ack":"Success",

"Errors":[],

"Version":"v1",

"Extension":[]

},

"status":{

"success":true,

"errorCode":10899000,

"errorMessage":"成功"

},

"zoneDetailList":[

{

"city":"537",

"cityName":"宜兴",

"district":"0",

"gdLat":31.236108779907227,

"gdLon":119.5825424194336,

"height":"",

"positon":0,

"width":"",

"zone":"11951",

"zoneCentralName":"大觉寺云湖景区",

"zoneDesc":"大觉寺为禅宗临济宗道场。南宋咸淳(1265年-1274年)年间,由志宁禅师创建,至今约有七百多年历史。云湖原名横山水库是国家大型水

库,是⻓三⻆、环太湖地区自然生态环境保护得最好的区",

"zoneEName":"Dajue Temple-Yun Lake scenic area",

"zoneMapPic":"",

"zoneMapPicURL":"",

"zoneMapuse":"T",

"zoneName":"大觉寺/云湖⻛景区",

"zoneRange":"大觉寺入口",

"zoneShortName":"大觉寺",

"bdLon":119.58914947509766,

"bdLat":31.241758346557617,

"polygonInfo":{

"zone":"11951",

"hotelAmount":117,

"ploygonDetailInfoList":[

{

"pointLon":"119.628774359324",

"pointLat":"31.2355171430275"

},

{

"pointLon":"119.629221589354",

"pointLat":"31.2552743559338"

},

{

"pointLon":"119.629446948962",

"pointLat":"31.2650277537986"

},

{

"pointLon":"119.630463707817",

"pointLat":"31.2745263376433"

},

{

"pointLon":"119.632557551219",

"pointLat":"31.2937667137801"

},

{

"pointLon":"119.634632727569",

"pointLat":"31.3130024136423"

},

{

"pointLon":"119.609019567166",

"pointLat":"31.319656425336"

},

{

"pointLon":"119.592923004535",

"pointLat":"31.3232160589687"

},

{

"pointLon":"119.576802673965",

"pointLat":"31.3259435556805"

},

{

"pointLon":"119.543506429997",

"pointLat":"31.329138640084"

},

{

"pointLon":"119.536926893663",

"pointLat":"31.3255159685103"

},

{

"pointLon":"119.53505661858",

"pointLat":"31.287000054917"

},

{

"pointLon":"119.533330053354",

"pointLat":"31.2711751130748"

},

{

"pointLon":"119.525487248173",

"pointLat":"31.2459073795881"

},

{

"pointLon":"119.541031188742",

"pointLat":"31.2310342768604"

},

{

"pointLon":"119.555086456089",

"pointLat":"31.222121547259"

},

{

"pointLon":"119.555979538661",

"pointLat":"31.1807899706829"

},

{

"pointLon":"119.5407481725",

"pointLat":"31.1696369869871"

},

{

"pointLon":"119.628524077427",

"pointLat":"31.1674580089796"

},

{

"pointLon":"119.628774359324",

"pointLat":"31.2355171430275"

}

]

},

"zoneEnDesc":""

},

{

"city":"537",

"cityName":"宜兴",

"district":"0",

"gdLat":31.298873901367188,

"gdLon":119.66960144042969,

"height":"",

"positon":0,

"width":"",

"zone":"11950",

"zoneCentralName":"善卷洞⻛景区",

"zoneDesc":"宜兴善卷洞⻛景区简介善卷洞⻛景区位于苏、浙、皖三省交界的江苏宜兴市⻄南25公里的螺岩山中,是国家重点⻛景名胜区、国家4A级景

区、中国梁山伯祝英台之乡、中国旅游文化示范地。",

"zoneEName":"Shanjuan Cave-Longchi Mountain scenic area",

"zoneMapPic":"",

"zoneMapPicURL":"",

"zoneMapuse":"T",

"zoneName":"善卷洞⻛景区",

"zoneRange":"善卷洞⻛景区",

"zoneShortName":"善卷洞",

"bdLon":119.67642974853516,

"bdLat":31.304325103759766,

"polygonInfo":{

"zone":"11950",

"hotelAmount":42,

"ploygonDetailInfoList":[

{

"pointLon":"119.697871017846",

"pointLat":"31.2646141642134"

},

{

"pointLon":"119.719778593622",

"pointLat":"31.2898727703461"

},

{

"pointLon":"119.739401141838",

"pointLat":"31.3169137844414"

},

{

"pointLon":"119.726817415915",

"pointLat":"31.3408554842713"

},

{

"pointLon":"119.679927986993",

"pointLat":"31.3466494407945"

},

{

"pointLon":"119.636383649431",

"pointLat":"31.3284185589062"

},

{

"pointLon":"119.629594634134",

"pointLat":"31.2653403819133"

},

{

"pointLon":"119.697871017846",

"pointLat":"31.2646141642134"

}

]

},

"zoneEnDesc":""

},

{

"city":"537",

"cityName":"宜兴",

"district":"0",

"gdLat":31.250503540039062,

"gdLon":119.8252182006836,

"height":"",

"positon":0,

"width":"",

"zone":"4145",

"zoneCentralName":"陶都陶瓷艺术博览中心",

"zoneDesc":"中国陶都陶瓷城就坐落于宜兴丁蜀,是以紫砂陶、日用陶、工艺陶、化工陶为核心的中国最大综合性陶瓷商贸城。陶瓷城北近⻄山,南至⺠

主路,⻄至新104国道,东临城区,是无锡市重点项目之一。",

"zoneEName":"Taodu Ceramic Art Expo Center",

"zoneMapPic":"",

"zoneMapPicURL":"",

"zoneMapuse":"T",

"zoneName":"陶都陶瓷艺术博览中心",

"zoneRange":"",

"zoneShortName":"陶瓷城",

"bdLon":119.83182525634766,

"bdLat":31.25615882873535,

"polygonInfo":{

"zone":"4145",

"hotelAmount":109,

"ploygonDetailInfoList":[

{

"pointLon":"119.80693855175",

"pointLat":"31.2694546880672"

},

{

"pointLon":"119.802989557865",

"pointLat":"31.2462700033679"

},

{

"pointLon":"119.810370704598",

"pointLat":"31.2336478993495"

},

{

"pointLon":"119.827537329941",

"pointLat":"31.2223422747652"

},

{

"pointLon":"119.850884074358",

"pointLat":"31.2307107180334"

},

{

"pointLon":"119.853114986562",

"pointLat":"31.2597702940147"

},

{

"pointLon":"119.80693855175",

"pointLat":"31.2694546880672"

}

]

},

"zoneEnDesc":""

},

{

"city":"537",

"cityName":"宜兴",

"district":"0",

"gdLat":31.31161117553711,

"gdLon":119.82049560546875,

"height":"",

"positon":0,

"width":"",

"zone":"15337",

"zoneCentralName":"宜兴站",

"zoneDesc":"宜兴站是宜兴市内唯一高铁站,是宁杭高速铁路的中间站,连同杭州至南京。⻋站背靠⻰背山森林公园。公园位于宜兴城区南侧,占地550

公顷,园内丘陵起伏,植被茂密,是沪、宁、杭地区最大的城区",

"zoneMapPic":"",

"zoneMapPicURL":"",

"zoneMapuse":"T",

"zoneName":"宜兴高铁站/⻰背山森林公园",

"zoneRange":"宜兴站",

"zoneShortName":"宜兴站",

"bdLon":119.82049560546875,

"bdLat":31.317298889160156,

"polygonInfo":{

"zone":"15337",

"hotelAmount":11,

"ploygonDetailInfoList":[

{

"pointLon":"119.801165309982",

"pointLat":"31.2812033928752"

},

{

"pointLon":"119.863587184331",

"pointLat":"31.2873743759486"

},

{

"pointLon":"119.866432808321",

"pointLat":"31.3506239640165"

},

{

"pointLon":"119.780825683468",

"pointLat":"31.3289590402359"

},

{

"pointLon":"119.779036704315",

"pointLat":"31.3284979707897"

},

{

"pointLon":"119.801165309982",

"pointLat":"31.2812033928752"

}

]

},

"zoneEnDesc":""

},

{

"city":"537",

"cityName":"宜兴",

"district":"0",

"gdLat":31.3612117767334,

"gdLon":119.8174057006836,

"height":"",

"positon":0,

"width":"",

"zone":"11949",

"zoneCentralName":"人⺠路",

"zoneDesc":"宜兴市行政购物中心",

"zoneEName":"Yixing Downtown Area",

"zoneMapPic":"",

"zoneMapPicURL":"",

"zoneMapuse":"T",

"zoneName":"宜兴市中心",

"zoneRange":"宜兴蛟⻰桥步行街",

"zoneShortName":"市中心",

"bdLon":119.82401275634766,

"bdLat":31.366859436035156,

"polygonInfo":{

"zone":"11949",

"hotelAmount":302,

"ploygonDetailInfoList":[

{

"pointLon":"119.867751896372",

"pointLat":"31.3509994269801"

},

{

"pointLon":"119.878330819445",

"pointLat":"31.3747436034215"

},

{

"pointLon":"119.83903807963",

"pointLat":"31.3943510272241"

},

{

"pointLon":"119.805322314351",

"pointLat":"31.4081010734043"

},

{

"pointLon":"119.790285845137",

"pointLat":"31.3873171616248"

},

{

"pointLon":"119.769144819428",

"pointLat":"31.3541826161519"

},

{

"pointLon":"119.787425237015",

"pointLat":"31.3307949356664"

},

{

"pointLon":"119.79450396361",

"pointLat":"31.3327464760806"

},

{

"pointLon":"119.834732853042",

"pointLat":"31.3431529036917"

},

{

"pointLon":"119.867751896372",

"pointLat":"31.3509994269801"

}

]

},

"zoneEnDesc":""

}

]

}

## 附录

ICode附录

| 测试环境 | 生产环境 |
| --- | --- |
| 6942cc89044e4834ad2ffda3c5124d78 | 85ef532b240446c681b7ebc12927216a |

错误编码信息列表

| 编码 | 描述 | 备注 |
| --- | --- | --- |
| 10899000 | 成功 |  |
| 1000 | interface error |  |
| 10899001 | Request不能为空 |  |
| 10820000 | 调用依赖服务出错 |  |
| 10811001 | 查询国内商业区失败 |  |
| 10811002 | uID与corpID不匹配 |  |
| 10811003 | cityID值无效 |  |
| 10811004 | isValidPosition值无效 |  |
| 10811005 | districtID值无效 |  |
| 10811006 | dataType值无效 |  |
| 10811007 | topNum值无效 |  |
| 10811008 | zone值无效 |  |
| 10811009 | isViewHotel值无效 |  |
| 10811010 | orderBy值无效 |  |
| 10811011 | corpID值无效 |  |
| 10811012 | uID值无效 |  |
| -2 | auth fail |  |

### 版本

| 版本号 | 编写日期 | 更改内容 | 作者 |
| --- | --- | --- | --- |
| V1.0 | 2019/12/16 | 初稿 |  |
| V1.1 | 2022/01/27 | 增加请求返回报文JSON示例 | ⻩华 |
