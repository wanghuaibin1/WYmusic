<template>
  <div>
    <!-- 顶部 -->
    <div class="topNav">
      <div class="topLift">
        <svg style="font-size: .5rem" class="icon" aria-hidden="true">
          <use xlink:href="#icon-liebiao"></use>
        </svg>
      </div>
      <div class="topConent">
        <span>我的</span>
        <span style="font-size: 19px">发现</span>
        <span>云村</span>
        <span>视频</span>
      </div>
      <div class="topRight" @click="$router.push('/search')">
        <svg style="font-size: .5rem" class="icon" aria-hidden="true">
          <use xlink:href="#icon-31sousuo"></use>
        </svg>
      </div>
    </div>
    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item style="background-color: transparent" v-for="obj in banner" :key="obj.bannerId">
        <img style=" width: 100%;
                        height: 100%;
                        object-fit: cover;
                        padding: .2rem;
                        border-radius: .39rem;
                      " :src="obj.pic" alt="" />
        <span class="typeTitle">{{ obj.typeTitle }}</span>

      </van-swipe-item>
    </van-swipe>
    <!-- 标签导航栏 -->
    <div class="labelBar">
      <span class="ic" v-for="item, index in icOn" :key="index">
        <svg style="font-size: .5rem" class="icon" aria-hidden="true">
          <use :xlink:href=item.icXlink></use>
        </svg>
        <span class="sp">{{ item.name }}</span>
      </span>
    </div>
    <!-- 推荐歌单 -->
    <div>

    </div>
  </div>
</template>

<script >
import { bannerAPI, personalizedAPI } from '@/api'
export default {
  name: 'Lay-out',
  data () {
    return {
      icOn: [
        { name: '每日推荐', icXlink: '#icon-rili1' },
        { name: '私人FM', icXlink: '#icon-sharpicons_radio' },
        { name: '歌单', icXlink: '#icon-gedan' },
        { name: '排行榜', icXlink: '#icon-paihangbang' },
        { name: '数字专辑', icXlink: '#icon-zhuanji' }
      ],
      banner: [], // 轮播图数据
      persoan: [] // 推荐歌单数据
    }
  },
  methods: {
    async bannerApi () {
      const { data: res } = await bannerAPI()
      this.banner = res.banners
    },
    async perSonalizeApi () {
      const { data: res } = await personalizedAPI()
      console.log(res)
    }
  },
  components: {},
  props: {},
  watch: {},
  computed: {},
  created () {
    this.bannerApi()
    this.perSonalizeApi()
  },
  mounted () { }
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
  }
}

.van-field__control {
  border-radius: .2rem;
}

.van-search__content--round {
  background-color: rgb(54 125 125 / 20%);
}

/deep/.van-field__control {
  color: #fff;
}

.my-swipe .van-swipe-item {
  color: #fff;
  font-size: .4rem;
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

.labelBar {
  display: flex;
  justify-content: center;
  margin-top: .2rem;

  .ic {
    display: flex;
    flex-direction: column
  }

  .sp {
    font-size: .2rem;
    color: #d2d2d2;
    margin-top: .2rem;
    font-weight: 100;
    font-family: 楷体;
  }
}</style>
