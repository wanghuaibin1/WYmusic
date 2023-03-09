import Vue from 'vue'
import { NavBar, Col, Row, Search, Swipe, SwipeItem, Icon, List, Cell, Grid, GridItem, Image as VanImage, Lazyload, Form, Field, Button, NoticeBar, Sticky, Popup, Loading, Toast, Tabbar, TabbarItem } from 'vant'

Vue.use(Toast)
Vue.use(Loading)
Vue.use(Popup)
Vue.use(Sticky)
Vue.use(NoticeBar)
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

Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Lazyload, {
  lazyComponent: true
})