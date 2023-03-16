<template>
  <div>
    <!-- 顶部 -->
    <div class="topNav">
      <div class="topLift" @click="show = true">
        <svg style="font-size: .5rem" class="icon" aria-hidden="true">
          <use xlink:href="#icon-liebiao"></use>
        </svg>
      </div>
      <div class="topConent">
        <van-tabbar route :fixed="false" active-color="red">
          <van-tabbar-item replace>我的</van-tabbar-item>
          <van-tabbar-item replace to="/find">发现</van-tabbar-item>
          <van-tabbar-item replace>云村</van-tabbar-item>
          <van-tabbar-item replace>视频</van-tabbar-item>
        </van-tabbar>
      </div>
      <div class="topRight" @click="$router.push('/search')">
        <svg style="font-size: .5rem" class="icon" aria-hidden="true">
          <use xlink:href="#icon-z31sousuo"></use>
        </svg>
      </div>
    </div>
    <keep-alive>
      <router-view />
    </keep-alive>
    <!-- 挂载到 body 节点下 -->
    <van-popup closeable v-model="show" close-icon-position="top-left" get-container="body" position="left"
      :style="{ height: '100%', width: '100%' }">
      <div class="userInformation">
        <div class="userTop">
          <span>个人主页</span>
          <el-button type="text" @click="open"><i class="el-icon-switch-button"></i>退出</el-button>
          <img class="userbackImg" :src="user.profile.backgroundUrl" alt="">
        </div>
        <div class="userInfo">
          <div class="info">
            <!-- 头像 昵称 -->
            <div class="userhead">
              <img :src="user.profile.avatarUrl" alt="">
              <div style="margin-left: 10px;">
                <p style="line-height: 25px;font-size: 20px;margin: 5px 0;">{{ user.profile.nickname }}</p>
                <p style="line-height: 15px;font-size: 10px;font-weight: 100;">IP属地：四川</p>
              </div>
            </div>
            <div class="usersocial ">
              <div>
                <p>444</p>
                <p>关注</p>
              </div>
              <div style="border-left: 1px solid #bdbdbd;border-right: 1px solid #bdbdbd;">
                <p>444</p>
                <p>粉丝</p>
              </div>
              <div>
                <p>444</p>
                <p>xxx</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script >
import { logout } from '@/api'
import { Dialog } from 'vant'
import { mapActions } from 'vuex'
export default {
  name: 'Lay-out',
  data () {
    return {
      show: false,
      user: this.$store.state.user
    }
  },
  methods: {
    ...mapActions(['resetState']),
    // 用户信息
    async uidApi () {
      // const { data: res } = await uidAPI({ uid: this.user.data.account.id })
      // console.log(res)
    },
    // 退出登录
    open () {
      Dialog.confirm({
        title: '提示',
        message: '此操作将会退出登录，是否继续？'
      })
        .then(async () => {
          const { data: res } = await logout()
          if (res.code === 200) {
            this.resetState() // 重置vuex中的数据
            this.$message({
              showClose: true,
              message: '退出成功',
              type: 'success',
              center: true
            })
            this.$router.push('/login')
          } else {
            alert('退出失败')
          }
        })
        .catch(() => {
          // on cancel
        })
    }
  },
  components: {
  },
  props: {},
  watch: {},
  computed: {},
  created () {
    this.uidApi()
  },
  mounted () {
    console.log(this.user)
  }
}
</script>
<style lang="less" scoped>
.topNav {
  width: 100%;
  height: 1rem;
  padding: .2rem;
  display: flex;
  justify-content: space-between;
  align-content: center;

  .topConent {
    width: 65%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    font-size: .3rem;

    /deep/.van-tabbar--unfit {
      height: 100%;
      background-color: rgba(2555, 255, 2555, 0);

      .van-tabbar-item {
        font-size: 16px;

      }

      .van-tabbar-item--active {
        background-color: rgba(2555, 255, 2555, 0);
        font-size: 20px;
      }
    }
  }
}

.userInformation {

  .userTop {
    position: relative;
    display: flex;
    line-height: 55px;
    align-items: center;
    text-align: center;
    justify-content: flex-end;
    margin-bottom: 200px;

    span {
      width: 50%;
      color: #ffffff;
    }

    .el-button--text {
      width: 25%;
    }

    .userbackImg {
      z-index: -1;
      width: 100%;
      height: 6rem;
      position: absolute;
      top: 0;
      left: 0;
    }
  }

  .userInfo {
    width: 100%;
    background-color: #ffffff;

    .info {
      width: 80%;
      height: 150px;
      margin: auto;
      background-color: #ffffff;
      border-radius: 10px;
      transform: translateY(-20px);
      box-shadow: 12px 17px 51px rgba(0, 0, 0, 0.22);

      .userhead {
        display: flex;
        justify-content: center;

        img {
          width: 70px;
          height: 70px;
          border-radius: 50px;
          transform: translateY(-20px);
        }
      }
    }
  }

  .usersocial {
    display: flex;
    justify-content:space-evenly;
    align-items: center;
    padding: 20px 10px;
    div{
      display: flex;
      flex-direction: column;
      padding: 0 20px;
      text-align: center;
      p:nth-child(1){
        font-size: 17px;
      }
      p:nth-child(2){
font-size: 15px;
font-weight: 300;
      }
    }
  }
}
</style>
