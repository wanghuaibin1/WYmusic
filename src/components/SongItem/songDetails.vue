<template>
  <div>
    <div class="detaolsTop">
      <div  @click="$store.commit('updateSongDetails')"><van-icon name="arrow-left" /></div>
      <div class="detalsSong">
        <!-- <p>喜喜喜喜喜喜喜喜喜喜</p> -->
        <van-notice-bar   :scrollable="musicIt.name.length>=14?true:false"  :text="musicIt.name" />
        <span>{{ musicIt.ar[0].name }}</span>
      </div>
      <div style="font-size: 25px;">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fenxiang"></use>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Song-Details',
  data () {
    return {
    }
  },
  methods: {},
  components: {},
  props: ['musicIt'],
  watch: {},
  computed: {},
  created () { },
  mounted () { console.log(this.musicIt) }
}
</script>
<style lang="less" scoped>
.detaolsTop{
  display: flex;
  justify-content: space-around;
  font-size: 20px;
  align-items: center;
  .detalsSong{
    width: 50%;
    padding-top: 10px;
    font-size: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .van-notice-bar{
width: 100%;
height: 24px;
background-color: initial;
padding: 0;
// color: #fff;
/deep/.van-notice-bar__wrap{
  flex-direction: column
}
    }
  }
}
</style>
