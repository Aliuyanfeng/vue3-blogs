# Vue 3 + Typescript + Vite

***个人博客vue3+ts+vite构建***

**运行项目流程**
- npm install / npm i
- npm run dev
- 默认端口8080
- 默认代理到localhost:3000,本地后台移步[博客后台](https://github.com/Aliuyanfeng/express-blog)

## 接口计划表
|接口路径|方法|参数|是否需要权限|完成情况|备注|
--------|----|---|:----:|:------:|----------|
|/getArticleList|get|page,limit,type|否|😄|首页文章列表
|/getBaseInfo|get|无|否|😄|首页基础信息接口
|/login|get|无|否|😄|测试登录接口后续增加JWT
|/getInfo|get|无|否|😄|测试获取信息接口
|/addArticle|post|form|否|😄|添加文章
|/updateArticle|post|id|否|😄|更新文章
|/deleteArticle|post|id|否|😄|删除文章
|/getArticleDetail|get|id|否|😄|获取文章详情
|/getAllAuthor|get|无|否|😄|获取所有文章作者
|/getAllAuthor|get|无|否|😄|获取所有文章作者
|/getAllAuthor|get|无|否|😄|获取所有文章作者
|/getAllAuthor|get|无|否|😄|最终测试



## 开发计划表
### 预计完成时间12-05
- 访客端
    1. 增加文章查看页 
    2. 优化样式
    3. 完善新接口对接工作
- 服务端
    1. 增加获取指定文章接口可用于访客端查看文章和总后台编辑文章
    2. 增加分类表，获取所有分类数据接口
- 总后台
    1. 增加获取指定文章接口，对接接口
    2. 完善开发环境和生产环境的配置






