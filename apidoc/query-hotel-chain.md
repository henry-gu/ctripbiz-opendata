# 查询品牌列表请求

更新时间:2026-06-15 18:38:18

## 概述

| 项目 | 内容 |
| --- | --- |
| 接口名 | GetCorpCityBrandGroup |
| 描述 | 查询品牌列表请求 |
| 调用方式 | https + post |
| 参数类型 | JSON |
| 调用地址 | 测试环境:https://gateway.fat.ctripqa.com/switchapi/distribution/hotel/getCorpCityBrandGroup<br>生产环境:https://ct.ctrip.com/distribution/hotel/getCorpCityBrandGroup<br>生产环境(海外):https://openapi.trip.biz/distribution/hotel/getCorpCityBrandGroup |
| ticket说明 | Ticket生成说明 |
| 公共鉴权请求<br>节点 |  |

待废弃(请使用上述方式接入)

| 项目 | 内容 |
| --- | --- |
| 功能描述 | 查询品牌列表请求 |
| 接口地址 | 测试:http://openservice.open.uat.ctripqa.com/openservice/serviceproxy.ashx<br>生产:https://sopenservice.ctrip.com/OpenService/ServiceProxy.ashx |
| 请求方式 | POST |
| 请求示例 | 测试: http://openservice.open.uat.ctripqa.com/openservice/serviceproxy.ashx?<br>aid=1&sid=50&icode=908dd9c74df646fa984cbdaea978f04c<br>&token=45a13eaf582aaac0fe04e7cceb5cc6feb1ff829b48f7c81768da8140c1cf0ac1<br>&uuid=e9d518cdc93e42e7803b98a495dae0ce&e=r6&mode=1&format=json<br>生产: https://sopenservice.ctrip.com/OpenService/ServiceProxy.ashx?<br>aid=***&sid=***&icode=989099d0ea634257a1273f703ba6f3ac&token=cec38ce45909bab3e7c5af01ddc1243bf5d92777b08be795f826b<br>f3f55bb95b4&uuid=bc379e1b3c9f4cfda14892a25e815477&e=r6&mode=1&format=json |
| 接入流程 | 酒店分销接入流程 |
| token说明 | Token生成说明 |

## 请求契约

| 名称 | 类型 | 是否必填 | 描述 |
| --- | --- | --- | --- |
| getCorpCityBrandGroupRequestType | GetCorpCityBrandGroupRequestType | Y | GetCorpCityBrandGroupRequestType |
| cityBrandGroupParameter | CityBrandGroupParameter | Y | 品牌请求参数,必传 |
| cityID | Integer | N | 城市ID不传填-1 |
| districtID | Integer | N | 景区ID 不传填-1 |
| isEnable | Integer | N | 是否可订 缺省0可订,1全部 |

## 响应契约

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| getCorpCityBrandGroupResponseType | GetCorpCityBrandGroupResponseType | GetCorpCityBrandGroupResponseType |
| itemList | List<Item> | 返回数据列表 |
| belongtoId | Integer | 归属ID |
| belongtoName | String | 归属名 |
| belongToType | Byte | 主题来源(0-国内海外共用 1-国内专用 2-海外专用) |
| code | String | Code |
| id | Integer | 产品主键 |
| isEnable | String | 是否可订 |
| name | String | 名称 |
| parentId | Integer | 父节点ID |
| parentName | String | 父节点Name |
| pinyin | String | 拼音 |
| isRecommend | String | 是否推荐,用于高亮显示 T推荐 |
| featureType | Byte | 主题类型(0-主题 1-品类) |
| sortRank | Integer | 排序等级 |
| type | String | 类型 1:品牌 2:集团 3:主题 |
| value | BigDecimal | 分值 |

## 附录

ICode附录

| 测试环境 | 生产环境 |
| --- | --- |
| 908dd9c74df646fa984cbdaea978f04c | 989099d0ea634257a1273f703ba6f3ac |

## 错误码

| 错误码 | 错误描述 | 备注 |
| --- | --- | --- |
| 10899000 | 成功 |  |
| 10821000 | interface error |  |
| 10800108 | RequestBody is empty |  |
| 10800138 | %s can not be empty | CityBrandGroupParameter |
| 10800137 | %s must be greater than zero | cityID and districtID |
| -2 | auth fail |  |

### 版本

| 版本号 | 编写日期 | 更改内容 |
| --- | --- | --- |
| V1.0 | 2019/12/16 | 初稿 |

常⻅问题

1、 问题:23. “查询品牌列表请求”接口中,通过CityID拉取,默认不传填-1 是否是拉取所有城市 下的品牌?通过DistrictID拉取,默认不传填-1 是否是拉取所有
景区下的品牌?
答复:城市id、景区ID必传其一。
2、 问题:“查询品牌列表请求”接口中,Code和Id的区别,哪个是真正的品牌id?
答复:品牌Id 。
3、 问题:“查询品牌列表请求”接口中,BelongtoId字段有何用?BelongtoName字段有何用?
答复:指的是酒店集团的分类,包括快捷连锁、中端连锁、高端连锁、其他。
4、 问题:“查询品牌列表请求”接口中,Value字段类型为decimal,但是文档显示有个?需要 确认该字段类型到底是什么?
答复:decimal数据类型,计算分值。
5、 问题:“查询品牌列表请求”接口中,该接口生产环境返回品牌数的数量级是多少万?十万?
答复:因为是城市ID和景区ID必选其一,非全量数据,数据量不是很大,拿北京城市的品牌查询得到的数据量还不到10kb。
6、 问题:品牌id是主键,却出现同一个id不同的品牌,比如:id为1既是华美达又是首旅如 家。
答复:这个是要区分type的。品牌id主键和type一起标识唯一记录。
7、 问题:测试环境调用“查询品牌列表”接口,id等于0这条品牌记录,品牌名是“客栈⺠宿”,没有传value 字段和拼音字段,且type等于4,目前关于type文档只
定义了三种类型 1品牌、2集团、3主题,请确认4的含义。
答复:type=4&5的类型信息如下,当前城市如果存在该类型酒店会输出对应类型信息。这两类型和其它类型不太一样,由于实际在后台并不存在这两个类型,
为soa端写死的类型,所以会缺少部分信息。
8、 问题:返参id产品主键,是酒店品牌id吗?
答复:是的,返回集团和品牌
