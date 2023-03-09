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
        <!-- <span></span>
        <span style="font-size: 19px">发现</span>
        <span>云村</span>
        <span>视频</span> -->
        <van-tabbar route :fixed="false" active-color="red">
          <van-tabbar-item replace >我的</van-tabbar-item>
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
    <router-view />
    <!-- 挂载到 body 节点下 -->
    <van-popup v-model="show" get-container="body" position="left" :style="{ height: '100%', width: '4rem' }">
      <div class="userInformation">

      </div>
    </van-popup>
  </div>
</template>

<script >
export default {
  name: 'Lay-out',
  data () {
    return {
      show: false
    }
  },
  methods: {

  },
  components: {
  },
  props: {},
  watch: {},
  computed: {},
  created () {

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
    /deep/.van-tabbar--unfit{
      height: 100%;
      background-color: rgba(2555,255,2555,0);
      .van-tabbar-item{
        font-size: 16px;

      }
    .van-tabbar-item--active{
     background-color: rgba(2555,255,2555,0);
     font-size: 20px;
        }
    }
  }
}
</style>
