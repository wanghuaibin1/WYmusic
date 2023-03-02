<template>
  <div>
    <van-row gutter="5" type="flex" align="center">
      <van-col span="5">
        <svg style="font-size: .5rem;" class="icon" aria-hidden="true">
          <use xlink:href="#icon-liebiao"></use>
        </svg>
      </van-col>
      <van-col span="18">
        <van-search class="seach" shape="round" background="rgba(0, 0, 0, 0)" v-model="value" placeholder="请输入搜索关键词" />
      </van-col>
      <van-col span="3">span: 8</van-col>
    </van-row>

    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white" >
      <van-swipe-item>1</van-swipe-item>
      <van-swipe-item>2</van-swipe-item>
      <van-swipe-item>3</van-swipe-item>
      <van-swipe-item style="background-color: transparent;">
        <img style=" width: 100%;height: 100%;object-fit:cover;padding: .2rem;border-radius: .39rem;"
          src="https://ts3.cn.mm.bing.net/th?id=ORMS.521047d197b7e0981a2f8d41ba5f8a07&pid=Wdp&w=300&h=156&qlt=90&c=1&rs=1&dpr=1&p=0"
          alt="">
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script scoped>
export default {
  name: 'Lay-out',
  data () {
    return {
      value: ''// 搜索关键词
    }
  },
  methods: {},
  components: {},
  props: {},
  watch: {},
  computed: {},
  created () { },
  mounted () { }
}
</script>
<style lang="less" scoped>
.van-field__control {
  border-radius: .2rem;
}

.van-search__content--round {
  background-color: rgba(235, 236, 236, .2);
}

.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
.my-swipe .van-swipe__track .van-swipe-item{
  height: 150px;
  background-color:transparent;
}
</style>
