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
          picUrl: 'https://p2.music.126.net/DEkk-OIlzDVxsoo1tW-Dug==/19035844811868074.jpg'
        },
        name: '落下(いっぱつにゅうこんver.)',
        id: 1997537240
      }
    ], // 播放列表
    rate: 50, // 播放按钮  环形进度
    songUrl: 'http://m701.music.126.net/20230316160237/bd5fcaf319dba5f67500be3d68bda964/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/4212514818/758a/87d3/2a91/c93f9324ee9c9c028bfb712192156b05.mp3', // 歌曲url
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
