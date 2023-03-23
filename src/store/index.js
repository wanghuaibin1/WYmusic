import Vue from 'vue'
import Vuex from 'vuex'
import { songUrlAPI } from '@/api'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)
const getDefaultState = () => {
  return {
    cookie: '', // 保存登录成功后的token值
    user: {}, // 用户信息
    playList: [
      {
        al: {
          picUrl: 'https://p2.music.126.net/KS0TddHKX8c3atG3CkmdUw==/109951166264542938.jpg'
        },
        ar: [
          { name: '张杰' }
        ],
        name: '然后我们成了想成为的人',
        id: 1868206871
      }
    ], // 播放列表
    rate: 50, // 播放按钮  环形进度
    songUrl: 'http://m8.music.126.net/20230321231003/0d35e53c5219d2bfdc400742227e5471/ymusic/obj/w5zDlMODwrDDiGjCn8Ky/13398460788/ba7d/72bb/768d/623713f752392481e1f7750fb9eb66d0.mp3', // 歌曲url
    broadcast: true, // 播放/暂定切换
    playListIndex: 0, // 默认播放下标
    musicBroadcast: true, // 底部播放栏显示与隐藏
    SongDetails: false // 歌曲详情
  }
}
export default new Vuex.Store({
  state: getDefaultState(),
  getters: {
  },
  mutations: {
    RESET_STATE (state) {
      Object.assign(state, getDefaultState())
    },
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
    },
    // 改变当前播放音乐url
    updataSongUrl (state, val) {
      state.songUrl = val
    },
    updataMusicBroadcast (state, val) {
      state.musicBroadcast = val
    },
    updateSongDetails (state) {
      state.SongDetails = !state.SongDetails
    }
  },
  actions: {
    resetState ({ commit }) {
      commit('RESET_STATE')
    },
    // 获取歌曲url
    async songUrlApi (context) {
      const { data: res } = await songUrlAPI({ id: context.state.playList[context.state.playListIndex].id, level: 'standard' })
      context.commit('updataSongUrl', res.data[0].url)
    },
    // 用户信息
    userItem (context) {
      const user = JSON.parse(localStorage.getItem('user'))
      context.commit('usernformation', user)
    }
  },
  // 配置为 vuex 的插件
  plugins: [createPersistedState({
    storage: window.localStorage,
    reducer (val) {
      return {
        cookie: val.cookie,
        user: val.user
      }
    }
  })],
  modules: {
  }
})
