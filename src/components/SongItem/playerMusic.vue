<template>
  <!-- 歌曲底部播放组件 -->
  <div class="playerMusic">
    <div class="MusicLift" @click="updateSongDetails">
      <div class="MusicImg" :style="{ animationPlayState: (!broadcast ? 'running' : 'paused') }">
        <img :src="playList[playListIndex].al.picUrl" alt="">
      </div>
      <div class="MusicItem">
        <p class="zz">{{ playList[playListIndex].name }}</p>
        <p class="zz">{{currenTime===0?playList[playListIndex].ar[0].name:curLyric[0] }}</p>
        <!-- <p class="zz">{{ playList[playListIndex].ar[0].name }}</p> -->
      </div>
    </div>
    <div class="MusicRigth">
      <van-circle v-model="currentRate" size=".6rem" :rate="rate" :color="gradientColor">
        <van-icon size="20" :name="(!broadcast ? 'pause' : 'play')" @click="broa" />
      </van-circle>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-yinleliebiao"></use>
      </svg>
    </div>
    <audio ref="audio" :src='songUrl'></audio>
    <van-popup v-model="SongDetails" position="right" @open="kai" @closed="bi" :style="{ height: '100%', width: '100%' }">
      <keep-alive>
        <songDate :musicIt="playList[playListIndex]" :broa="broa" :zz="zz" @numchange="getNewCount"/>
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
      },
      zz: true
    }
  },
  methods: {
    ...mapMutations(['updataBroadcast', 'updateCurrenTime', 'updateSongDetails', 'updateCurLyric', 'updateLastLy', 'updateRate']),
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
      this.$refs.audio.addEventListener('timeupdate', (e) => {
        this.updateRate(this.currenTime / this.songTime[this.songTime.length - 1] * 100)
        // 进度
        curTime = Math.floor(this.$refs.audio.currentTime)
        this.updateCurrenTime(curTime)
        // 避免空白出现
        // console.log(this.lyric[curTime])
        if (typeof this.lyric[curTime] !== 'undefined' && this.lyric[curTime][0] !== String('\n')) {
          this.updateCurLyric(this.lyric[curTime])
          this.updateLastLy(this.curLyric)
        } else {
          this.updateCurLyric(this.lastLy)
        }
      })
    },
    kai () {
      this.$store.dispatch('formatDt', this.playList[this.playListIndex].dt)
    },
    bi () {
      this.zz = !this.zz
    },
    getNewCount (val) {
      this.$refs.audio.currentTime = val
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
      this.kai()
      this.updataBroadcast(false)
      this.$store.dispatch('songUrlApi')
    },
    playList () {
      this.$store.dispatch('songlyric')
      this.kai()
      if (!this.broadcast) {
        this.$store.dispatch('songUrlApi')
        this.$refs.audio.autoplay = true
        this.updataBroadcast(false)
      } else {
        this.$refs.audio.autoplay = false
      }
    },
    broadcast () {
      this.kai()
      if (!this.broadcast) {
        this.$refs.audio.play()
      } else {
        this.$refs.audio.pause()
      }
    }
  },
  computed: {
    ...mapState(['playList', 'playListIndex', 'broadcast', 'rate', 'songUrl', 'SongDetails', 'lyric', 'curLyric', 'lastLy', 'currenTime', 'songTime'])
  },
  created () {
    this.$store.dispatch('songlyric')
    this.$store.dispatch('songUrlApi')
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
  height: 1.4rem;
  background-color: rgb(255, 255, 255);
  border-top: .02rem solid red;
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
      width: 1rem;
      height: 1rem;
      border-radius: 1rem;
      background-color: black;
      padding: .2rem;
      margin-left: .2rem;
      animation: myfirst 4s linear infinite;

      // animation-play-state:paused
      img {
        width: 100%;
        height: 100%;
        border-radius: 1rem;
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
      margin-left: .2rem;

      p {
        width: 3.8rem;
        margin: 0;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      p:nth-child(2) {
        font-size: .2rem;
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
    font-size: .5rem;
  }
}
</style>
