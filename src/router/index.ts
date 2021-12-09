import { createRouter,createWebHashHistory, RouteRecordRaw,createWebHistory } from 'vue-router'


const routes = [
  // 首页
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/about.vue')
  },
  // 文章详情
  {
    path: '/articleDetail',
    name: 'articleDetail',
    component: () => import('../views/articleDetail.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
})

export default router
