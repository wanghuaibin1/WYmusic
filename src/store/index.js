import Vue from 'vue'
import Vuex from 'vuex'
import { songUrlAPI, lyricAPI } from '@/api'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)
const getDefaultState = () => {
  return {
    cookie: '', // 保存登录成功后的token值
    user: {}, // 用户信息
    playList: [
      {
        al: {
          picUrl: 'https://p1.music.126.net/MPhzdLs1oleS5Mh_iNuHLA==/109951166580198690.jpg'
        },
        ar: [
          { name: '梁博' }
        ],
        name: '男孩(Live)',
        id: 467952048
      }
    ], // 播放列表
    rate: 50, // 播放进度
    songUrl: 'http://m801.music.126.net/20230323161503/f510fc1959aa2d5d30ca8a97151337dc/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/14096589288/f706/7c1a/9f8d/9b443c8a3ca914d1b0a37f9b622f62ba.mp3', // 歌曲url
    broadcast: true, // 播放/暂定切换
    playListIndex: 0, // 默认播放下标
    musicBroadcast: true, // 底部播放栏显示与隐藏
    SongDetails: false, // 歌曲详情
    lyric: {}, // 歌词枚举对象(需要在js拿到歌词写代码处理后, 按照格式保存到这个对象)
    curLyric: '', // 当前显示哪句歌词
    lastLy: '' // 记录当前播放歌词
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
    },
    updatelyric (state, val) {
      state.lyric = val
    },
    updateCurLyric (state, val) {
      state.curLyric = val
    },
    updateLastLy (state, val) {
      state.lastLy = val
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
    },
    formatLyr (context, lyricStr) {
      // 可以看network观察歌词数据是一个大字符串, 进行拆分.
      const reg = /\[.+?\]/g //
      const timeArr = lyricStr.match(reg) // 匹配所有[]字符串以及里面的一切内容, 返回数组
      // console.log(timeArr) // ["[00:00.000]", "[00:01.000]", ......]
      const contentArr = lyricStr.split(/\[.+?\]/).slice(1) // 按照[]拆分歌词字符串, 返回一个数组(下标为0位置元素不要,后面的留下所以截取)
      // console.log(contentArr)
      const lyricObj = {} // 保存歌词的对象, key是秒, value是显示的歌词
      timeArr.forEach((item, index) => {
        // 拆分[00:00.000]这个格式字符串, 把分钟数字取出, 转换成秒
        const ms = item.split(':')[0].split('')[2] * 60
        // 拆分[00:00.000]这个格式字符串, 把十位的秒拿出来, 如果是0, 去拿下一位数字, 否则直接用2位的值
        const ss = item.split(':')[1].split('.')[0].split('')[0] === '0' ? item.split(':')[1].split('.')[0].split('')[1] : item.split(':')[1].split('.')[0]
        // 秒数作为key, 对应歌词作为value
        lyricObj[ms + Number(ss)] = contentArr[index]
      })
      // 返回得到的歌词对象(可以打印看看)
      console.log(lyricObj)
      context.commit('updateCurLyric', lyricObj[0])
      return lyricObj
    },
    async songlyric (context) {
      const { data: res } = await lyricAPI({ id: context.state.playList[context.state.playListIndex].id })
      context.commit('updatelyric', await this.dispatch('formatLyr', res.lrc.lyric))
      // console.log(context.state.lyric)
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
