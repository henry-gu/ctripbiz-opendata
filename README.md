# TripBiz Open Data Studio

本机运行的携程商旅开放数据查询工作台。首期支持：

- 国内目的地模糊查询
- 城市内关键词查询（在关键词输入框旁直接选择城市，始终使用 SuggestKeyword）
- 关键词结果按接口顺序展示名次，仅显示所选城市内的地标、商业区、地铁站与酒店；选择结果后自动带入酒店查询关键词
- SuggestDestination 模糊地点列表（地标、企业地标、百度联想）
- 酒店列表查询
- 酒店详情查询
- 品牌、商业区、地铁高级筛选数据
- 脱敏的请求与响应诊断

首期采用无数据库架构：Ticket 和查询结果只缓存在进程内，不保存查询历史或原始响应。

酒店查询默认入住日期为运行当天后 D+1，退房日期为 D+2；清空查询条件时会恢复该动态默认值。

## 开发运行

要求 Node.js 24 LTS。凭据沿用根目录 `.env` 中的 `Appkey`、`AppSecurity`、`Corpid`、`Uid`。

```bash
npm install
npm --prefix apps/api install
npm --prefix apps/web install
npm run dev
```

浏览器访问 `http://127.0.0.1:4173`。构建并以单端口运行：

```bash
npm run build
npm start
```

生产模式默认监听 `127.0.0.1:8787` 并同时托管前端静态文件。

## Windows 与运行依赖

应用不使用 SQLite、数据库服务或数据库驱动，也不会在 `data` 目录保存查询历史。运行时只需要普通用户权限和 Node.js 24：解压免安装版 Node.js 到用户目录后即可运行，不需要管理员权限，也不需要单独安装 SQLite。

首次安装依赖并构建：

```powershell
npm install
npm --prefix apps/api install
npm --prefix apps/web install
npm run build
npm start
```

关闭进程后，Ticket、缓存的基础数据和酒店查询结果都会自动清空。

接口文档来源：https://openapi.ctripbiz.com/#/index
