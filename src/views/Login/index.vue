<template>
  <div class="lg">
    <div class="loginButton">
      <button v-if="k===0" @click="loginQRcode"
        style="  width:2.2rem;height: 1rem;color: #ffff;background-color: rgb(59 59 59 / 50%);">二维码登录</button>
      <!-- <van-loading size=".48rem" vertical></van-loading> -->
      <van-image v-else-if="k===1" :src="this.base64">
        <template v-slot:loading>
          <van-loading size="24px" type="spinner" vertical>加载中...</van-loading>
        </template>
      </van-image>
      <div v-else class="user">
        <img :src="user.avatarUrl" alt="">
        <p>{{ user.nickname }}</p>
      </div>

    </div>

  </div>
</template>

<script>
// 调用vuex里的mutations方法
import { mapMutations } from 'vuex'
import { loginAPI, keyAPI, createAPI, checkAPI, statusAPI } from '@/api'
export default {
  name: 'Log-in',
  data () {
    return {
      key: '',
      base64: '',
      k: 0,
      cookies: '',
      user: {}
    }
  },
  methods: {
    ...mapMutations(['updataCookie', 'usernformation']), // 映射调用vuex中的方法保存token
    async onSubmit () {
      const { data: res } = await loginAPI({ phone: this.phone, password: Date.now() })
      console.log(res)
    },
    // 登录状态 解析cookie拿到用户数据保存在vuex中
    async statusApi (cookie = '') {
      const { data: res } = await statusAPI({ cookie, timerstamp: Date.now() })
      // console.log(JSON.stringify(res, null, 2))
      this.usernformation(JSON.parse(JSON.stringify(res, null, 2)))
    },
    // 二维码登录 获取key
    async loginQRcode () {
      // let timer
      this.k = 1
      const { data: key } = await keyAPI({ timerstamp: Date.now() })
      this.key = key.data.unikey
      // 二维码登录 获取base64
      const { data: base } = await createAPI({ key: this.key, qrimg: true })
      this.base64 = base.data.qrimg
      // 二维码检测扫码状态接口
      const timer = setInterval(async () => {
        const { data: res } = await checkAPI({ key: this.key, timerstamp: Date.now() })
        if (res.code === 800) {
          alert('二维码已过期,请重新获取')
          clearInterval(timer)
          this.key = ''
          this.base64 = ''
          this.k = 0
        } else if (res.code === 802) {
        // 已扫码待确认
          this.$toast(res.message)
          console.log(res)
          this.user = res
          this.k = 3
        } else if (res.code === 803) {
        // 登录成功
          clearInterval(timer) // 清除定时器
          alert('授权登录成功')
          this.statusApi(res.cookie) // 检查登录状态
          // this.cookies = res.cookie
          this.updataCookie(res.cookie) // 保存在vuex中
          this.$router.push('/layout')
        }
      }, 3000)
    }
  },
  components: {},
  props: {},
  watch: {},
  computed: {},
  created () { },
  mounted () { }
}
</script>
<style lang="less" scoped>
.lg {
  width: 100vw;
  height: 100vh;
  background: url(https://pic3.zhimg.com/80/v2-6b1c15d2d8e20544229d392f5b86011e_720w.webp);
  /* 背景图垂直、水平均居中 */
  background-position: center center;
  /* 当内容高度大于图片高度时，背景图像的位置相对于viewport固定 */
  background-attachment: fixed;
  /* 让背景图基于容器大小伸缩 */
  background-size: cover;
  /* 设置背景颜色，背景图加载过程中会显示背景色 */
  background-color: #464646;
  position: relative;
  align-items: center;
  text-align: center;

  .loginButton {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    // width:110px;
    // height: 50px;
    color: #ffff;
    // background-color: rgb(59 59 59 / 50%);

  }

  .form {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: .6rem .4rem;
    width: 80%;
    background: rgba(236, 236, 236, .5);
    box-shadow: rgba(0, 0, 0, 0.4) 0rem .04rem .08rem, rgba(0, 0, 0, 0.3) 0rem .14rem .26rem -0.06rem, rgba(0, 0, 0, 0.2) 0rem -0.06rem 0rem inset;
  }
}

.van-cell {
  margin: .2rem 0;
  line-height: .8rem;
  position: relative;
  font-size: .28rem;
  border-radius: .08rem;
  border: .02rem solid #dcdfe6;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  line-height: .8rem;
  outline: 0;
  padding: 0 .3rem;
}

/deep/.van-button__text {
  color: #464646;
}
.user img{
width: 200px;
height: 200px;
border-radius: 100px;
}
</style>
