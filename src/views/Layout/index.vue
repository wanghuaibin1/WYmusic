<template>
  <div>
    <!-- <van-row gutter="0" type="flex" justify="center">
      <van-col span="0">
        <svg style="font-size: 25px" class="icon" aria-hidden="true">
          <use xlink:href="#icon-liebiao"></use>
        </svg>
      </van-col>
      <van-col span="18">
        <van-search
          class="seach"
          shape="round"
          background="rgba(0, 0, 0, 0)"
          placeholder="请输入搜索关键词"
          @focus="$router.push('/search')"
        />
      </van-col>
    </van-row> -->

    <div class="topNav">
      <div class="topLift">
        <svg style="font-size: 25px" class="icon" aria-hidden="true">
          <use xlink:href="#icon-liebiao"></use>
        </svg>
      </div>
      <div class="topConent">
        <span>我的</span>
        <span>发现</span>
        <span>云村</span>
        <span>视频</span>
      </div>
      <div class="topRight" @click="$router.push('/search')">
        <svg style="font-size: 25px" class="icon" aria-hidden="true">
          <use xlink:href="#icon-31sousuo"></use>
        </svg>
      </div>
    </div>

    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item>1</van-swipe-item>
      <van-swipe-item>2</van-swipe-item>
      <van-swipe-item>3</van-swipe-item>
      <van-swipe-item style="background-color: transparent">
        <img
          style="
            width: 100%;
            height: 100%;
            object-fit: cover;
            padding: 10px;
            border-radius: 19.5px;
          "
          src="https://ts3.cn.mm.bing.net/th?id=ORMS.521047d197b7e0981a2f8d41ba5f8a07&pid=Wdp&w=300&h=156&qlt=90&c=1&rs=1&dpr=1&p=0"
          alt=""
        />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script scoped>
export default {
  name: 'Lay-out',
  data () {
    return {

    }
  },
  methods: {},
  components: {},
  props: {},
  watch: {},
  computed: {},
  created () {},
  mounted () {}
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
    font-size: 0.36rem;
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
</style>
