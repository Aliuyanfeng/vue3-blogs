import { createRouter, createWebHashHistory, RouteRecordRaw, createWebHistory } from 'vue-router'

const modules = import.meta.glob('../views/*/*.vue');

const routes = [
  // 首页
  {
    path: '/',
    name: 'Home',
    // component: () => import('../views/Home.vue'),
    component:modules['../views/Home/Home.vue']
  },
  // demo
  {
    path: '/demo',
    name: 'Demo',
    // component: () => import('../views/Demo/demo.vue')
    component:modules['../views/Demo/demo.vue']
  },
  // 文章详情
  {
    path: '/articleDetail/:id',
    name: 'articleDetail',
    // component: () => import('../views/Article/articleDetail.vue')
    component:modules['../views/Article/articleDetail.vue']
  },
  // 归档
  {
    path: '/Archive',
    name: 'Archive',
    // component: () => import('../views/Archive/Archive.vue')
    component:modules['../views/Archive/Archive.vue']
  },
   // 文章列表
   {
    path: '/ArticleList',
    name: 'ArticleList',
    // component: () => import('../views/ArticleList/ArticleList.vue')
    component:modules['../views/ArticleList/ArticleList.vue']
  },
   // 笔记
  {
    path: '/Note',
    name: 'Note',
    // component: () => import('../views/Note/Note.vue')
    component:modules['../views/Note/Note.vue']
  },
  // 404
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    // component: () => import('../views/error/404.vue')
    component:modules['../views/error/404.vue']
  },
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
})

export default router
