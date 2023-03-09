import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cookie: '', // 保存登录成功后的token值
    user: '' // 用户信息
  },
  getters: {
  },
  mutations: {
    updataCookie (state, val) {
      state.cookie = val
    },
    usernformation (state, val) {
      state.user = val
    }
  },
  actions: {

  },
  // 配置为 vuex 的插件
  plugins: [createPersistedState()],
  modules: {
  }
})
