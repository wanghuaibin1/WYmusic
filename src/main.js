import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { NavBar, Col, Row, Search, Swipe, SwipeItem, Icon, List, Cell, Grid, GridItem, Image as VanImage, Lazyload, Form, Field, Button } from 'vant'

Vue.use(Button)
Vue.use(Form)
Vue.use(Field)
Vue.use(VanImage)
Vue.use(Grid)
Vue.use(GridItem)
Vue.use(List)
Vue.use(Search)
Vue.use(Col)
Vue.use(Row)
Vue.use(NavBar)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Icon)
Vue.use(Cell)
Vue.use(Lazyload, {
  lazyComponent: true
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
