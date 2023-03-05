import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [

  {
    path: '/layout',
    component: () => import('@/views/Layout')
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

export default router
