<template>
  <div>
    <img class="itemImg" :src="musicIt.al.picUrl" alt="">
    <div class="detaolsTop">
      <div @click="updateSongDetails"><van-icon name="arrow-left" /></div>
      <div class="detalsSong">
        <van-notice-bar :scrollable="musicIt.name.length >= 18 ? true : false" :text="musicIt.name" />
        <span>{{ musicIt.ar[0].name }}</span>
      </div>
      <div style="font-size: 25px;">
        <i style="font-size: 25px;" class="iconfont icon-fenxiang"></i>
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
          <p class="lrc">{{ curLyric[0] }}</p>
          <!-- <van-icon badge="99+" class="iconfont" class-prefix='icon' name='androidgengduo' /> -->
          <van-icon name="chat-o" badge="99+" color="#fff" />
        </div>
      </div>

    </div>
    <div v-show="show" class="songLyric" @click="show = !show">
        <p v-for="(item, i) in lyric" :key="i" :indeX=i :class="{ acter: (currenTime >= item[1]) }"
          :style="{ 'font-size': (currenTime >= item[1] && currenTime < songTime[(Number((Object.keys(lyric)).indexOf(i))) + 1]) || curLyric[1] === item[1] ? '25px' : '' }">
          {{ item[0] }}</p>
    </div>
    <div class="detaolsSongFence">
      <div class="songItem">
        <span>xx:xx</span>
        <van-progress :percentage="rate" stroke-width="2" pivot-text="1" />
        <span>{{ $store.state.songFore }}</span>
      </div>
      <div class="songControl">
        <i style="font-size: 25px;" class="iconfont icon-gl-repeatOnce2"></i>
        <i style="font-size: 25px;" class="iconfont icon-shangyishoushangyige"></i>
        <div class="detaolsBroadcast"
          :style="{ backgroundColor: (broadcast ? 'rgb(111,51,59)' : 'initial'), border: (broadcast ? 'none' : '') }"
          @click="broa">
          <van-icon size="30" :name="(!broadcast ? 'pause' : 'play')" />
        </div>
        <i style="font-size: 25px;" class="iconfont icon-xiayigexiayishou"></i>
        <i style="font-size: 25px;" class="iconfont icon-bofangliebiao"></i>
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
      show: false
    }
  },
  methods: {
    ...mapMutations(['updateSongDetails'])

  },
  components: {},
  props: ['musicIt', 'broa', 'zz'],
  watch: {
    currenTime () {
      this.songTime.forEach((element, index) => {
        if (element === this.curLyric[1]) {
          document.querySelector('.songLyric').scrollTop = -200 + index * 40
        }
      })
    },
    zz () {
      this.show = false
    }
  },
  computed: {
    ...mapState(['broadcast', 'curLyric', 'lyric', 'rate', 'currenTime', 'songTime'])
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
  filter: blur(120px);
  transform: scale(2);
  z-index: -1;
}

.detaolsTop {
  display: flex;
  justify-content: space-around;
  font-size: 20px;
  align-items: center;
  color: #ffff;

  .detalsSong {
    width: 50%;
    padding-top: 10px;
    font-size: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .van-notice-bar {
      width: 100%;
      height: 24px;
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
      height: 200px;
      margin: auto;
      background-color: rgba(109, 104, 110, .6);
      border-radius: 10px;
    }

    div:nth-child(2) {
      width: 70%;
      height: 220px;
      background-color: rgba(205, 203, 204, .8);
      border-radius: 10px;
    }

    div:nth-child(3) {
      width: 60%;
      height: 250px;

      img {
        width: 100%;
        height: 100%;
        border-radius: 10px;
      }
    }
  }

  .contentSong {
    display: grid;
    align-items: center;
    flex: 1;
    overflow: overlay;
    padding: 0 10px;
    transition: all .2s;
    width: 100%;

    .lrcContent {
      display: flex;
      justify-content: space-around;
      align-items: center;

      .van-icon,
      .icon {
        font-size: 25px;
        position: relative;
        overflow: visible;
      }

      p {
        width: 70%;
      }
    }

    .lrc {
      font-size: 14px;
      line-height: 35px;
      color: #fff;
      text-align: center;
    }
  }
}

.songLyric {
  width: 102%;
  height: 70vh;
  overflow: overlay;
  padding: 20px 0;
  position: relative;
  scroll-behavior: smooth;
  div {
    position: absolute;
    // top: 50%;
    width: 100%;
  }

  p {
    font-size: 15px;
    line-height: 40px;
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
    padding: 0 10px;

    .van-progress {
      width: 70%;

      /deep/.van-progress__pivot {
        color: #1989fa;
        font-weight: 100;
        width: 10px;
        overflow: hidden;
        height: 10px;
        border-radius: 50px;
        line-height: 0;
        min-width: 0;
      }
    }
  }

  .songControl {
    display: flex;
    width: 100%;
    justify-content: space-around;
    align-items: center;
    line-height: 110px;
    color: #ffffff;

    .detaolsBroadcast {
      display: flex;
      align-items: center;
      border: 1px solid #ffffff;
      width: 50px;
      height: 50px;
      border-radius: 50px;

      .van-icon {
        margin: auto;
      }
    }
  }
}
</style>
