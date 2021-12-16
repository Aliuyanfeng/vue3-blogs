import { createRouter,createWebHashHistory, RouteRecordRaw,createWebHistory } from 'vue-router'


const routes = [
  // 首页
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  // demo
  {
    path: '/demo',
    name: 'Demo',
    component: () => import('../views/demo.vue')
  },
  // 房间列表
  {
    path: "/roomList",
    name: "roomList",
    component:() => import('../views/roomList.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/about.vue')
  },
  // 文章详情
  {
    path: '/articleDetail/:id',
    name: 'articleDetail',
    component: () => import('../views/articleDetail.vue')
  },
  // 归档
  {
    path: '/Archive',
    name: 'Archive',
    component: () => import('../views/Archive/Archive.vue')
  },
  // 404
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/error/404.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
})

export default router
