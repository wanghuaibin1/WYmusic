import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '' // 保存登录成功后的token值
  },
  getters: {
  },
  mutations: {
    updataToken (state, val) {
      state.token = val
    }
  },
  actions: {
  },
  modules: {
  }
})
