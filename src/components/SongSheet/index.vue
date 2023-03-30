<template>
  <!-- 首页推荐歌单组件 -->
  <router-link :to="{path:'/itemmusic',query:{id}}" class="songImg">
    <div  >
          <van-image width="100%" height="2.3rem" fit="cover" :src="picUrl" lazy-load>
          </van-image>
          <span class="playbackVolume">
          <van-icon name="play-circle-o" />
          {{ formatNumber(playCount) }}
        </span>
          <p class="song_name">{{ name }}</p>
        </div>
      </router-link>
</template>

<script>
export default {
  name: 'Song-Sheet',
  props: ['picUrl', 'name', 'playCount', 'id'],
  data () {
    return {
    }
  },
  methods: {
    // 数字转换成万
    formatNumber (num) {
      num = Number(num)
      if (num === 0) {
        return num + ''
      } else
      if (num > 1 && num < 10000) {
        return num + ''
      } else if (num > 10000 && num < 100000000) {
        return (num / 10000).toFixed(1) + '万'
      } else {
        return (num / 100000000).toFixed(1) + '亿'
      }
    }
  },
  components: {},
  watch: {},
  computed: {},
  created () {},
  mounted () {}
}
</script>
<style lang="less" scoped>
.playbackVolume {
  color: #eee;
  background-color: rgb(54 54 54 / 0.5);
  font-size: .2rem;
  position: absolute;
  border-radius: .4rem;
  padding: .04rem .08rem;
  top: .1rem;
  right: .1rem;
}
.songImg {
  position: relative;
      width: 28%;
      margin: 0 .2rem;
      flex-shrink: 0;
      flex-grow: 0;

  /* 推荐歌单 - 歌名 */
  .song_name {
    font-size: .2rem;
    padding: 0 0.08rem;
    margin-bottom: 0.266667rem;
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box;
    /** 对象作为伸缩盒子模型显示 **/
    -webkit-box-orient: vertical;
    /** 设置或检索伸缩盒对象的子元素的排列方式 **/
    -webkit-line-clamp: 2;
    /** 显示的行数 **/
    overflow: hidden;
    /** 隐藏超出的内容 **/
    color: #ffffff;
  }

    }
    /deep/.van-image__img{
border-radius: 8px;
      }
</style>
