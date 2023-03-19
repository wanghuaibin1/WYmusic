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
    component: () => import('@/components/itemMusic'),
    redirect: '/musicitem',
    children: [
      {
        path: '/musicitem',
        component: () => import('@/components/itemMusic/MusicItem.vue')
      },
      {
        path: '/comment',
        component: () => import('@/components/itemMusic/commentOn.vue')
      }
    ]
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
  const cookie = store.state.cookie
  if (cookie) {
    if (!store.state.user) {
      store.dispatch('userItem')
    }
    next()
  } else {
    console.log(2)
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  }
  if (to.path === '/login') {
    store.commit('updataMusicBroadcast', false)
    next()
  } else {
    store.commit('updataMusicBroadcast', true)
  }
  next()
})

export default router
