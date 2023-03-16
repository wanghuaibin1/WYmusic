<template>
  <!-- 歌曲底部播放组件 -->
  <div class="playerMusic">
    <div class="MusicLift">
      <div class="MusicImg" :style="{animationPlayState:(!broadcast?'running':'paused')}">
        <img :src="playList[playListIndex].al.picUrl" alt="">
      </div>
      <div class="MusicItem">
        <p class="zz">{{ playList[playListIndex].name }}</p>
        <p class="zz">xxxxxx</p>
      </div>
    </div>
    <div class="MusicRigth">
      <van-circle v-model="currentRate" size="30px" :rate="rate" :color="gradientColor">
        <van-icon size="20" :name="(!broadcast?'pause':'play')" @click="broa"/>
      </van-circle>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-yinleliebiao"></use>
      </svg>
    </div>
    <audio ref="audio" :src='songUrl'></audio>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import { lyricAPI } from '@/api'
export default {
  name: 'Player-Music',
  data () {
    return {
      currentRate: 0,
      gradientColor: {
        '0%': '#3fecff',
        '100%': '#6149f6'
      },
      lyric: '' // 歌曲歌词
    }
  },
  methods: {
    ...mapMutations(['updataBroadcast']),
    broa () {
      // 底部播放按钮 判断是否在播放
      if (this.$refs.audio.paused) {
        this.$refs.audio.play()
        this.updataBroadcast(false)
      } else {
        this.$refs.audio.pause()
        this.updataBroadcast(true)
      }
    },
    async lyricApi () {
      const { data: res } = await lyricAPI({ id: this.playList[this.playListIndex].id })
      console.log(res)
    }
  },
  components: {},
  props: {},
  watch: {
    playListIndex () {
      this.$refs.audio.autoplay = true
      this.updataBroadcast(false)
      this.$store.dispatch('songUrlApi')
    },
    playList () {
      if (!this.broadcast) {
        this.$store.dispatch('songUrlApi')
        this.$refs.audio.autoplay = true
        this.updataBroadcast(false)
      } else {
        this.$refs.audio.autoplay = false
      }
    },
    broadcast () {
      if (!this.broadcast) {
        this.$refs.audio.play()
      } else {
        this.$refs.audio.pause()
      }
    }
  },
  computed: {
    ...mapState(['playList', 'playListIndex', 'broadcast', 'rate', 'songUrl'])
  },
  created () {
    this.lyricApi()
  },
  mounted () { }
}
</script>
<style lang="less" scoped>
.playerMusic {
  width: 100%;
  height: 70px;
  background-color: rgb(255, 255, 255);
  border-top: 1px solid red;
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .MusicLift {
    width: 70%;
    height: 100%;
    display: flex;
    // justify-content: space-around;
    align-items: center;

    .MusicImg {
      width: 50px;
      height: 50px;
      border-radius: 50px;
      background-color: black;
      padding: 10px;
      margin-left: 10px;
      animation:myfirst 4s linear infinite;
      // animation-play-state:paused
      img {
        width: 100%;
        height: 100%;
        border-radius: 50px;
      }
    }

    @keyframes myfirst {
      from {
       transform: rotate(0);
      }

      to {
        transform: rotate(360deg);      }
    }

    .MusicItem {
      margin-left: 10px;

      p {
        width: 190px;
        margin: 0;
      }
      .zz{
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }

  .MusicRigth {
    width: 30%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 25px;
  }
}</style>
