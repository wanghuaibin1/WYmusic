<template>
  <div class="lg">
    <!-- <div class="form">
      <van-form @submit="onSubmit">

        <van-field v-model="phone" name="手机号"  placeholder="手机号"
          :rules="[{ pattern, message: '请填写手机号' }]" />
        <van-field v-model="password" type="password" name="密码"  placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]" />
        <div style="margin: .32rem;">
          <van-button round block type="info" native-type="submit">登录</van-button>
        </div>
      </van-form>
      <van-button type="primary" to="index" color="rgb(236, 236, 236)">去注册</van-button>
      <button @click="q">获得key</button>
      <button @click="w">获取beas64</button>
      <img  src="" alt="">
      <img src="" alt="">
    </div> -->
    <div class="loginButton">
      <button v-if="k" @click="loginQRcode"
        style="  width:2.2rem;height: 1rem;color: #ffff;background-color: rgb(59 59 59 / 50%);">二维码登录</button>
      <!-- <van-loading size=".48rem" vertical></van-loading> -->
      <van-image v-else :src="this.base64">
        <template v-slot:loading>
          <van-loading size="24px" type="spinner" vertical>加载中...</van-loading>
        </template>
      </van-image>
    </div>

  </div>
</template>

<script>
// 调用vuex里的mutations方法
import { mapMutations } from 'vuex'
import { loginAPI, keyAPI, createAPI, checkAPI } from '@/api'
export default {
  name: 'Log-in',
  data () {
    return {
      pattern: /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1589]))\d{8}$/,
      phone: '',
      password: '',
      key: '',
      base64: '',
      k: true,
      cookies: ''
    }
  },
  methods: {
    ...mapMutations(['updataToken']), // 映射调用vuex中的方法保存token
    async onSubmit () {
      const { data: res } = await loginAPI({ phone: this.phone, password: Date.now() })
      console.log(res)
    },
    // 二维码登录 获取key
    async loginQRcode () {
      this.k = false
      const { data: res } = await keyAPI({ timerstamp: Date.now() })
      this.key = res.data.unikey
      this.w()
      setInterval(() => {
        this.q()
      }, 1000)
    },
    // 二维码登录 获取base64
    async w () {
      const { data: res } = await createAPI({ key: this.key, qrimg: true })
      console.log(res)
      this.base64 = res.data.qrimg
      // document.querySelector('img').setAttribute('src', this.base64)
    },
    // 二维码检测扫码状态接口
    async q () {
      const { data: res } = await checkAPI({ key: this.key, timerstamp: Date.now() })
      if (res.code === 800) {
        this.$toast('二维码已过期')
        this.key = ''
        this.base64 = ''
        this.k = true
      } else if (res.code === 802) {
        // 已扫码待确认
        this.$toast(res.message)
      } else if (res.code === 803) {
        // 登录成功
        this.cookies = res.cookie
        this.updataToken(res.cookie)
        this.$router.push('/layout')
      }
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
    background-color: rgb(59 59 59 / 50%);

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
</style>
