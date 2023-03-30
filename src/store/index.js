import Vue from 'vue'
import Vuex from 'vuex'
import { songUrlAPI, lyricAPI, songdateilAPI } from '@/api'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)
const getDefaultState = () => {
  return {
    cookie: '', // 保存登录成功后的token值
    user: {}, // 用户信息
    playList: [
      {
        al: {
          picUrl: 'https://p1.music.126.net/wYuFxK1i_5jqs58xXQ-Jfg==/109951167350445378.jpg'
        },
        ar: [
          { name: 'LBI利比' }
        ],
        dt: 173382,
        name: '小城夏天',
        id: 1934251776
      }
    ], // 播放列表
    rate: 0, // 播放进度
    songUrl: '',
    broadcast: true, // 播放/暂定切换
    playListIndex: 0, // 播放下标
    musicBroadcast: true, // 底部播放栏显示与隐藏
    SongDetails: false, // 歌曲详情页显示
    songdateil: '', // 单首歌曲详情
    Playback: 0, // 播放状态 随机/单曲循环/顺序
    lyric: {}, // 歌词枚举对象(需要在js拿到歌词写代码处理后, 按照格式保存到这个对象)
    curLyric: '', // 当前显示哪句歌词
    lastLy: '', // 记录当前播放歌词
    currenTime: '', // 当前播放时间
    songTime: '', // 歌曲歌词对应时间
    songFore: '' // 歌曲时长
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
    updateRate (state, val) {
      state.rate = val
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
    },
    updateCurrenTime (state, val) {
      state.currenTime = val
    },
    updateSongTime (state, val) {
      state.songTime = val
    },
    updateSongFore (state, val) {
      state.songFore = val
    },
    updatePlayback (state, val) {
      state.Playback = val
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
    // 歌曲详情 并播放
    async songdateilApi (context, id) {
      const { data: res } = await songdateilAPI({ ids: id })
      this.dispatch('songlist', res.songs[0])
      context.commit('updataplayListIndex', 1)
    },
    songlist (context, date) {
      const song = context.state.playList.splice(1, 0, date)
      return song
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
      const songSet = []
      timeArr.forEach((item, index) => {
        // 拆分[00:00.000]这个格式字符串, 把分钟数字取出, 转换成秒
        const ms = item.split(':')[0].split('')[2] * 60
        // 拆分[00:00.000]这个格式字符串, 把十位的秒拿出来, 如果是0, 去拿下一位数字, 否则直接用2位的值
        const ss = item.split(':')[1].split('.')[0].split('')[0] === '0' ? item.split(':')[1].split('.')[0].split('')[1] : item.split(':')[1].split('.')[0]
        // 秒数作为key, 对应歌词作为value
        lyricObj[ms + Number(ss)] = [contentArr[index], ms + Number(ss)]
        songSet.push(ms + Number(ss))
        // lyricObj[item] = ms + Number(ss)
        // lyricObj.push({ms + Number(ss)})
      })
      context.commit('updateSongTime', songSet)
      return lyricObj
    },
    async songlyric (context) {
      const { data: res } = await lyricAPI({ id: context.state.playList[context.state.playListIndex].id })
      context.commit('updatelyric', await this.dispatch('formatLyr', res.lrc.lyric))
      context.commit('updateCurLyric', context.state.lyric[Object.keys(context.state.lyric)[0]])
      context.commit('updateLastLy', context.state.lyric[Object.keys(context.state.lyric)[0]])
    },
    // 格式化播放时长
    formatDt (context, time) {
      const dt = time / 1000
      let m = parseInt(dt / 60)
      let s = parseInt(dt % 60)
      m = m >= 10 ? m : (m = '0' + m)
      s = s >= 10 ? s : (s = '0' + s)
      context.commit('updateSongFore', m + ':' + s)
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
