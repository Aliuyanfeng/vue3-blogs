# Vue 3 + Typescript + Vite

***个人博客vue3+ts+vite构建***

**运行项目流程**
- npm install / npm i
- npm run dev
- 默认端口8080
- 默认代理到localhost:3000,本地后台移步[博客后台](https://github.com/Aliuyanfeng/express-blog)

# 接口计划表
|接口路径|方法|参数|是否需要权限|完成情况|备注|
--------|----|---|:----:|:------:|----------|
|/getArticleList|get|page|否|😄|首页文章列表
|/getBaseInfo|get|无|否|😐|首页基础信息接口




## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's `.vue` type support plugin by running `Volar: Switch TS Plugin on/off` from VSCode command palette.
