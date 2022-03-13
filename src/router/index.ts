import { createRouter, createWebHashHistory, RouteRecordRaw, createWebHistory } from 'vue-router'
import { string } from 'vue-types';

const modules = import.meta.glob('../views/*/*.vue');

const routes = [
  // 首页
  {
    path: '/',
    name: 'Home',
    // component: () => import('../views/Home.vue'),
    component: modules['../views/Home/Home.vue'],
    meta: { title: '首页' },
  },
  // demo
  {
    path: '/demo',
    name: 'Demo',
    // component: () => import('../views/Demo/demo.vue')
    component: modules['../views/Demo/demo.vue'],
    meta: { title: 'Socket Demo' },
  },
  // 文章详情
  {
    path: '/articleDetail/:id',
    name: 'articleDetail',
    // component: () => import('../views/Article/articleDetail.vue')
    component: modules['../views/Article/articleDetail.vue']
  },
  // 归档
  {
    path: '/Archive',
    name: 'Archive',
    // component: () => import('../views/Archive/Archive.vue')
    component: modules['../views/Archive/Archive.vue'],
    meta: { title: '归档' },
  },
  // 文章列表
  {
    path: '/ArticleList',
    name: 'ArticleList',
    // component: () => import('../views/ArticleList/ArticleList.vue')
    component: modules['../views/ArticleList/ArticleList.vue'],
    meta: { title: '文章列表' },
  },
  // 笔记
  {
    path: '/Note',
    name: 'Note',
    // component: () => import('../views/Note/Note.vue')
    component: modules['../views/Note/Note.vue'],
    meta: {
      title: '笔记'
    },
    beforeEnter: (to: any, from: any) => {
      //to是当用户点击进入当前页面的时候,我们可以进行一些拦截设置
      //from当来自其他页面进入当前页面的时候，我们也可以进行拦截提示用户
      if (to.meta.title) {
        document.title = to.meta.title
      }
    }
  },
  // 题库
  {
    path: '/questionBank',
    name: 'QuestionBank',
    component: modules['../views/QuestionBank/QuestionBank.vue'],
    meta: { title: '题库' },
  },
  // 答题页
  {
    path: "/exam",
    name: 'Exam',
    component: modules['../views/QuestionBank/Exam.vue'],
    meta: { title: '答题页' },
  },
  // 404
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    // component: () => import('../views/error/404.vue')
    component: modules['../views/error/404.vue'],
    meta: {
      title: '走丢了┭┮﹏┭┮'
    },
  },
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
})

// 路由守卫
router.beforeEach((to, from) => {
  // 返回 false 以取消导航
  if (to.meta.title) {
    (<any>document).title = to.meta.title
  }
})


export default router
