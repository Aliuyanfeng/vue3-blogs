import { createRouter,createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes = [
  // {
  //   path: '/home',
  //   name: 'Home',
  //   component: () => import('../views/Home.vue')
  // },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
