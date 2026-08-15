# 获取Ticket接口V1.0

1.接口方

2.接口契

更新时间:2023-12-29 16:01:16

3.调用方

## 附录

| 契约 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1. 接口方法说明 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 调用地址: |  |  | 测试环境:https://gateway.fat.ctripqa.com/SwitchAPI/Order/Ticket<br>生产环境:https://ct.ctrip.com/SwitchAPI/Order/Ticket |  |  |  |  |  |  |  |  |  |  |  |
| 调用方式: |  |  | https + post |  |  |  |  |  |  |  |  |  |  |  |
| 方法名: |  |  | Ticket |  |  |  |  |  |  |  |  |  |  |  |
| 描述: |  |  | 进行商旅身份认证获取Ticket(有效时间为2个小时。如2个小时内有使用该ticket, 那么有效时间将往后延<br>迟2小时。如2小时之内未使用该ticket,则需要重新获取ticket.) |  |  |  |  |  |  |  |  |  |  |  |
| 参数: |  |  | appKey ,appSecurity |  |  |  |  |  |  |  |  |  |  |  |
| 参数类型: |  |  | String |  |  |  |  |  |  |  |  |  |  |  |
| 2. 接口契约说明 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 2.1 请求契约 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 无 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 字段 |  |  | 类型 |  | 描述 |  |  | 默认值 |  |  | 可为空 |  | 备注 |  |
| appKey |  |  | String |  | 接入账号 |  |  |  |  |  | N |  | 由携程分配给客户公司 |  |
| appSecurity |  |  | String |  | 接入密码 |  |  |  |  |  | N |  | 由携程分配给客户公司 |  |
| 2.2 返回契约 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| TicketResponse |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 字段 | 类型 |  |  |  |  | 描述 |  |  |  | 默认值 |  | 可为空 |  | 备注 |
| Ticket | String |  |  |  |  | 令牌 |  |  |  |  |  | N |  | 用于后续接口访问 |
| Status | ResponseStatus |  |  |  |  | 返回状态 |  |  |  |  |  | N |  | ⻅下表描述 |
| ResponseStatus |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 字段 |  | 类型 |  | 描述 |  |  | 默认值 |  | 可为空 |  | 备注 |  |  |  |
| Success |  | Bool |  | 是否调用成功 |  |  |  |  | N |  | true:调用成功 false:调用失败 |  |  |  |
| Message |  | String |  | 错误消息 |  |  |  |  | Y |  |  |  |  |  |
| ErrorCode |  | Int |  | 错误编号 |  |  |  |  | N |  | 正确为0;其他编号为错误具体参照附录 |  |  |  |
| 3. 调用方法及代码示例 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 该接口只支持json方式调用,请求地址为:https://ct.ctrip.com/SwitchAPI/Order/Ticket |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 3.1 json调用示例代码 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| String url = "ticket接口url";<br>String postString = "{ \"appKey\": \"接入账户\", \"appSecurity\": \"接入密码\"}";<br>String result = PostData (url, postString); |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 3.2 json请求及响应示例 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 请求参数:<br>{"appKey": "***","appSecurity": "***"}<br>响应结果:<br>{<br>"TicketResult": {<br>"Status": { |  |  |  |  |  |  |  |  |  |  |  |  |  |  |

版本

| "ErrorCode": 0,<br>"Message": null,<br>"Success": true<br>},<br>"Ticket": "5624921ce8****25dc000001"<br>}<br>} |  |  |  |  |
| --- | --- | --- | --- | --- |
| 附录 |  |  |  |  |
| Error Code | Message |  |  | Success |
| 0 |  |  |  | true |
| 10301055 | 接入账户不能为空 |  |  | fasle |
| 10301016 | 身份校验失败 |  |  | false |
| 5002 | 此接口您无权访问 |  |  | false |
| 5003 | 您IP不能访问此接口 |  |  | false |
| 5004 | 身份验证失败 |  |  | false |
| 5005 | 非对接客户 |  |  | false |
| 5006 | 密码错误 |  |  | false |
| 版本 |  |  |  |  |
| 版本号 |  | 编写日期 | 更改内容 |  |
| V1.0 |  | 2023/12/29 | 初稿 |  |

契约

1.接口方

2.接口契

3.调用方

## 附录

版本
