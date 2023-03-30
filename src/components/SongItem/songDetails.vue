<template>
  <div>
    <img class="itemImg" :src="musicIt.al.picUrl" alt="">
    <div class="detaolsTop">
      <div @click="updateSongDetails"><van-icon name="arrow-left" /></div>
      <div class="detalsSong">
        <van-notice-bar :scrollable="musicIt.name.length >= 18 ? true : false" :text="musicIt.name" />
        <span>{{ musicIt.ar[0].name }}</span>
      </div>
      <div style="font-size: .5rem;">
        <i style="font-size: .5rem;" class="iconfont icon-fenxiang"></i>
      </div>
    </div>
    <div v-show="!show" class="detaolsContent" @click="show = !show">
      <div class="contentCover">
        <div></div>
        <div></div>
        <div><img :src="musicIt.al.picUrl" alt=""></div>
      </div>
      <div class="contentSong">
        <div class="lrcContent">
          <!-- <van-icon name="like" color="red" /> -->
          <van-icon name="like-o" color="#fff" />
          <p class="lrc">{{currenTime===0?musicIt.ar[0].name:curLyric[0]  }}</p>
          <!-- <van-icon badge="99+" class="iconfont" class-prefix='icon' name='androidgengduo' /> -->
          <van-icon name="chat-o" badge="99+" color="#fff" />
        </div>
      </div>
    </div>
    <div v-show="show" class="songLyric" @click="show = !show">
      <p v-for="(item, i) in lyric" :key="i" :indeX=i :class="{ acter: (currenTime >= item[1]) }"
        :style="{ 'font-size': (currenTime >= item[1] && currenTime < songTime[(Number((Object.keys(lyric)).indexOf(i))) + 1]) || curLyric[1] === item[1] ? '.5rem' : '' }">
        {{ item[0] }}</p>
    </div>
    <div class="detaolsSongFence">
      <div class="songItem">
        <span>{{ item }}</span>
        <!-- <van-progress :percentage="rate" stroke-width="2" pivot-text="1" /> -->
        <van-slider v-model="value" :max="songTime[songTime.length-1]" @drag-end="end" @input="end"/>

        <span>{{ $store.state.songFore }}</span>
      </div>
      <div class="songControl">
        <i style="font-size: .5rem;" class="iconfont" :class="bark" @click="playb"></i>
        <i style="font-size: .5rem;" class="iconfont icon-shangyishoushangyige" @click="previousSong"></i>
        <div class="detaolsBroadcast"
          :style="{ backgroundColor: (broadcast ? 'rgb(111,51,59)' : 'initial'), border: (broadcast ? 'none' : '') }"
          @click="broa">
          <van-icon size="30" :name="(!broadcast ? 'pause' : 'play')" />
        </div>
        <i style="font-size: .5rem;" class="iconfont icon-xiayigexiayishou" @click="nextSong"></i>
        <i style="font-size: .5rem;" class="iconfont icon-bofangliebiao"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'Song-Details',
  data () {
    return {
      currentRate: 0,
      gradientColor: {
        '0%': '#3fecff',
        '100%': '#6149f6'
      },
      show: false,
      bark: 'icon-liebiaoxunhuan',
      value: this.$store.state.currenTime,
      item: '00:00'
    }
  },
  methods: {
    ...mapMutations(['updateSongDetails', 'updataplayListIndex', 'updatePlayback', 'updateRate', 'updateCurrenTime', 'updateCurLyric', 'updateLastLy']),
    playb () {
      if (this.Playback !== 2) {
        this.updatePlayback(this.Playback + 1)
        switch (this.Playback) {
          case 1: this.$toast({ message: '随机播放', position: 'top' })
            this.bark = 'icon-suijibofang'; break
          case 2: this.$toast({ message: '单曲循环', position: 'top' })
            this.bark = 'icon-gl-repeatOnce2'
        }
      } else {
        this.updatePlayback(0)
        this.bark = 'icon-liebiaoxunhuan'
        this.$toast({ message: '顺序播放', position: 'top' })
      }
    },
    // 下一首
    nextSong () {
      switch (this.Playback) {
        case 0:
          if (this.playListIndex + 1 !== this.playList.length) {
            this.updataplayListIndex(this.playListIndex + 1)
          } else {
            this.updataplayListIndex(0)
          }
          break
        case 1: {
          const randomNumber = Math.floor(Math.random() * this.playList.length)
          this.updataplayListIndex(randomNumber)
        } break
        case 2: this.updataplayListIndex(this.playListIndex)
      }
    },
    // 上一首
    previousSong () {
      if (this.playListIndex === 0) {
        this.updataplayListIndex(this.playList.length - 1)
      } else {
        this.updataplayListIndex(this.playListIndex - 1)
      }
    },
    q () {
      [...new Set(this.songTime)].forEach((element, index) => {
        if (element === this.curLyric[1]) {
          document.querySelector('.songLyric').scrollTop = -200 + index * 40
        }
      })
    },
    end () {
      this.updateCurrenTime(this.value)
      let w = []
      for (let index = 1; index <= this.currenTime; index++) {
        w.push(index)
      }
      w = w.reverse()
      w.some(item => {
        if (this.lyric[item - 1] !== undefined) {
          this.updateCurLyric(this.lyric[item - 1])
          this.updateLastLy(this.curLyric)
          return true
        } else {
          console.log(`Element at index ${item - 1} is undefined`)
          return false
        }
      })
      this.q()
      this.$emit('numchange', this.value)
    }
  },
  components: {},
  props: ['musicIt', 'broa', 'zz'],
  watch: {
    currenTime () {
      // 先去重
      [...new Set(this.songTime)].forEach((element, index) => {
        if (element === this.curLyric[1]) {
          document.querySelector('.songLyric').scrollTop = -200 + index * 40
        }
      })
      this.value = this.currenTime
      let m = parseInt(this.currenTime / 60)
      let s = parseInt(this.currenTime % 60)
      m = m >= 10 ? m : (m = '0' + m)
      s = s >= 10 ? s : (s = '0' + s)
      this.item = m + ':' + s
      if (this.item === this.$store.state.songFore) {
        this.nextSong()
      }
    },
    value () {
      this.updateCurrenTime(this.value)
    },

    zz () {
      this.show = false
    }
  },
  computed: {
    ...mapState(['broadcast', 'curLyric', 'lyric', 'rate', 'currenTime', 'songTime', 'Playback', 'playListIndex', 'playList'])
  },
  created () {
  },
  mounted () {
  }
}
</script>
<style lang="less" scoped>
.itemImg {
  position: absolute;
  width: 100%;
  height: 100%;
  filter: blur(2.4rem);
  transform: scale(2);
  z-index: -1;
}

.detaolsTop {
  display: flex;
  justify-content: space-around;
  font-size: .4rem;
  align-items: center;
  color: #ffff;

  .detalsSong {
    width: 50%;
    padding-top: .2rem;
    font-size: .3rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    .van-notice-bar {
      width: 100%;
      height: .48rem;
      background-color: initial;
      padding: 0;
      color: #fff;

      /deep/.van-notice-bar__wrap {
        flex-direction: column
      }
    }

    span {
      color: #000
    }
  }
}

.detaolsContent {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 70vh;

  .contentCover {
    display: grid;
    flex-shrink: 0;
    justify-items: center;
    align-items: center;
    width: 100%;
    height: 80%;

    div {
      grid-area: 1 /1 /2 /1
    }

    div:nth-child(1) {
      width: 80%;
      height: 4rem;
      margin: auto;
      background-color: rgba(109, 104, 110, .6);
      border-radius: .2rem;
    }

    div:nth-child(2) {
      width: 70%;
      height: 4.4rem;
      background-color: rgba(205, 203, 204, .8);
      border-radius: .2rem;
    }

    div:nth-child(3) {
      width: 60%;
      height: 5rem;

      img {
        width: 100%;
        height: 100%;
        border-radius: .2rem;
      }
    }
  }

  .contentSong {
    display: grid;
    align-items: center;
    flex: 1;
    overflow: overlay;
    padding: 0 .2rem;
    transition: all .2s;
    width: 100%;

    .lrcContent {
      display: flex;
      justify-content: space-around;
      align-items: center;

      .van-icon,
      .icon {
        font-size: .5rem;
        position: relative;
        overflow: visible;
      }

      p {
        width: 70%;
      }
    }

    .lrc {
      font-size: .28rem;
      line-height: .7rem;
      color: #fff;
      text-align: center;
    }
  }
}

.songLyric {
  width: 102%;
  height: 70vh;
  overflow: overlay;
  padding: .4rem 0;
  position: relative;
  scroll-behavior: smooth;

  div {
    position: absolute;
    // top: 50%;
    width: 100%;
  }

  p {
    font-size: .3rem;
    line-height: .8rem;
    color: rgb(125, 125, 132);
    text-align: center;
    transition: all .1s;

  }

  .acter {
    color: #fff;
  }
}

.detaolsSongFence {
  position: fixed;
  width: 100%;
  bottom: 0;

  .songItem {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    padding: 0 .2rem;

    /deep/.van-slider {
      width: 70%;

      .van-slider__button {
        width: .3rem;
        height: .3rem;
      }
    }
  }

  .songControl {
    display: flex;
    width: 100%;
    justify-content: space-around;
    align-items: center;
    line-height: 2.2rem;
    color: #ffffff;

    .detaolsBroadcast {
      display: flex;
      align-items: center;
      border: .02rem solid #ffffff;
      width: 1rem;
      height: 1rem;
      border-radius: 1rem;

      .van-icon {
        margin: auto;
      }
    }
  }
}
</style>
