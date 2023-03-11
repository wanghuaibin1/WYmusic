    <!-- 歌单详情 -->
<template>
  <div v-if="w">
    <div  :style="{ backgroundImage: 'url(' + Singing.backgroundCoverUrl + ')' }" class="backImg">
      <!-- 头部栏 -->
      <van-sticky>
        <div class="itemMusicTop" :style="{ backgroundColor: backgroundColor }">
          <!-- <img v-if="w" :src="Singing.backgroundCoverUrl" alt="" class="itemImg"> -->
          <div class="itemLeft" style="width: 45%;">
            <svg class="icon" aria-hidden="true" @click="$router.back()">
              <use xlink:href="#icon-xitongfanhui"></use>
            </svg>
            <span v-if="specialType === 0" style="margin-left: .2rem;">歌单</span>
            <span v-else-if="specialType === 100" style="margin-left: .2rem;">官方动态歌单</span>
          </div>
          <div class="itemRight" style="justify-content: space-between">
            <svg class="icon" aria-hidden="true ">
              <use xlink:href="#icon-z31sousuo"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-z31liebiao"></use>
            </svg>
          </div>
        </div>
      </van-sticky>
      <!-- 用户歌单 -->
      <div style="padding: 10px 20px;">
        <div v-if="specialType === 0">
          <div style="width: 40%;position: relative;float: left;" @click="showPopup">
            <van-image width="100%" fit="contain" :src="Singing.coverImgUrl" lazy-load>
            </van-image>
            <span class="playbackVolume">
              <van-icon name="play-circle-o" />
              {{ formatNumber(Singing.playCount) }}
            </span>
          </div>
          <div style="margin-left: 10px;float: left;width: 57%;">
            <p style="color:#fff">{{ Singing.name }}</p>
            <div class="avatarUrl">
              <div style="position: relative;">
                <van-image round width=".5rem" height=".5rem" :src="Singing.creator.avatarUrl" />
              <div v-if="Singing.creator.avatarDetail.identityIconUrl" class="backgroundUrl">
                <van-image round width=".3rem" height=".3rem" fit="fill"
                  :src="Singing.creator.avatarDetail.identityIconUrl" />
                              </div>
              </div>
              <span class="nickname">{{ Singing.creator.nickname }}</span>
              <span class="guanzhu"><van-icon name="plus" />关注</span>

            </div>
            <div class="algTags" v-if="Singing.algTags">
              <span v-for="obj, index in Singing.algTags" :key="index">{{ obj + ">" }}</span>
            </div>
          </div>
        </div>
        <!-- 官方歌单 -->
        <div v-else-if="specialType === 100"  @click="showPopup">
          <div class="authority" >
            <p>{{ Singing.name }}</p>
            <p>{{ Singing.updateFrequency }}</p>
          </div>
        </div>
        <!-- 其他歌单 -->
        <div v-else>
          {{ this.$toast('其他歌单') }}
        </div>
        <div class="description" @click="showPopup">
          <p>
            {{ Singing.description }}
          </p>
          <van-icon name="arrow" :size="20" />
        </div>
        <!-- 遮盖层 -->
        <van-popup v-model="show" @click="show = false">
          <div class="songdetailed">
            <div>
              <van-image width="200px" height="200px" fit="cover" :src="Singing.coverImgUrl" lazy-load />
            </div>
            <p class="itemFm">{{ Singing.name }}</p>
          </div>
          <div class="itemLabel">
            <span>标签:</span>
            <span v-for="item, index in Singing.tags" :key="index" class="labelFor">{{ item }}</span>
          </div>
          <p style="white-space: pre-line;color: aliceblue;margin-top: .1rem;line-height: .5rem;font-size: 10px;">{{
            Singing.description }}</p>
        </van-popup>
      </div>
      <!-- 收藏 分享 -->
      <div class="itemIcon">
        <span><van-icon name="share-o" />{{ Singing.shareCount }}</span>
        <span><van-icon name="chat-o" />{{ Singing.commentCount }}</span>
        <span><van-icon name="add-o" />{{ formatNumber(Singing.subscribedCount) }}</span>
      </div>
    </div>
    <Music :track="track"></Music>
  </div>
  <van-loading v-else size="24px" vertical color="#0094ff"> 加载中...</van-loading>
</template>

<script>
import { datailAPI, trackAllAPI } from '@/api'
import Music from '@/components/itemMusic/Music.vue'
export default {
  name: 'Item-muusic',
  data () {
    return {
      show: false,
      w: false,
      // 歌单详情
      Singing: '',
      // 歌单所有歌曲
      track: {},
      backgroundColor: '',
      specialType: ''
    }
  },
  methods: {
    showPopup () {
      this.show = true
    },
    // 歌单详情
    async dataolApi () {
      const { data: res } = await datailAPI({ id: this.$route.query.id })
      this.Singing = res.playlist
      this.specialType = res.playlist.specialType
      this.trackall()
      this.w = true
    },
    // 歌曲
    async trackall () {
      const { data: res } = await trackAllAPI({ id: this.$route.query.id })
      this.track = res.songs
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
    },
    // 添加这个handleScroll方法来获取滚动的位置
    handleScroll () {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      // const offsetTop = document.querySelector('.sheetSong').offsetTop

      // 设置背景颜色的透明读
      if (scrollTop) {
        this.backgroundColor = `rgba(0, 0, 0,${scrollTop / (scrollTop + 40)})`
      } else if (scrollTop === 0) {
        this.backgroundColor = 'transparent'
      }
    }
    //   收藏歌单/取消歌单    暂时不能使用
    // async subscribeApi () {
    //   const { data: res } = await subscribeAPI({ t: this.t, id: this.$route.query.id, headers: this.$store.state.cookie })
    //   console.log(res)
    // }
  },
  created () {
    this.dataolApi()
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll) // 监听页面滚动
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  components: {
    Music
  }
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
  margin: .1rem .2rem;
  flex-shrink: 0;
  flex-grow: 0;
}

/deep/.van-image__img {
  border-radius: 8px;
}

.itemMusicTop {
  width: 100%;
  height: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  // opacity: 0;
  .itemLeft,
  .itemRight {
    width: 25%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 0 .4rem;

    span {
      font-size: 20px;
      color: #eee;
    }

    .icon {
      fill: #ffffff;
      font-size: .5rem
    }

  }

  .itemImg {
    z-index: -1;
    width: 100%;
    height: 9rem;
    position: absolute;
    z-index: -1;
    position: fixed;
    top: 0;
    left: 0;
    filter: blur(.6rem);
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
    font-size: .15rem;
    color: #ffffff;
    border-radius: .4rem;
    background-color: rgb(168 168 168 / 39%);
  }

}

.algTags {
  width: 100%;
  height: .4rem;
  line-height: .4rem;
  display: flex;

}

.algTags span {
  padding: 0 .1rem;
  margin-right: .2rem;
  border-radius: .06rem;
  background-color: rgba(178, 178, 178, 0.5);
  color: #ffffff;
  font-size: .2rem;
}

.description {
  clear: both;
  width: 100%;
  height: .8rem;
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
}

.itemIcon {
  width: 100%;
  height: .8rem;
  line-height: .8rem;
  color: #ffffff;
  display: flex;
  justify-content: space-around;

  .van-icon {
    margin-right: .1rem;
  }
}

.itemIcon span {
  font-size: .26rem;
  padding: 0 .4rem;
  border-radius: .5rem;
  background-color: rgb(178 178 178 / 50%);
}
.authority{
  width: 100%;
  height: 100px;
  // padding-top: 50px;
  display: flex;
  flex-direction: column;
}
.authority p:nth-child(1){
  text-align: center;
  color: #ffffff;
  font-size: .4rem;
  font-weight: 900;
  margin: .1rem;
}
.authority p:nth-child(2){
  text-align: center;
  font-size: .2rem;
  color: #cdb6b6;
}
.backImg{
  background-repeat: no-repeat;
background-size: cover;
padding-bottom: .6rem;
}
</style>
