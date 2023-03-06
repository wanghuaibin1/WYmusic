<template>
  <div>
    <div class="itemMusicTop">
      <img v-if="w" :src="Singing.playlist.coverImgUrl" alt="" class="itemImg">
      <div class="itemLeft">
        <svg class="icon" aria-hidden="true" @click="$router.back()">
          <use xlink:href="#icon-xitongfanhui"></use>
        </svg>
        <span>歌单</span>
      </div>
      <div class="itemRight">
        <svg class="icon" aria-hidden="true ">
          <use xlink:href="#icon-z31sousuo"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-z31liebiao"></use>
        </svg>
      </div>
    </div>
    <div style="padding: 10px 20px;" v-if="w">
      <div style="width: 40%;position: relative;float: left;" @click="showPopup">
        <van-image width="100%" height="2.3rem" fit="cover" :src="Singing.playlist.coverImgUrl" lazy-load>
        </van-image>
        <span class="playbackVolume">
          <van-icon name="play-circle-o" />
          {{ formatNumber(Singing.playlist.playCount) }}
        </span>
      </div>

      <div style="margin-left: 10px;float: left;width: 57%;">
        <p style="color:#fff">{{ Singing.playlist.name }}</p>
        <div class="avatarUrl">
          <div style="position: relative;">
            <van-image round width=".5rem" height=".5rem" :src="Singing.playlist.creator.avatarUrl" />
            <div v-if="Singing.playlist.creator.avatarDetail.identityIconUrl" class="backgroundUrl">
              <van-image round width=".3rem" height=".3rem"
                :src="Singing.playlist.creator.avatarDetail.identityIconUrl" />
            </div>
          </div>
          <span class="nickname">{{ Singing.playlist.creator.nickname }}</span>
          <span class="guanzhu"><van-icon name="plus" />关注</span>
        </div>
      </div>
      <div class="description" @click="showPopup">
        <p>
          {{ Singing.playlist.description }}
        </p>
        <van-icon name="arrow" :size="20" />
      </div>
      <van-popup v-model="show" @click="show = false">
        <div class="songdetailed">
          <div>
            <van-image width="200px" height="200px" fit="cover" :src="Singing.playlist.coverImgUrl" lazy-load />
          </div>
          <p class="itemFm">{{ Singing.playlist.name }}</p>
        </div>
        <div class="itemLabel">
          <span>标签:</span>
          <span v-for="item, index in Singing.playlist.tags" :key="index" class="labelFor">{{ item }}</span>
        </div>
        <p style="white-space: pre-line;color: aliceblue;margin-top: .1rem;line-height: .5rem;">{{ Singing.playlist.description }}</p>
      </van-popup>
    </div>
  </div>
</template>

<script>
import { datailAPI } from '@/api'
export default {
  name: 'Item-muusic',
  data () {
    return {
      show: false,
      w: false,
      Singing: {}
    }
  },
  methods: {
    showPopup () {
      this.show = true
    },
    async dataolApi () {
      const { data: res } = await datailAPI({ id: this.$route.query.id })
      this.Singing = res
      this.w = true
    },
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
  props: {},
  watch: {},
  computed: {},
  created () {
    this.dataolApi()
  },
  mounted () { }
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
  margin: 5px 10px;
  flex-shrink: 0;
  flex-grow: 0;
}

/deep/.van-image__img {
  border-radius: 8px;
}

.itemMusicTop {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  .itemLeft,
  .itemRight {
    width: 25%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 20px;

    span {
      font-size: 20px;
      color: #eee;
    }

    .icon {
      fill: #ffffff;
      font-size: 25px
    }

  }

  .itemImg {
    width: 100%;
    height: 400px;
    position: absolute;
    z-index: -1;
    filter: blur(30px);
  }
}

.avatarUrl {
  display: flex;
  justify-content: flex-start;
  margin: .2rem 0;
  align-items: center;

  // height: .5rem;
  .nickname {
    color: #ffffff;
    font-size: .2rem;
    margin: 0 .2rem;
    white-space: pre-line
  }

  /deep/.backgroundUrl {
    position: absolute;
    bottom: -0.06rem;
    right: -0.1rem;
  }

  .guanzhu {
    width: 1rem;
    display: inline-block;
    height: .4rem;
    line-height: .4rem;
    text-align: center;
    font-size: .2rem;
    color: #ffffff;
    border-radius: .4rem;
    background-color: rgb(168 168 168 / 39%);
  }
}

.description {
  clear: both;
  width: 100%;
  height: 40px;
  line-height: .8rem;
  position: relative;
  font-size: .2rem;
  color: #fff2e0;

  .van-icon {
    position: absolute;
    width: 5%;
    line-height: .8rem;
    text-align: center;
    height: 100%;
    bottom: 0;
    right: 0;

  }
}

.description p {
  width: 95%;
  height: 100%;
  overflow: hidden;
}

.van-popup--center {
  width: 100%;
  height: 100%;
  background-color: rgb(147 115 115 / 1);
  padding: .2rem .5rem;

  .songdetailed {
    padding-top: 1rem;

    text-align: center;

    .itemFm {
      color: #ffffff;
      font-weight: 900;
      border-bottom: .02rem solid #979191;
      height: 1.4rem;
      line-height: 1.4rem;
      margin: auto;
    }
  }

  .itemLabel {
    display: flex;
    justify-content: flex-start;
    margin-top: .2rem;
    color: #fff2e0;
    font-size: .26rem;

    .labelFor {
      padding: .04rem .1rem;
      border-radius: .4rem;
      background-color: rgb(159 157 157 / 50%);
      margin-left: .2rem;
    }
  }
}</style>
