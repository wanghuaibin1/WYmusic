import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cookie: ''// 保存登录成功后的token值
  },
  getters: {
  },
  mutations: {
    updataToken (state, val) {
      state.cookie = val
    }
  },
  actions: {

  },
  // 配置为 vuex 的插件
  plugins: [createPersistedState()],
  modules: {
  }
})
