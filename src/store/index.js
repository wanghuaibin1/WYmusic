import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cookie: '', // 保存登录成功后的token值
    user: '', // 用户信息
    playList: [
      {
        al: {
          picUrl: 'https://p1.music.126.net/Eg4cy0_HIF2nrX2gMCsWkQ==/17967119509636556.jpg'

        },
        name: '借我',
        id: 408814900
      }

    ], // 播放列表
    rate: 50, // 播放按钮  环形进度
    broadcast: false, // 播放/暂定切换
    playListIndex: 0 // 默认播放下标
  },
  getters: {
  },
  mutations: {
    // 登录获取cookie
    updataCookie (state, val) {
      state.cookie = val
    },
    // 改变用户信息
    usernformation (state, val) {
      state.user = val
    },
    // 改变播放状态
    updataBroadcast (state, val) {
      state.broadcast = val
    },
    // 改变播放列表
    updataplayList (state, val) {
      state.playList = val
    },
    // 改变播放下标
    updataplayListIndex (state, val) {
      state.playListIndex = val
    }
  },
  actions: {

  },
  // 配置为 vuex 的插件
  plugins: [createPersistedState()],
  modules: {
  }
})
