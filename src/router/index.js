import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/views/Layout'),
    redirect: '/find',
    children: [
      {
        path: 'find',
        component: () => import('@/components/find')
      }
    ]
  },
  {
    path: '/search',
    component: () => import('@/components/earchPage')
  },
  {
    path: '/itemmusic',
    component: () => import('@/components/itemMusic')
  },
  {
    path: '/login',
    component: () => import('@/views/Login')
  }
]

const router = new VueRouter({
  routes
})
// 全局路由守卫
router.beforeEach((to, from, next) => {
  // 判断是否有cookie值，没用就代表没登录，强制跳到登录页
  const cookie = store.state.cookie
  // 没用登录 判断去的页面是否是登录页，不是就强制跳到登录页
  if (!cookie) {
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  }
  next()
})

export default router
