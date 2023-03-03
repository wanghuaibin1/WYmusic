<template>
  <div>
    <div class="topNav">
      <div class="topLift">
        <svg style="font-size: 25px" class="icon" aria-hidden="true">
          <use xlink:href="#icon-liebiao"></use>
        </svg>
      </div>
      <div class="topConent">
        <span>我的</span>
        <span style="font-size: 0.38rem">发现</span>
        <span>云村</span>
        <span>视频</span>
      </div>
      <div class="topRight" @click="$router.push('/search')">
        <svg style="font-size: 25px" class="icon" aria-hidden="true">
          <use xlink:href="#icon-31sousuo"></use>
        </svg>
      </div>
    </div>

    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white" :loop="false">
      <van-swipe-item style="background-color: transparent" v-for="obj in banner" :key="obj.targetId">
        <img style=" width: 100%;
                height: 100%;
                object-fit: cover;
                padding: 10px;
                border-radius: 19.5px;
              " :src="obj.pic" alt="" title="1" />
          <span class="typeTitle">{{ obj.typeTitle }}</span>

      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script >
import { bannerAPI } from '@/api'
export default {
  name: 'Lay-out',
  data () {
    return {
      banner: [] // 轮播图数据
    }
  },
  methods: {
    async bannerApi () {
      const { data: res } = await bannerAPI()
      this.banner = res.banners
    }
  },
  components: {},
  props: {},
  watch: {},
  computed: {},
  created () {
    this.bannerApi()
  },
  mounted () { }
}
</script>
<style lang="less" scoped>
.topNav {
  width: 100%;
  height: 1rem;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-content: center;

  .topConent {
    width: 65%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    font-size: 0.3rem;
  }
}

.van-field__control {
  border-radius: 10px;
}

.van-search__content--round {
  background-color: rgb(54 125 125 / 20%);
}

/deep/.van-field__control {
  color: #fff;
}

.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 0.4rem;
  line-height: 3rem;
  text-align: center;
  background-color: #39a9ed;
}

.my-swipe .van-swipe__track .van-swipe-item {
  height: 3rem;
  background-color: transparent;
}

.typeTitle {
  position: absolute;
  bottom: .34rem;
  right: .38rem;
  height: .4rem;
  width: 1.2rem;
  background-color: #fff;
  color: #000;
  border-radius: .1rem;
  line-height: .4rem;
  font-size: .2rem;
}
</style>
