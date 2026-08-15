# 酒店详情V2.0

更新时间:2026-07-23 20:08:34

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
| 功能描述 |  | 查询酒店详情V2 |
| 接口地址 |  | 测试:http://openservice.open.uat.ctripqa.com/openservice/serviceproxy.ashx<br>生产:https://sopenservice.ctrip.com/OpenService/ServiceProxy.ashx |
| 请求方式 |  | POST |
| 请求示例 |  | 测试: http://openservice.open.uat.ctripqa.com/openservice/serviceproxy.ashx?<br>aid=1&sid=50&icode=51d32639f0fe40ca96679cac856ef911&token=5321b5234b4abda095fc64154e41569f6b4074aa94cd831ebee139<br>882063cda8&uuid=7e6e6544af524fa590d3411b49697780&e=r6&mode=1&format=json<br>生产: https://sopenservice.ctrip.com/OpenService/ServiceProxy.ashx?<br>aid=***&sid=***&icode=51d32639f0fe40ca96679cac856ef911&token=37f5aaeaaee984477fb820106ee48471dc4c093227f0e57e1e55b5<br>3bc1f914f1&uuid=bc379e1b3c9f4cfda14892a25e815477&e=r6&mode=1&format=json |
| 接入流程 |  | 酒店分销接入流程 |
| token说明 |  | Token生成说明 |

## 请求契约

| 名称 | 类型 | 是否必填 | 描述 |
| --- | --- | --- | --- |
| getHotelDetailV2RequestType | GetHotelDetailV2RequestType | Y | GetHotelDetailV2RequestType |
| hotelId | Integer | N | 母酒店ID,必传 |
| baseInfo | BaseEntity | N | 本次查询用户相关信息,,必传 |
| uid | String | N | 商旅客户卡号,必填 |
| corpId | String | N | 公司ID,必填 |
| language | String | N | 语言类别;枚举类型:ZH_CN EN_US;选填,默<br>认ZH_CN |

| 名称 | 类型 | 是否必填 | 描述 |
| --- | --- | --- | --- |
| locale | String | N | zh-CN或en-US,优先使用locale,没传locale使用lan<br>guage,语言类型为EN_US时,local必传 |
| selectedCountryCode | String | N | 用户所选国家code二字码 |
| userBelongInfo | userBelongType | N | 用户归属信息 |
| usersCityId | Integer | N | 用户所在城市 |
| checkInDate | String | N | 入住时间,必传 |
| checkOutDate | String | N | 离店时间,必传 |
| roomQuantity | Integer | N | 预订房间数量,必传 |
| roomQuantityLimited | Boolean | N | 房型列表中,是否排除有预订间数限制的房型。 背<br>景介绍:有一类房型的价格存在预订间数的限制<br>(推测有可能是基于薄利多销的促销逻辑),比如某<br>个房价限制最少订5间,最多订10间。 传参举例:<br>当入参RoomQuantity=3时,表示用户想订3间。那<br>么,当RoomQuantityLimited不传或传false时,Ra<br>tePlan接口对上述房型不做过滤。当RoomQuantity<br>Limited传true时,RatePlan接口不返回上述房型。 |
| guestQuantity | Integer | N | 总入住人数,必传 |
| roomFilter | RoomFilterEntity | N | 房型过滤条件,选填 |
| onlyFGRoom | Boolean | N | 只查现付房型 |
| onlyPPRoom | Boolean | N | 只查预付房型 |
| justifyConfirm | Boolean | N | 是否立即确认 |
| hasbreakfast | Boolean | N | 含早餐 |
| companyAccountPayment | Boolean | N | 公司账户支付 |
| freeCancel | Boolean | N | 是否免费取消房型 |
| bedType | String | N | * 床型ALL 不限 * QUEEN_BED 大床 * TWIN_BED<br>双人床 * SINGLE_BED 单人床 * MULTI_BED 多人<br>床 |
| hasWindow | Boolean | N | 是否有窗(只出有窗、飘窗、未知的房型) |
| promotionRoom | Boolean | N | 过滤促销房型 |
| specialInvoice | Boolean | N | 可开专票 |
| onlyHourRoom | Boolean | N | 只查钟点房 |
| onlyLongRental | Boolean | N | 只查⻓租房 |
| onlyBonusPoint | Boolean | N | 出有可积分房型的酒店 |
| priceRange | PriceRangeEntity | Y | 价格筛选信息 |

| 名称 | 类型 | 是否必填 | 描述 |
| --- | --- | --- | --- |
| lowPrice | BigDecimal | Y | 价格区间最低价(自定义币种) |
| highPrice | BigDecimal | Y | 价格区间最高价(自定义币种) |
| priceFilterType | String | Y | 价格筛选方式(AVG_PRICE:均价管控;DAILY_P<br>RICE:每日价管控);不传默认按均价管控 |
| filterWithExtraPayTax | boolean | Y | 是否根据到店付税过滤 |
| sceneFlag | String | N | 使用场景<br>BI_PRICE_COMPARE(bi比价)<br>DYNAMIC_TRAVEL_POLICY(动态差标:保证价格新<br>鲜度和一致性,抛弃非必须静态信息)<br>DATA_PULLING(数据拉取) |
| hid | String | N | 会话标识, 传入调用列表接口返回的hid |
| platform | String | N | 用户感知到的入口平台,可选项:ios、android、h<br>armony、applet、h5、online、offline |

## 响应契约

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| getHotelDetailV2ResponseType | GetHotelDetailV2ResponseType | GetHotelDetailV2ResponseType |
| hotelDetailInfo | HotelDetailInfoEntity | 酒店信息 |
| hotelBaseInfo | DetailBaseInfoEntity | 酒店基础信息 |
| hotelId | Integer | 母酒店ID |
| hotelName | String | 酒店名称 |
| hotelPositionInfo | PositionEntity | 酒店位置信息 |
| hotelAddress | String | 酒店地址 |
| countryInfo | GeoCommonEntity | 国家信息 |
| id | Integer | ID |
| name | String | 名称 |
| provinceInfo | GeoCommonEntity | 省份信息 |
| id | Integer | ID |
| name | String | 名称 |
| cityInfo | CityType | 城市信息 |
| id | Integer | ID |
| name | String | 名称 |
| parentCityList | List<IdNameType> | 上级城市列表 |

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| id | Integer | ID |
| name | String | 名称 |
| childCityList | List<IdNameType> | 下级城市列表 |
| id | Integer | ID |
| name | String | 名称 |
| locationInfo | GeoCommonEntity | 行政区信息 |
| id | Integer | ID |
| name | String | 名称 |
| zoneInfoList | List<GeoCommonEntity> | 商业区信息列表 |
| id | Integer | ID |
| name | String | 名称 |
| coordinateInfoList | List<CoordinateEntity> | 酒店坐标信息 |
| lat | Double | 经度 |
| lon | Double | 纬度 |
| mapType | String | 地图的类型,取值范围:BAI_DU-百度 GAO_DE-高德 GOOG<br>LE-谷歌 |
| hotelVideoInfo | List<VideoInfoEntity> | 酒店视频信息 |
| videoURL | String | 视频URL |
| coverPicURL | String | 视频封面图片(需自行拼接URL切图,详⻅https://openapi.ctr<br>ipbiz.com/#/serviceApi?apiId=1000311) |
| hotelPictureInfo | PictureInfoEntity | 酒店图片信息 |
| commonPictureList | List<CommonPictureEntity> | 普通图片列表 |
| commonPictureType | String | 普通图片类型 |
| commonPictureTypeName | String | 普通图片类型名称 |
| hotelLogoURL | String | 普通图片URL(需自行拼接URL切图,详⻅https://openapi.ctri<br>pbiz.com/#/serviceApi?apiId=1000311) |
| userUpload | Boolean | 是否是用户上传的图片 |
| hotelLogoURL | String | 酒店LogoUrl(需自行拼接URL切图,详⻅https://openapi.ctri<br>pbiz.com/#/serviceApi?apiId=1000311) |
| hotelStarInfo | HotelStarEntity | 酒店星钻信息 |
| starNum | Integer | 星钻数 |

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| iconType | String | 星钻类型 STAR-星,DIAMOND-钻,CIRCLE-⺠宿 |
| hotelMedalInfo | HotelMedalEntity | 酒店奖牌信息 |
| medalType | String | 奖牌类型 |
| score | String | 分数 |
| hotelBrandInfo | HotelBrandEntity | 酒店品牌信息 |
| brandId | Integer | 品牌Id |
| groupId | Integer | 集团Id |
| hotelContactInfo | HotelContactInfoType | 酒店联系方式 |
| telephone | String | 联系电话 |
| hotelCommentInfo | HotelCommentInfoEntity | 酒店点评信息 |
| scoreInfo | ScoreInfoEntity | 分数信息 |
| total | Double | 总分 |
| location | Double | 位置分 |
| cleanliness | Double | 卫生分 |
| service | Double | 服务分 |
| facility | Double | 设施分 |
| commenterCount | Integer | 点评人数量 |
| importantNotifyInfo | List<ImportantNotifyEntity> | 酒店和城市重要通知信息 |
| notifyId | Long | 重要通知Id |
| notifyText | String | 通知内容 |
| startDate | Calendar | 通知开始时间 |
| endDate | Calendar | 通知结束时间 |
| importantNotifyTextType | Integer | 酒店重要通知内容类型Id(城市重要通知没有这个值) |
| importantNotifyType | ImportantNotifyTypeEnum | HOTEL,CITY |
| permanent | Boolean | 是否永久生效(如果是维护永久有效可能没有通知的开始结束<br>时间) |
| hotelFacilityInfo | FacilityInfoEntity | 酒店设施信息 |
| facilityList | FacilityListEntity | 酒店主要设施列表 |
| chineseFriendlyList | List<ChineseFriendlyEntity> | 华人礼遇设备列表(仅海外酒店可能返回) |

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| chineseFriendlyTypeName | String | 华人礼遇类型 |
| chineseFriendlyName | String | 华人礼遇名称 |
| facilityList | List<FacilityEntity> | 普通设施列表 |
| facilityTypeName | String | 设施类型 |
| facilityName | String | 设施名称 |
| showChineseFriendlyTag | Boolean | 是否展示华人礼遇标签 |
| facilityDetail | FacilityDetailEntity | 酒店设施明细 |
| facilityGroupList | List<FacilityGroupEntity> | 设施集合列表 |
| facilityGroupTypeName | String | 设施集合类型 |
| facilityGroupID | Integer | 设施集合ID |
| facilityGroupName | String | 设施集合名称 |
| facilityItemList | List<FacilityItemEntity> | 设施明细列表 |
| facilityId | Integer | 设施Id |
| facilityItemName | String | 设施项的名称 |
| masterBasicRoomId | List<Integer> | 母基础房型Id,说明这些设施只在这些基础房型上才有 |
| chargeInfo | ChargeEntity | 收费情况 |
| chargeable | Boolean | 是否收费 |
| chargeableDesc | String | 是否收费描述 |
| chargeDetail | List<ChargeDetailEntity> | 收费明细 |
| chargeStandardDe<br>sc | String | 收费标准描述 |
| price | String | 收费金额 |
| facilityLimit | String | 设施范围 |
| equipLimit | String | 配备范围 |
| parkingPolicyInfo | ParkingPolicyEntity | 停⻋场政策信息 |
| parkingProvide | String | 是否提供停⻋场 |
| chargingProvide | String | 是否提供充电桩 |
| parkingServiceInfoList | List<ParkingServiceEntity> | 停⻋服务信息列表 |
| parkingServiceDesc | String | 停⻋服务描述 |

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| parkingServiceDetail | ParkingDetailEntity | 停⻋服务明细 |
| reservedDesc | String | 是否需预订描述(如:无需预订) |
| locationDesc | String | 停⻋场位置描述(如:酒店内) |
| typeDesc | String | 停⻋场类型描述(如:公共停⻋场) |
| chargeableDesc | String | 是否收费描述(如:免费) |
| chargeStandardDesc | String | 收费标准描述(如:每日) |
| currency | String | 收费币种(如:RMB) |
| price | String | 收费金额 |
| chargingPointList | List<ChargingPointEntity> | 充电桩列表 |
| locationDesc | String | 充电桩位置描述 |
| typeDesc | String | 充电桩类别描述 |
| nearbyFacilityGroupList | List<NearbyFacilityGroupEntity> | 酒店周边设施列表 |
| nearbyFacilityGroupType | String | 周边设施集合类型 |
| nearbyFacilityGroupName | String | 周边设施集合名称 |
| nearbyFacilityNameList | List<String> | 周边设施列表 |
| hotelTrafficInfoGroupList | List<TrafficInfoGroupEntity> | 酒店交通信息列表 |
| trafficInfoGroupName | String | 分类名称 |
| trafficInfoGroupType | String | 分类类型 |
| trafficInfoList | List<TrafficInfoEntity> | 交通信息列表 |
| landMarkName | String | 地标名称 |
| trafficInfoDes | String | 交通信息描述 |
| hotelIntroductionInfo | IntroductionEntity | 酒店介绍信息 |
| hotelOpenRenovationDesc | String | 酒店开业装修时间描述 |
| hotelBaseInfoDesc | CommonInfoEntity | 酒店基本信息描述(开业装修时间联系方式等) |
| title | String | 标题 |
| content | String | 内容 |
| hotelIntroductionInfo | CommonInfoEntity | 酒店介绍 |
| title | String | 标题 |

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| content | String | 内容 |
| hotelPolicyInfo | PolicyInfoEntity | 酒店政策信息 |
| arrivalAndDeparture | ArrivalDepartureEntity | 入住和取消政策 |
| arrivalDesc | String | 入住政策描述 |
| departureDesc | String | 离店政策描述 |
| childAndAddBed | ChildPolicyEntity | 儿童和加床 |
| childLimitRule | String | 儿童限制规则(儿童是否可入住) |
| existingBedRule | ChildPolicyDetailEntity | 现有床型规则 |
| baseInfoDesc | String | 基础信息描述 |
| chargeDescList | List<String> | 收费描述列表 |
| addBedRule | ChildPolicyDetailEntity | 加床规则 |
| baseInfoDesc | String | 基础信息描述 |
| chargeDescList | List<String> | 收费描述列表 |
| hotelRemarks | String | 酒店备注(仅中文) |
| specialRemarks | String | 特殊备注 |
| mealPolicy | MealPolicyEntity | 餐⻝政策 |
| breakfastDesc | String | 早餐描述 |
| breakfastType | String | 早餐类型 |
| breakfastStyle | String | 早餐形式 |
| breakfastPrice | String | 早餐价格 |
| openTime | List<String> | 营业时间 |
| petPolicy | String | 宠物政策 |
| creditCardInfo | List<CreditCardEntity> | 可用信用卡信息 |
| creditCardName | String | 信用卡名称 |
| creditCardIconUrl | String | 信用卡图标Url |
| policyArrivalDeparture | HotelPolicyArrivalAndDepartureType | 新版入离政策 |
| arrivalFrom | String | 最早入住时间 |
| arrivalTo | String | 最晚入住时间 |

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| departureFrom | String | 最早离店时间 |
| departureTo | String | 最晚离店时间 |
| provideMaterials | String | 是否需要提供额外材料;N:未知;T:是;F:否 |
| provideTime | Integer | 额外材料需要在入住前几天提供 |
| additionalMaterials | List<Integer> | 额外材料: 1:航班信息、2:航班抵达日期、3:航班号、4:核酸<br>检测报告、5:MITI letter/警察批准通行证、6:入境凭证、7:用<br>餐时间、8:身份证明、9:入住时间 |
| nextDayArrivalTo | Boolean | 最晚到店时间是否为次日 |
| policyCheckInWay | HotelPolicyCheckInWayType | 入住方式 |
| checkWaysMessage | List<CheckWaysMessageType> | 其他入住方式 |
| checkWayMethod | Integer | 入住方式0: 自助入住机,1: 使用app 2 : 钥匙位于隐藏处3: 密<br>码入住或智能锁4: 去其他地址办理入住 |
| otherInfo | String | 入住其他信息 |
| checkInTime | Integer | 去其他地址办理入住时间, 0 非入离时间, 1 全部时间, -1<br>未知, 默认未知 |
| contactMessage | ContactMessageType | 入住前联系酒店 |
| contactAdvance | Integer | 是否需要提前联系 0 不需要 1 必须提前联系 2 非入离时间到<br>店提前联系, -1表示未知 |
| contactTime | Integer | 提前联系时间-1 表示未知1 提前24小时2 提前48小时3 提前<br>72小时 |
| contactInfo | List<ContactInfoType> |  |
| contactMethod | Integer | 联系方式名称 0 邮件 4 电话 |
| contactDetail | String | 联系方式信息 |
| reservationNoticeTip | List<NoticeTipType> | 预定必读信息 |
| title | String | 标题 |
| type | Integer | 必读信息类型 1:重要通知(信息级别为S、A) 5:入住人群<br>限制 8:入住方式 14:酒店重要通知(信息级别为B、C) |
| noticeTipDetail | List<NoticeTipDetailType> | 预定必读信息详情列表 |
| subTitle | String | 子标题 |
| noticeTipSummary | List<NoticeTipItemType> | 必读信息简语项 |
| content | String | 必读信息的话术内容 |
| noticeTipItem | List<NoticeTipItemType> | 必读信息子项 |
| content | String | 必读信息的话术内容 |

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| hotelRatePlan | HotelRatePlanEntity | 酒店价格信息 |
| hotelName | String | 酒店名称 |
| hotelAddress | String | 酒店地址 |
| hotelLogoUrl | String | 酒店Logo地址 |
| geoInfo | GeographicEntity | 酒店地理位置信息 |
| countryInfo | IdNameEntity | 国家信息 |
| iD | Integer | ID |
| name | String | 名称 |
| provinceInfo | IdNameEntity | 省份信息 |
| iD | Integer | ID |
| name | String | 名称 |
| cityInfo | IdNameEntity | 城市信息 |
| iD | Integer | ID |
| name | String | 名称 |
| telephone | String | 酒店电话 |
| star | Integer | 酒店星级 |
| starLicence | Boolean | 是否挂牌 |
| customerEval | Double | 用户推荐级别 |
| hRatingOverall | Double | 用户评分 |
| timeZoneList | List<TimeZoneEntity> | 时差列表(当地时间、北京时间==) |
| timeZoneId | Integer | 时区ID |
| timeZoneName | String | 时区名称 |
| offset | Integer | 相对应北京时间的偏差值 |
| basicRoomList | List<BasicRoomInfo> | 基础房型列表 |
| baseRoomName | String | 基础房型名称 |
| floor | String | 楼层信息 |
| roomArea | String | 房型面积 |
| hasWindowDesc | String | 窗户描述 |

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| masterBasicRoomID | Long | 母基础房型ID |
| roomInfoList | List<RoomInfoEntity> | 子房型列表 |
| hotelId | Integer | 子酒店ID |
| roomId | Long | 子房型ID |
| roomName | String | 房型名称 |
| salePrice | BigDecimal | 总售价金额(折扣后不含税) |
| salePriceIncludeTax | BigDecimal | 总售价金额(折扣后含税) |
| avgSalePrice | BigDecimal | 均价金额(不含税) |
| avgSalePriceIncludeTax | BigDecimal | 均价金额(含税) |
| productID | String | productID,可订检查时传入 |
| roomType | String | 子房型类型,会员M/协议C |
| tMCPrice | Boolean | 是否协议两方产品 true:两方产品 false:三方产品 |
| showTMCLabel | Boolean | 两方协议是否展示"尊享价”标签 |
| premiumRoom | Boolean | 是否尊享房型 |
| balanceType | BalanceTypeEnum | FG-现付(到店付),PP-预付,USE_FG-现付转预付(等价于<br>预付) |
| taxDetails | List<TaxDetailType> | 税费明细列表 |
| taxId | Integer | 税费ID |
| taxTypeName | String | 税费类型名称 |
| chargeMode | String | 收费模式(PER_STAY-每次入住; PER_PERSON_PER_STAY-<br>每人每次; PER_NIGHT-每夜; PER_PERSON_NIGHT-每人夜;<br>PER_ORDER_AMOUNT-百分比; PER_ROOM_PER_STAY-每<br>间每次入住; PER_ROOM_PER_NIGHT-每间每晚; NOT_CAL<br>CULABLE-不能计算; OTHER-其他) |
| taxFeeCalculateType | Integer | 税费拆分规则(1-固定金额 每次入住; 2-固定金额 每间每次<br>入住; 3-固定金额 每人每次入住; 4-固定金额 每间每晚; 5-固<br>定金额 每人每晚; 6-百分比; 7-每单位; 8-阶梯-百分比; 9-阶<br>梯-每人每晚) |
| includeInTotalPrice | Boolean | true-费用已经包含在订单中 false-费用由酒店按实际情况收<br>取,不包含在订单总价中 |
| percentage | BigDecimal | 税费百分比,只有ChargeMode的值等于PerOrderAmount时<br>有效,默认为0 |
| currency | String | 房型原币种 |
| amount | BigDecimal | 税费总额(房型原币种) |

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| amountPerUnit | BigDecimal | 单位税费(房型原币种) |
| customCurrency | string | 用户结算币种 |
| customAmount | BigDecimal | 税费总额(结算币种) |
| broadBand | String | 宽带标签名 |
| broadBandTip | String | 宽带标签描述 |
| agentRoom | Boolean | 是否代理房型 |
| maxGuestNumber | Integer | 最大可入住人数 |
| addBedInfo | AddBedEntity | 加床信息同一个基础房型的子房型给不同供应商售卖加床价<br>不一致 |
| addBedOriginPrice | PriceEntity | 房型加床价(原币种) |
| price | BigDecimal | 金额 |
| currency | String | 币种 |
| addBedPriceDesc | String | 加床价描述 |
| bookingRules | BookingRulesInfo | 房型预定规则 |
| roomStatus | String | 预定多天的房态 G:良好 L:不可超 U:未知 S:紧张 W:无房 N:满<br>房 |
| canReserve | Boolean | 是否可订 |
| justifyConfirm | Boolean | 是否立即确认 |
| lastReserveTimeInfo | LastReserveTimeEntity | 最晚预定时间 |
| lastReserveTime | String | 最晚预定时间 |
| timeZoneId | Integer | 时区ID |
| lastReserveTimeDesc | String | 最晚预定时间描述 |
| cancelRuleInfo | CancelRuleInfoEntity | 取消规则信息 |
| cancelRule | CancelRuleTypeEnum | UN_KNOWN:未知,FREE:免费取消,TIME_LIMIT:限时取消:N<br>OT_ALLOWED:不能取消,FREE_IN_X_MINUTE:预定后X<br>分钟内免费取消 |
| lastCancelTimeInfo | LastCancelTimeEntity | 最晚取消时间 |
| lastCancelTime | String | 最晚取消时间 |
| timeZoneId | Integer | 时区ID |
| localTimeOffset | Integer | 以北京时间所在时区为基准,目标城市和北京城市所在时区<br>的差值,单位为秒。举例,北京为东八区,斐济为东十二<br>区,偏移量为18000。墨⻄哥为⻄七区,偏移量为-54000 |

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| ladderDeductionInfo | List<LadderDeductionInfoEntity> | 酒店阶梯取消政策 |
| deductionType | DeductionTypeEnum | FREE:免费,LADDER:阶梯,CANNOT_CANCEL:不能取消 |
| ladderDeductionDeta<br>ilInfo | LadderDeductionDetailEntity | 阶梯扣款详细信息 |
| startDeductTime | String | * 扣款开始时间(北京时间) |
| endDeductTime | String | * 扣款结束时间(北京时间) |
| deductionRatio | BigDecimal | * 扣款比例(例:0.1) |
| originPrice | PriceEntity | 扣款金额(原币种) |
| price | BigDecimal | 金额 |
| currency | String | 币种 |
| customPrice | PriceEntity | 扣款金额(配置币种) |
| price | BigDecimal | 金额 |
| currency | String | 币种 |
| xFreeCancelMinutes | Integer | X分钟免费取消分钟数 |
| lastArriveTimeInfo | LastArriveTimeEntity | 最晚入住时间 |
| lastArriveTime | String | 最晚入住时间 |
| hourSpan | Integer | 最晚入住时间延续时间段 |
| timeZoneId | Integer | 时区ID |
| needGuarantee | Boolean | 是否需要担保 |
| onlyCanMixPay | Boolean | 只能混付 |
| roomQuantity | Integer | 房型剩余房量; |
| minQuantityPerOrder | Integer | 房型的最小预定间数 |
| applicativeAreaInfo | ApplicativeAreaEntity | 房型适用人群信息 |
| applicativeAreaDesc | String | 适用人群描述 |
| applicativeAreaTitle | String | 适用人群标题 |
| maxQuantityPerOrder | Integer | 房型的最大预定间数 |
| PersonPrice | PersonPriceEntity | 多人房价相关信息 |
| RateId | String | 用于计算海外多人房价的RateId |
| Adult | Integer | 用于计算海外多人房价的成人数 |

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| nationalityRestrictionInfo | NationalityRestrictionType | 国籍限制信息 |
| allowCountryCodeList | List<string> | 仅允许预订的国籍二字码列表(白名单) |
| blockCountryCodeList | List<string> | 禁止预订的国籍二字码列表(黑名单) |
| dailyRates | List<DailyRatesEntity> | 每日房价 |
| roomStatus | String | 每日房态 G:良好 L:不可超 U:未知 S:紧张 W:无房 N:满房 |
| effectDate | String | 房价日期 |
| salePriceIncludeTax | BigDecimal | 售价金额(含税) |
| originPrice | PriceEntity | 房价金额(原币种) |
| price | BigDecimal | 金额 |
| currency | String | 币种 |
| customPrice | PriceEntity | 房价金额(配置币种) |
| price | BigDecimal | 金额 |
| currency | String | 币种 |
| customTotalDiscountedPric<br>e | PriceEntity | 当日所有促销活动总优惠金额(配置币种) |
| price | BigDecimal | 金额 |
| currency | String | 币种 |
| originTotalDiscountedPrice | PriceEntity | 当日所有促销活动总优惠金额(房型原币种) |
| price | BigDecimal | 金额 |
| currency | String | 币种 |
| meals | Integer | 餐⻝份数 |
| holdRoomQuantity | Integer | 保留房可房型数量; |
| avgOriginPrice | PriceEntity | 不含税房型均价(原币种) |
| price | BigDecimal | 金额 |
| currency | String | 币种 |
| avgOriginPriceIncludeTax | PriceEntity | 含税房型均价(原币种) |
| price | BigDecimal | 金额 |
| currency | String | 币种 |
| avgCustomPrice | PriceEntity | 不含税房型均价(配置币种) |

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| price | BigDecimal | 金额 |
| currency | String | 币种 |
| avgCustomPriceIncludeTax | PriceEntity | 含税房型均价(配置币种) |
| price | BigDecimal | 金额 |
| currency | String | 币种 |
| xDaysXRoomsTotalOriginPrice | PriceEntity | 多间多天总价(原币种) |
| price | BigDecimal | 金额 |
| currency | String | 币种 |
| xDaysXRoomsTotalCustomPri<br>ce | PriceEntity | 多间多天总价(配置币种) |
| price | BigDecimal | 金额 |
| currency | String | 币种 |
| xDaysXRoomsTotalOriginPrice<br>IncludeTax | PriceEntity | 多间多天含税总价(原币种) |
| price | BigDecimal | 金额 |
| currency | String | 币种 |
| xDaysXRoomsTotalCustomPri<br>ceIncludeTax | PriceEntity | 多间多天含税总价(配置币种) |
| price | BigDecimal | 金额 |
| currency | String | 币种 |
| invoiceInfo | InvoiceEntity | 发票信息 |
| hasSpecialInvoice | Boolean | 是否支持开专票(大系统返回节点,表示房型原始配置) |
| addPriceRoom | Boolean | 是否加价开专票房型 |
| hourlyRoom | Boolean | 是否为钟点房 |
| hourlyRoomInfo | HourlyRoomEntity | 钟点房信息 |
| duration | Integer | 连住的时⻓ |
| intervalStartTime | Integer | 钟点房入住时间区间开始时间(分钟数,例如540表示早上9<br>点,预定端在显示的时候除60) |
| intervalEndTime | Integer | 钟点房入住时间区间截止时间(分钟数,例如540表示早上9<br>点,预定端在显示的时候除60) |
| hourlyRoomTips | String | 钟点房提示话术 |
| roomStaticInfo | RoomStaticInfoEntity | 房型静态信息 |

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| nonSmokeDesc | String | 无烟信息描述 |
| bedInfoList | List<BedInfoEntity> | 房间里面所有床型信息 |
| parentBedTypeId | Integer | 父床型Id,含义请参考文档:http://conf.ctripcorp.com/page<br>s/viewpage.action?pageId=307466693 |
| parentBedTypeName | String | 父床型名称 |
| childBedInfoList | List<ChildBedInfoEntity> | 子床型列表 |
| childBedTypeId | Integer | 子床型Id,含义请参考文档:http://conf.ctripcorp.com/page<br>s/viewpage.action?pageId=307466693 |
| childBedTypeName | String | 子床型名称 |
| bedCount | Integer | 几张床 |
| bedWidth | Float | 床宽 |
| bedWidthRangeInfo | BedWidthRangeInfoEntity | 床宽范围(一般情况下没有值,只有像床宽不定的时候才有<br>值;例如:特大床) |
| maxValue | Float | 床宽最大值 |
| minValue | Float | 床宽最小值 |
| unit | String | 床宽最大、小值的单位 |
| bedWidthDesc | String | 床宽范围描述 |
| windowInfo | WindowInfoEntity | 窗型信息 |
| windowTypeName | String | 窗型名称 |
| windowType | Integer | 窗型Id 0:无窗 1:部分无窗 2:有窗 4:窗户位于走廊或过道 5:天<br>窗 6:有窗户但不能打开通⻛ 7:飘窗 8:落地窗 9: 装饰性假窗 1<br>0:窗户较小 11:窗户有墙体或遮挡 12:部分内窗 13:部分天窗1<br>4:部分封闭窗15:部分窗户较小 16:部分窗外有墙体或遮挡17:<br>部分装饰性假窗18:部分飘窗19:部分落地窗 |
| complicatedBedInfo | ComplicatedBedInfoType | 复杂床型信息(非必须,如果为空可以展示为未知) |
| bedTypeDesc | String | 床型描述 |
| bedDetailDesc | String | 浮层上的描述信息(附带床宽) |
| icon | String | 图片 |
| roomBedInfoList | List<RoomBedInfoType> | 复杂床型结构(支持或&和)的床型描述 |
| roomName | String | 房间名 |
| roomType | Integer | 房间类型 |
| bedGroupList | List<BedGroupInfoType> | 床的结构化信息,同一个group中表示和的关系,不同group中<br>是或的关系 |

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| subBedInfoList | List<SubBedInfoType> |  |
| bedName | String | 床型名称 |
| bedWidth | Float | 床宽 |
| bedCount | Integer | 床的数量 |
| bedIconUrl | String | 床型IconUrl |
| bedDesc | String | 床型描述 |
| bedId | Integer | 床型Id |
| bedWidthRang<br>eInfo | BedWidthInfoType | 床宽范围,仅在少数场景有值,如床宽不是固定值的情况 |
| maxValue | Float | 床宽最大值 |
| minValue | Float | 床宽最小值 |
| unit | String | 床宽最大、小值的单位 |
| bedWidthDe<br>sc | String | 床宽范围描述 |
| specialNoticeList | List<SpecialNoticeType> | 房型特别提示列表(原部分房型名称的RC描述) |
| noticeType | String | 提示类型 |
| noticeValue | String | 提示内容 |
| SmokeInfo | SmokeInfoEntity | 烟信息 |
| SmokeDesc | String | 烟信息描述 |
| SmokeType | Integer | 吸烟类型,允许抽烟-1;禁止抽烟-2;未知-0; |
| HasNonSmokeRoom | String | 是否有无烟房,T有,F没有 |
| HasRoomInNonSmokeAre<br>a | String | 是否可安排无烟楼层,T可安排,F不可安排 |
| HasSmokeCleanRoom | String | 是否可无烟处理,T可无烟处理,F不可无烟处理 |
| NoNonSmokeRoom | String | 是否无法安排无烟 |
| serviceChargeInfo | ServiceChargeInfo | 前收服务费(默认支付类型为公付) |
| customChargePrice | PriceEntity | 配置币种服务费总额 |
| price | BigDecimal | 金额 |
| currency | String | 币种 |
| customChargePricePerUnit | PriceEntity | 前收服务费金额·每收费单位(按成交金额比例收费时,输出平<br>均每间夜金额) |

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| price | BigDecimal | 金额 |
| currency | String | 币种 |
| customChargePricePerRoo<br>mNights | PriceEntity | 前收服务费金额·每间夜 |
| price | BigDecimal | 金额 |
| currency | String | 币种 |
| ServiceChargeDetailInfoLis<br>t | List<ServiceChargeDetailInfoType> | 服务费明细列表 |
| ChargeType | String | 服务费类型(ORDINARY:普通服务费,OUT_WORK_TIME特<br>殊服务费-非工作时间,VIP_BOOKING:Offline特殊服务费-VIP<br>预订) |
| ChargingStrategy | string | 服务费收费策略(BY_AMOUNT:以成交金额的固定比率收取<br>服务费 BY_BOOKING:以每张订单收取服务费 BY_ROOM_Q<br>UANTITY:以每间房收取服务费 BY_ROOM_NIGHTS:以每<br>间夜收取服务费) |
| CustomChargePrice | PriceEntity | 结算币种前收服务费总额 |
| price | BigDecimal | 结算币种前收服务费总额 |
| currency | String | 币种 |
| CustomChargePricePer<br>Unit | PriceEntity | 结算币种前收服务费金额·每收费单位(按成交金额比例收费<br>时,输出平均每间夜金额) |
| price | BigDecimal | 金额 |
| currency | String | 币种 |
| CustomChargePricePer<br>RoomNights | PriceEntity | 结算币种前收服务费金额·每间夜 |
| price | BigDecimal | 金额 |
| currency | String | 币种 |
| promotionsInfo | PromotionsEntity | 促销信息 |
| customAvgDiscountedPrice | PriceEntity | 所有促销活动平均优惠金额(配置币种) |
| price | BigDecimal | 金额 |
| currency | String | 币种 |
| originAvgDiscountedPrice | PriceEntity | 所有促销活动平均优惠金额(原币种) |
| price | BigDecimal | 金额 |
| currency | String | 币种 |
| customTotalDiscountedPric<br>e | PriceEntity | 所有促销活动总优惠金额(配置币种) |

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| price | BigDecimal | 金额 |
| currency | String | 币种 |
| originTotalDiscountedPrice | PriceEntity | 所有促销活动总优惠金额(原币种) |
| price | BigDecimal | 金额 |
| currency | String | 币种 |
| roomGiftInfo | List<RoomGiftEntity> | 房型礼盒信息 |
| giftName | String | 房型礼盒名称 |
| giftDesc | String | 房型礼盒描述信息 |
| startDate | Calendar | 房型礼盒有效起始时间 |
| endDate | Calendar | 房型礼盒有效截止时间 |
| promotionsInterestInfo | List<PromotionsInterestEntity> | 房型促销权益 |
| tagName | String | 促销Tag名称 |
| tagDesc | String | 促销Tag描述 |
| tagId | Integer | 促销TagId |
| promotionRule | PromotionRuleEntity | 促销规则(部分促销活动有详细规则) |
| endHour | Integer | 促销结束小时(隔夜时该值会超过24) |
| endMinute | Integer | 促销结束分钟 |
| interestInfo | List<InterestEntity> | 权益信息 |
| interestName | String | 促销权益名称 |
| interestDesc | String | DeductionTypeEnumDeductionTypeEnum 促销权益描述 |
| customAvgPromotionsP<br>rice | PriceEntity | 促销每间夜均价(配置币种) |
| price | BigDecimal | 金额 |
| currency | String | 币种 |
| originAvgPromotionsPri<br>ce | PriceEntity | 促销每间夜均价(原币种) |
| price | BigDecimal | 金额 |
| currency | String | 币种 |
| customTotalPromotions<br>Price | PriceEntity | 促销总价(配置币种) |

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| price | BigDecimal | 金额 |
| currency | String | 币种 |
| originTotalPromotionsPri<br>ce | PriceEntity | 促销总价(原币种) |
| price | BigDecimal | 金额 |
| currency | String | 币种 |
| roomMealInfo | RoomMealEntity | 房型餐⻝信息 |
| mealType | Integer | 餐⻝类型 0,无餐⻝\|1,晚餐,Dinner\|2,中餐,Lunch\|3,中晚餐,Lu<br>nch-Dinner\|4,早餐,Breakfast\|5,早晚餐,Breakfast-Dinner\|6,<br>早中餐,Breakfast-Lunch\|7,早中晚餐,Breakfast-Lunch-Dinn<br>er\|8,半餐可选餐,早餐、午餐、晚餐三选二,9,全餐 |
| roomMealDesc | List<String> | 房型餐⻝描述 |
| mealRemark | String | 餐⻝备注 |
| dailyMealInfo | List<DailyMealEntity> | 每日餐⻝信息 |
| effectDate | String | 餐⻝有效日期 |
| dailyMealInfo | List<String> | 每日餐⻝描述信息 |
| roomDescription | String | 房型描述信息 |
| floorRange | String | 楼层(中文) |
| packageRoomInfo | PackageRoomInfoType | 房型打包售卖信息 |
| packageRoom | Boolean | 是否打包售卖房型 |
| packageId | Integer | 打包售卖房型打包Id |
| packageToken | String | 打包售卖房型的打包token |
| applyForEnquiry | ApplyNoticeTipType | 询价申请 |
| title | String | 标题 |
| type | Integer | 信息类型 |
| content | String | 询价申请话术内容 |
| saleRoomTags | List<SaleRoomTagInfoType> | 售卖房型标签 |
| tagCode | String | 标签Code |
| tagDesc | String | 标签描述 |
| tagName | String | 标签名称 |
| agreementGiftInfo | AgreementGiftInfoType | 协议礼盒信息 |

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| giftToken | String | 协议礼盒token |
| roomAttributes | RoomAttributesType | 房型属性信息 |
| OnlyGroupMemberCanBook | boolean | 是否仅集团会员可以预定的会员折扣房型 |
| roomExtInfo | RoomExtInfoType | 房型扩展信息 |
| originalRoomDesc | String | 供应商原始房型描述信息 |
| roomCouponInfo | RoomCouponInfoType | 房型优惠券信息 |
| availableCoupon | List<CouponInfoType> | 房型可用的优惠券列表 |
| totalCustomAmount | PriceEntity | 优惠券可抵扣总金额 |
| price | decimal | 金额 |
| currency | String | 币种 |
| corpCouponType | String | 商旅券类型(CORP_COUPON:公司券) |
| couponEffectTime | String | 优惠券生效时间,格式:yyyyMMdd HHmmss |
| couponExpireTime | String | 优惠券失效时间,格式:yyyyMMdd HHmmss |
| couponName | String | 优惠券名称 |
| couponDesc | String | 优惠券描述 |
| bestCouponsInfo | BestCouponsInfoType | 叠加优惠券的最优组合信息 |
| allBestCouponsReceived | boolean | 是否最优券组合中所有的券均为已领取 |
| unreceivedBestCouponPr<br>omotionIDs | List<long> | 位于最优优惠券组合中,且还未被领取的优惠券id集合 |
| multiCouponTotalCusto<br>mPrice | PriceEntity | 最优的优惠券组合共同作用下总的优惠金额(结算币种) |
| price | decimal | 金额 |
| currency | String | 币种 |
| multiCouponAverageCu<br>stomPrice | PriceEntity | 最优的优惠券组合共同作用下平均每间夜的优惠金额(结算币<br>种) |
| price | decimal | 金额 |
| currency | String | 币种 |
| essentialDesc | String | 基础房型关键描述--此字段只针对会员 |
| otherDesc | String | 基础房型其他描述 |
| basicRoomStaticInfo | BasicRoomStaticInfoEntity | 基础房型静态信息 |

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| basicRoomImageUrl | List<String> | 母基础房型图片Url地址 |
| windowTypeShowInfo | WindowInfoEntity | 基础房型窗型显示信息---此信息不代表基础房型维护信息,<br>是价格下载计算而来,计算规则:只有所有子房型数据一样<br>是才返回,并且返回信息为子房型一致 |
| windowTypeName | String | 窗型名称 |
| windowType | Integer | 窗型Id 0:无窗 1:部分无窗 2:有窗 4:窗户位于走廊或过道 5:天<br>窗 6:有窗户但不能打开通⻛ 7:飘窗 |
| bedInfoList | List<BedInfoEntity> | 基础房型床型显示信息---此信息不代表基础房型维护信息,<br>是价格下载计算而来,计算规则:只有所有子房型数据一样<br>是才返回,并且返回信息为子房型一致 |
| parentBedTypeId | Integer | 父床型Id,含义请参考文档:http://conf.ctripcorp.com/page<br>s/viewpage.action?pageId=307466693 |
| parentBedTypeName | String | 父床型名称 |
| childBedInfoList | List<ChildBedInfoEntity> | 子床型列表 |
| childBedTypeId | Integer | 子床型Id,含义请参考文档:http://conf.ctripcorp.com/page<br>s/viewpage.action?pageId=307466693 |
| childBedTypeName | String | 子床型名称 |
| bedCount | Integer | 几张床 |
| bedWidth | Float | 床宽 |
| bedWidthRangeInfo | BedWidthRangeInfoEntity | 床宽范围(一般情况下没有值,只有像床宽不定的时候才有<br>值;例如:特大床) |
| maxValue | Float | 床宽最大值 |
| minValue | Float | 床宽最小值 |
| unit | String | 床宽最大、小值的单位 |
| bedWidthDesc | String | 床宽范围描述 |
| complicatedBedInfo | ComplicatedBedInfoType | 复杂床型信息(非必须,如果为空可以展示为未知) |
| bedTypeDesc | String | 床型描述 |
| bedDetailDesc | String | 浮层上的描述信息(附带床宽) |
| icon | String | 图片 |
| roomBedInfoList | List<RoomBedInfoType> | 复杂床型结构(支持或&和)的床型描述 |
| roomName | String | 房间名 |
| roomType | Integer | 房间类型 |
| bedGroupList | List<BedGroupInfoType> | 床的结构化信息,同一个group中表示和的关系,不同group中<br>是或的关系 |

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| subBedInfoList | List<SubBedInfoType> |  |
| bedName | String | 床型名称 |
| bedWidth | Float | 床宽 |
| bedCount | Integer | 床的数量 |
| bedIconUrl | String | 床型IconUrl |
| bedDesc | String | 床型描述 |
| bedId | Integer | 床型Id |
| bedWidthRangeInf<br>o | BedWidthInfoType | 床宽范围,仅在少数场景有值,如床宽不是固定值的情况 |
| maxValue | Float | 床宽最大值 |
| minValue | Float | 床宽最小值 |
| unit | String | 床宽最大、小值的单位 |
| bedWidthDesc | String | 床宽范围描述 |
| ChildrenOccupancyInfo | ChildrenOccupancyInfoEntity | 儿童入住信息 |
| Children | Integer | 可入住儿童数 |
| ChildrenMinAge | Integer | 可入住儿童最小年龄 |
| ChildrenMaxAge | Integer | 可入住儿童最大年龄 |
| minOriginPrice | PriceEntity | 起价(原币种) |
| price | BigDecimal | 金额 |
| currency | String | 币种 |
| minOriginPriceIncludeTax | PriceEntity | 含税起价(原币种) |
| price | BigDecimal | 金额 |
| currency | String | 币种 |
| minCustomPrice | PriceEntity | 起价(配置币种) |
| price | BigDecimal | 金额 |
| currency | String | 币种 |
| minCustomPriceIncludeTax | PriceEntity | 含税起价(配置币种) |
| price | BigDecimal | 金额 |
| currency | String | 币种 |

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| minPriceRoomPromotionsInfo | MinPriceRoomPromotionsEntity | 起价房型的促销信息 |
| customAvgDiscountedPrice | PriceEntity | 所有促销活动平均优惠金额(配置币种) |
| price | BigDecimal | 金额 |
| currency | String | 币种 |
| originAvgDiscountedPrice | PriceEntity | 所有促销活动平均优惠金额(原币种) |
| price | BigDecimal | 金额 |
| currency | String | 币种 |
| hotelRecommendedTags | List<HotelRecommendedTagEntity> | 酒店推荐Tag |
| tagType | String | 酒店推荐Tag类型 无 NONE,经常预订JCYD,同事喜欢TSXH,<br>公司地标 GSDB, 热⻔活动 RMHD, 人气之选 RQZX, 性价比高<br>XJBG, 政策优势 ZCYS, 商旅优选 SLYX, 顶标推荐 DBTJ, 最近<br>浏览 ZJLL |
| tagDesc | String | 酒店推荐Tag描述 |
| hotelTags | List<HotelTagInfo> | 酒店标签 |
| tagCode | String | 标签Code |
| tagDesc | String | 标签描述 |
| tagName | String | 标签名称 |
| hotelCityTimeZoneId | String | 酒店城市所在地区 时区 |
| UnavailableReasonType | UnavailableReasonType | 不可订原因 |
| UnavailableReason | String | 不可订原因 |
| UnavailableReasonDetails | List<UnavailableReasonDetailType> | 不可订明细 |
| DetailKey | String | 不可订明细名字 |
| DetailValue | String | 不可订明细内容 |
| status | ResponseStatus | 接口返回状态 |
| success | Boolean |  |
| errorCode | Integer |  |
| errorMessage | String |  |

### 示例

请求数据的JSON格式示例

{

"Auth": {
"AppKey": "***",
"Ticket": "580487ff97194e2f64000004"
},

"hotelId":374796,

"baseInfo":{

"uid":"_SL2241071731",

"corpId":"corpid",

"language":"ZH_CN"

},

"checkInDate":"2022-01-27",

"checkOutDate":"2022-01-28",

"roomQuantity":1,

"roomQuantityLimited":null,

"guestQuantity":1,

"roomFilter":null

}

返回数据的JSON格式示例

{

"hotelDetailInfo":{

"hotelBaseInfo":{

"hotelId":374796,

"hotelName":"北京什刹海皮影文化主题酒店(福禄四合院宾馆)",

"hotelPositionInfo":{

"hotelAddress":"松树街24号",

"countryInfo":{

"id":1,

"name":"中国"

},

"provinceInfo":{

"id":1,

"name":"北京"

},

"cityInfo":{

"id":1,

"name":"北京"

},

"locationInfo":{

"id":92,

"name":"⻄城区"

},

"zoneInfoList":[

{

"id":652,

"name":"后海/南锣鼓巷地区"

}

],

"coordinateInfoList":[

{

"lat":39.944956405849,

"lon":116.38888820363,

"mapType":"BAI_DU"

},

{

"lat":39.93875,

"lon":116.382478,

"mapType":"GAO_DE"

},

{

"lat":39.93875,

"lon":116.382478,

"mapType":"GOOGLE"

}

]

},

"hotelPictureInfo":{},

"hotelStarInfo":{

"starNum":4,

"iconType":"DIAMOND"

},

"hotelMedalInfo":{

"medalType":"NONE",

"score":""

},

"hotelBrandInfo":{

"brandId":0,

"groupId":0

},

"hotelContactInfo":{

"telephone":"010-83220266/83287847"

}

},

"hotelCommentInfo":{

"scoreInfo":{

"total":0.0,

"location":0.0,

"cleanliness":0.0,

"service":0.0,

"facility":0.0

},

"commenterCount":0

},

"importantNotifyInfo":[

{

"notifyId":1049169,

"notifyText":"断点",

"importantNotifyType":"CITY",

"permanent":true

},

{

"notifyId":1049466,

"notifyText":"test",

"importantNotifyType":"CITY",

"permanent":true

},

{

"notifyId":1047457,

"notifyText":"测试用",

"importantNotifyType":"CITY",

"permanent":true

},

{

"notifyId":1048910,

"notifyText":"dasda",

"importantNotifyType":"CITY",

"permanent":true

},

{

"notifyId":1047458,

"notifyText":"ssss",

"importantNotifyType":"CITY",

"permanent":true

},

{

"notifyId":1049160,

"notifyText":"大萨达",

"importantNotifyType":"CITY",

"permanent":true

},

{

"notifyId":1049171,

"notifyText":"1、<商旅大首⻚、查询⻚、列表⻚、酒店详情⻚、填写⻚>,前端入离日期可选择范围差从28增至30晚\r\n\r\n2、<商旅大首⻚、查询⻚、

列表⻚、酒店详情⻚、填写⻚>,前端提前审批,单点登录,出差申请默认带28天的场景,调整为30天\r\n\r\n如:提前审批单默认传60天,则本次最⻓可以至30

天(原先是当前日期/审批单开始时间⸺+28天)\r\n\r\n如:单点登录默认传60天,则本次最⻓的兜底逻辑,也可以延⻓至30天\r\n\r\n3、酒店查询接口、下单接

口支持30天(服务端调研下,有没有改动点)",

"importantNotifyType":"CITY",

"permanent":true

},

{

"notifyId":216,

"notifyText":"目前北京全城禁烟,酒店均为无烟房。",

"importantNotifyType":"CITY",

"permanent":true

},

{

"notifyId":1049172,

"notifyText":"123456789",

"importantNotifyType":"CITY",

"permanent":true

},

{

"notifyId":1047473,

"notifyText":"等到",

"importantNotifyType":"CITY",

"permanent":true

}

],

"hotelFacilityInfo":{

"facilityList":{

"facilityList":[]

},

"facilityDetail":{

"parkingPolicyInfo":{}

},

"nearbyFacilityGroupList":[]

},

"hotelTrafficInfoGroupList":[

{

"trafficInfoGroupName":"机场",

"trafficInfoGroupType":"AIRPORT",

"trafficInfoList":[

{

"landMarkName":"南苑机场",

"trafficInfoDes":"距酒店16.4公里(步行约0分钟)"

},

{

"landMarkName":"首都国际机场T3航站楼",

"trafficInfoDes":"距酒店29.0公里(驾⻋约33分钟)"

}

]

},

{

"trafficInfoGroupName":"火⻋站",

"trafficInfoGroupType":"RAILWAY_STATION",

"trafficInfoList":[

{

"landMarkName":"北京火⻋站",

"trafficInfoDes":"距酒店8.1公里(驾⻋约35分钟)"

},

{

"landMarkName":"北京北站",

"trafficInfoDes":"距酒店4.6公里(驾⻋约23分钟)"

}

]

},

{

"trafficInfoGroupName":"市中心",

"trafficInfoGroupType":"CITY_CENTER",

"trafficInfoList":[

{

"landMarkName":"平安里",

"trafficInfoDes":"距酒店1.7公里(驾⻋约2分钟)"

},

{

"landMarkName":"北海北",

"trafficInfoDes":"距酒店0.9公里(步行约14分钟)"

}

]

}

],

"hotelIntroductionInfo":{

"hotelOpenRenovationDesc":"2011年开业。2013年装修。",

"hotelBaseInfoDesc":{

"title":"基本信息",

"content":"2011年开业&nbsp;&nbsp;2013年装修&nbsp;&nbsp;25间房&nbsp;&nbsp;电话:010-83220266/83287847&nbsp;&nbsp;"

},

"hotelIntroductionInfo":{

"title":"酒店介绍",

"content":"北京什刹海皮影文化主题酒店(福禄四合院宾馆)是中国唯一一家结合剧院与住宿的文化精品酒店,客人可在酒店欣赏皮影戏表演并与著名

的皮影艺术家进行互动并学习皮影艺术。<br><br>极简主义的客房及大厅提供无线互联网连接。从酒店步行5分钟就能抵达著名的后海区,距离机场仅30分钟⻋

程,可步行到达北海北地铁站(6号线)和平安里地铁站(4号线),可方便到达京城各处的名胜古迹:北海,南锣鼓巷,恭王府,后海酒吧街,天安⻔,故宫等。

<br><br>酒店设有24小时前台服务、订票服务、自行⻋出租服务,机场接送服务及北京景区游览包⻋服务,此外还供应每日报纸。<br>"

}

},

"hotelPolicyInfo":{

"arrivalAndDeparture":{

"arrivalDesc":"入住时间:14:00后",

"departureDesc":"退房时间:0:00至12:00"

},

"childAndAddBed":{

"childLimitRule":"酒店不允许携带儿童入住",

"addBedRule":{

"baseInfoDesc":"",

"chargeDescList":[]

}

},

"mealPolicy":{

"breakfastStyle":"自助餐",

"breakfastPrice":"¥60.00",

"openTime":[]

},

"petPolicy":"不可携带宠物。",

"creditCardInfo":[

{

"creditCardName":"万事达(Master)",

"creditCardIconUrl":"//pic.c-ctrip.com/creditcard/pic_25.png"

},

{

"creditCardName":"威士(VISA)",

"creditCardIconUrl":"//pic.c-ctrip.com/creditcard/pic_26.png"

},

{

"creditCardName":"运通(AMEX)",

"creditCardIconUrl":"//pic.c-ctrip.com/creditcard/pic_30.png"

},

{

"creditCardName":"大来(Diners Club)",

"creditCardIconUrl":"//pic.c-ctrip.com/creditcard/pic_29.png"

},

{

"creditCardName":"JCB",

"creditCardIconUrl":"//pic.c-ctrip.com/creditcard/pic_28.png"

},

{

"creditCardName":"国内发行银联卡",

"creditCardIconUrl":"//pic.c-ctrip.com/creditcard/pic_27.png"

}

]

},

"reservationNoticeTip":[

{

"title":"入住方式",

"type":8,

"noticeTipDetail":[

{

"noticeTipSummary":[],

"noticeTipItem":[

{

"content":"请到前台领取钥匙/⻔卡,地址:374796Address"

},

{

"content":"住宿方会在你入住前提供详细说明,地址:374796Address"

}

]

}

]

},

{

"title":"城市通知",

"type":13,

"noticeTipDetail":[

{

"noticeTipSummary":[],

"noticeTipItem":[

{

"content":"断点"

},

{

"content":"test"

},

{

"content":"测试用"

},

{

"content":"dasda"

},

{

"content":"ssss"

},

{

"content":"大萨达"

},

{

"content":"1、<商旅大首⻚、查询⻚、列表⻚、酒店详情⻚、填写⻚>,前端入离日期可选择范围差从28增至30晚\r\n\r\n2、<商旅大首⻚、

查询⻚、列表⻚、酒店详情⻚、填写⻚>,前端提前审批,单点登录,出差申请默认带28天的场景,调整为30天\r\n\r\n如:提前审批单默认传60天,则本次最⻓

可以至30天(原先是当前日期/审批单开始时间⸺+28天)\r\n\r\n如:单点登录默认传60天,则本次最⻓的兜底逻辑,也可以延⻓至30天\r\n\r\n3、酒店查询接

口、下单接口支持30天(服务端调研下,有没有改动点)"

},

{

"content":"目前北京全城禁烟,酒店均为无烟房。"

},

{

"content":"123456789"

},

{

"content":"等到"

}

]

}

]

}

]

},

"ResponseStatus":{

"Timestamp":"/Date(1643262429293+0800)/",

"Ack":"Success",

"Errors":[],

"Extension":[]

},

"status":{

"success":true,

"errorCode":10899000,

"errorMessage":"成功"

}

## 附录

ICode附录

| 测试环境 | 生产环境 |
| --- | --- |
| 51d32639f0fe40ca96679cac856ef911 | 51d32639f0fe40ca96679cac856ef911 |

## 错误码

| 10001 | valid field error:%s |  |
| --- | --- | --- |
| 10810002 | checkInDate非法 |  |
| 10810003 | checkOutDate非法 |  |
| 10810006 | %s invalid | bedType |
| 10810024 | checkOutDate不能早于checkInDate |  |
| 10810026 | checkInDate不能为空 |  |
| 10810027 | checkOutDate不能为空 |  |
| 10899000 | 成功 |  |
| -2 | auth fail | ticket验证失败 |

### 版本

| 版本号 | 编写日期 | 更改内容 | 作者 |
| --- | --- | --- | --- |
| V1.1 | 2022/01/27 | 增加请求返回报文JSON示例 | ⻩华 |
| V1.2 | 2022/02/16 | 增加错误码附录 | ⻩华 |
| V1.3 | 2022/09/29 | 增加优惠活动类型及金额 | 符祥远 |
| V1.4 | 2024/07/30 | 新增房型特别提示列表SpecialNoticeList | 胡俊杰 |
| V1.5 | 2024/11/18 | cancelRule新增FREE_IN_X_MINUTE | 胡俊杰 |
| V1.6 | 2026/07/23 | 补充GDS子基要素新增<br>BasicRoomStaticInfo.ChildrenOccupancyInfo,RoomStaticInfo.SmokeInfo | 胡毅 |

常⻅问题

1、 为什么返回的酒店星级为0
问题:请问为什么返回数据中酒店星级为0
答复:新上架酒店或未维护评级的酒店星级
2、 为什么可预订数量(roomQuantity)是9999
问题:为什么返回的可预订数量(roomQuantity)是9999
答复:商家未维护可订房数量
3、 子房型列表列表,房型静态信息的床型信息使用说明
问题:RoomInfoList.RoomStaticInfo.BedInfoList 如何使用?
回答:根据接口提供的床型信息和床型的“与”和“或”关系,拼接父子床型;
若返回一个父床型,多个子床型,则父床型唯一,子床型以“和”连接;
若返回多个父床型,多个子床型,则父床型以“或”拼接,一个父床型中的子床型以“和”连接,不同父床型的子床型之间以“或”连接
举例如下:
父床型:大/双;子床型:1张大床或2张单人床;
父床型:多张床;子床型:1张大床和2张单人床;
4、 酒店详情接口,holdRoomQuantity的值为负数

剩余房量是负的,是保留房型,还是可以继续预定,前端文案建议展示为“房量不限制”。
5、 酒店详情接口,freeCancel传true时,返回的免费取消房型对应哪些?
freeCancel传true时,返回的免费取消房型对应哪些?
freeCancel传true时,返回包含免费取消政策的酒店房型,包括免费取消和限时取消两种。
1、cancelRule==FREE
免费取消房型
2、cancelRule==TIME_LIMIT
限时取消房型
