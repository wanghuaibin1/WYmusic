import Vue from 'vue'
import Vuex from 'vuex'
// import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cookie: '', // 保存登录成功后的token值
    user: {
      data: {
        code: 200,
        account: {
          id: 1564982554,
          userName: '1_********763',
          type: 1,
          status: 0,
          whitelistAuthority: 0,
          createTime: 1534761414523,
          tokenVersion: 2,
          ban: 0,
          baoyueVersion: -2,
          donateVersion: 0,
          vipType: 0,
          anonimousUser: false,
          paidFee: false
        },
        profile: {
          userId: 1564982554,
          userType: 0,
          nickname: '寂梦一场',
          avatarImgId: 109951165602896830,
          avatarUrl: 'http://p2.music.126.net/OI8ctKSUzYXFkLgsud3mgg==/109951165602896838.jpg',
          backgroundImgId: 109951165602904110,
          backgroundUrl: 'http://p1.music.126.net/HIC1Fz6vykGA1kvMAV7A8Q==/109951165602904115.jpg',
          signature: '\nYou make me feel like anything is possible',
          createTime: 1534761550904,
          userName: '1_********763',
          accountType: 1,
          shortUserName: '********763',
          birthday: 1640966400000,
          authority: 0,
          gender: 1,
          accountStatus: 0,
          province: 1000000,
          city: 1001800,
          authStatus: 0,
          description: null,
          detailDescription: null,
          defaultAvatar: false,
          expertTags: null,
          experts: null,
          djStatus: 0,
          locationStatus: 30,
          vipType: 0,
          followed: false,
          mutual: false,
          authenticated: false,
          lastLoginTime: 1678342218153,
          lastLoginIP: '::1',
          remarkName: null,
          viptypeVersion: 1669221283350,
          authenticationTypes: 0,
          avatarDetail: null,
          anchor: false
        }
      }
    },
    // 用户信息
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
  // plugins: [createPersistedState()],
  modules: {
  }
})
