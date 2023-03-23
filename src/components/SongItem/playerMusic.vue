<template>
  <!-- 歌曲底部播放组件 -->
  <div class="playerMusic">
    <div class="MusicLift" @click="updateSongDetails">
      <div class="MusicImg" :style="{ animationPlayState: (!broadcast ? 'running' : 'paused') }">
        <img :src="playList[playListIndex].al.picUrl" alt="">
      </div>
      <div class="MusicItem">
        <p class="zz">{{ playList[playListIndex].name }}</p>
        <p class="zz">{{ curLyric }}</p>
        <!-- <p class="zz">{{ playList[playListIndex].ar[0].name }}</p> -->
      </div>
    </div>
    <div class="MusicRigth">
      <van-circle v-model="currentRate" size="30px" :rate="rate" :color="gradientColor">
        <van-icon size="20" :name="(!broadcast ? 'pause' : 'play')" @click="broa" />
      </van-circle>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-yinleliebiao"></use>
      </svg>
    </div>
    <audio ref="audio" :src='songUrl'></audio>
    <van-popup v-model="SongDetails" position="right" :style="{ height: '100%', width: '100%' }">
      <keep-alive>
        <songDate :musicIt="playList[playListIndex]" :broa="broa" />
      </keep-alive>
    </van-popup>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import songDate from '@/components/SongItem/songDetails.vue'
export default {
  name: 'Player-Music',
  data () {
    return {
      currentRate: 0,
      gradientColor: {
        '0%': '#3fecff',
        '100%': '#6149f6'
      }
    }
  },
  methods: {
    ...mapMutations(['updataBroadcast', 'updateSongDetails', 'updateCurLyric', 'updateLastLy']),
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
    showLyric () {
      let curTime
      // 监听播放audio进度, 切换歌词显示
      this.$refs.audio.addEventListener('timeupdate', () => {
        // 进度
        curTime = Math.floor(this.$refs.audio.currentTime)
        console.log(curTime)

        // 避免空白出现
        if (typeof this.lyric[curTime] !== 'undefined' && this.lyric[curTime] !== '\n') {
          this.updateCurLyric(this.lyric[curTime])
          this.updateLastLy(this.curLyric)
        } else {
          this.updateCurLyric(this.lastLy)
        }
      })
    }
  },
  components: {
    songDate
  },
  props: {},
  watch: {
    playListIndex () {
      this.$store.dispatch('songlyric')
      this.$refs.audio.autoplay = true
      this.updataBroadcast(false)
      this.$store.dispatch('songUrlApi')
    },
    playList () {
      this.$store.dispatch('songlyric')
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
    ...mapState(['playList', 'playListIndex', 'broadcast', 'rate', 'songUrl', 'SongDetails', 'lyric', 'curLyric', 'lastLy'])
  },
  created () {
    this.$store.dispatch('songlyric')
  },
  mounted () {
    this.showLyric()
  }
}
</script>
<style lang="less" scoped>
.van-popup--right {
  overflow: hidden;
}

.playerMusic {
  width: 100%;
  z-index: 1000;
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
      animation: myfirst 4s linear infinite;

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
        transform: rotate(360deg);
      }
    }

    .MusicItem {
      margin-left: 10px;

      p {
        width: 190px;
        margin: 0;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      p:nth-child(2) {
        font-size: 10px;
        color: #9e907f;
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
}
</style>
