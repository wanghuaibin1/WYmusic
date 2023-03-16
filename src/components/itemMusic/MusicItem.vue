    <!-- 歌单 头部 和 歌曲 -->
<template>
  <div v-if="w">
    <div :style="{ backgroundImage: 'url(' + (specialType === 100 ? Singing.backgroundCoverUrl : '') + ')' }"
      class="backImg">
      <!-- 头部栏 -->
      <van-sticky>
        <div class="itemMusicTop" :style="{ backgroundColor: backgroundColor }">
          <!-- <img v-if="w" :src="Singing.backgroundCoverUrl" alt="" class="itemImg"> -->
          <div class="itemLeft" style="width: 60%;">
            <svg class="icon" aria-hidden="true" @click="$router.back()">
              <use xlink:href="#icon-xitongfanhui"></use>
            </svg>
            <van-notice-bar v-if="specialType === 100" scrollable text="官方动态歌单" />
            <span v-else-if="specialType === 0&&q" style="margin-left: .2rem;">歌单</span>
            <van-notice-bar v-else scrollable :text="Singing.name" />
            <!-- <span v-else-if="specialType === 100" style="margin-left: .2rem;">官方动态歌单</span> -->
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

      <div style="padding: 10px 20px;">
        <!-- 用户歌单 -->
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
                <div v-if="Singing.creator.avatarDetail" class="backgroundUrl">
                  <van-image round width=".3rem" height=".3rem" fit="fill"
                    :src="Singing.creator.avatarDetail.identityIconUrl" />
                </div>
              </div>
              <span class="nickname">{{ Singing.creator.nickname }}</span>
              <span class="guanzhu"><van-icon name="plus" />关注</span>

            </div>
            <div class="algTags" v-if="Singing.algTags">
              <span v-for="obj, index in Singing.algTags" :key="index">{{ obj }}</span>
            </div>
          </div>
        </div>
        <!-- 官方歌单 -->
        <div v-else-if="specialType === 100" @click="showPopup">
          <div class="authority">
            <p>{{ Singing.name }}</p>
            <p>{{ Singing.updateFrequency }}</p>
          </div>
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
        <span  @click="showShare = true"><van-icon name="share-o"/>{{ Singing.shareCount }}</span>
        <span
          @click="$router.push({ path: '/comment', query: { id, item: { coverImgUrl: Singing.coverImgUrl, name: Singing.name, nick: Singing.creator.nickname } } })"><van-icon
            name="chat-o" />{{ Singing.commentCount }}</span>
        <span style="background-color: red;"><van-icon name="add-o" />{{ formatNumber(Singing.subscribedCount) }}</span>
      </div>
    </div>
    <Music :track="track"></Music>
    <div style="margin: auto;" v-if="track" aria-label="Orange and tan hamster running in a metal wheel" role="img"
      class="wheel-and-hamster">
      <div class="wheel"></div>
      <div class="hamster">
        <div class="hamster__body">
          <div class="hamster__head">
            <div class="hamster__ear"></div>
            <div class="hamster__eye"></div>
            <div class="hamster__nose"></div>
          </div>
          <div class="hamster__limb hamster__limb--fr"></div>
          <div class="hamster__limb hamster__limb--fl"></div>
          <div class="hamster__limb hamster__limb--br"></div>
          <div class="hamster__limb hamster__limb--bl"></div>
          <div class="hamster__tail"></div>
        </div>
      </div>
      <div class="spoke"></div>
    </div>
    <van-share-sheet v-model="showShare" title="立即分享给好友" :options="options" />
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
      id: this.$route.query.id,
      show: false,
      w: false,
      // 歌单详情
      Singing: '',
      // 歌单所有歌曲
      track: {},
      backgroundColor: '',
      specialType: '',
      showShare: false,
      options: [
        { name: '微信', icon: 'wechat' },
        { name: '微博', icon: 'weibo' },
        { name: '复制链接', icon: 'link' },
        { name: '分享海报', icon: 'poster' },
        { name: '二维码', icon: 'qrcode' }
      ],
      q: true
    }
  },
  methods: {
    showPopup () {
      this.show = true
    },
    // 歌单详情
    async dataolApi () {
      const { data: res } = await datailAPI({ id: this.id })
      this.Singing = res.playlist
      this.specialType = res.playlist.specialType

      if (this.specialType === 300) {
        this.$toast('此歌但暂时不能用')
        this.$router.back()
      }
      this.trackall()
      this.w = true
    },
    // 歌曲
    async trackall () {
      const { data: res } = await trackAllAPI({ id: this.id })
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
      if (scrollTop >= 100) {
        this.q = false
      } else {
        this.q = true
      }
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
      // height: 1.4rem;
      line-height: 1rem;
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

.authority {
  width: 100%;
  height: 100px;
  // padding-top: 50px;
  display: flex;
  flex-direction: column;
}

.authority p:nth-child(1) {
  text-align: center;
  color: #ffffff;
  font-size: .4rem;
  font-weight: 900;
  margin: .1rem;
}

.authority p:nth-child(2) {
  text-align: center;
  font-size: .2rem;
  color: #838383;
}

.backImg {
  background-repeat: no-repeat;
  background-size: cover;
  padding-bottom: .6rem;
}

.wheel-and-hamster {
  --dur: 1s;
  position: relative;
  width: 12em;
  height: 12em;
  font-size: 14px;
}

.wheel,
.hamster,
.hamster div,
.spoke {
  position: absolute;
}

.wheel,
.spoke {
  border-radius: 50%;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.wheel {
  background: radial-gradient(100% 100% at center, hsla(0, 0%, 60%, 0) 47.8%, hsl(0, 0%, 60%) 48%);
  z-index: 2;
}

.hamster {
  animation: hamster var(--dur) ease-in-out infinite;
  top: 50%;
  left: calc(50% - 3.5em);
  width: 7em;
  height: 3.75em;
  transform: rotate(4deg) translate(-0.8em, 1.85em);
  transform-origin: 50% 0;
  z-index: 1;
}

.hamster__head {
  animation: hamsterHead var(--dur) ease-in-out infinite;
  background: hsl(30, 90%, 55%);
  border-radius: 70% 30% 0 100% / 40% 25% 25% 60%;
  box-shadow: 0 -0.25em 0 hsl(30, 90%, 80%) inset, 0.75em -1.55em 0 hsl(30, 90%, 90%) inset;
  top: 0;
  left: -2em;
  width: 2.75em;
  height: 2.5em;
  transform-origin: 100% 50%;
}

.hamster__ear {
  animation: hamsterEar var(--dur) ease-in-out infinite;
  background: hsl(0, 90%, 85%);
  border-radius: 50%;
  box-shadow: -0.25em 0 hsl(30, 90%, 55%) inset;
  top: -0.25em;
  right: -0.25em;
  width: 0.75em;
  height: 0.75em;
  transform-origin: 50% 75%;
}

.hamster__eye {
  animation: hamsterEye var(--dur) linear infinite;
  background-color: hsl(0, 0%, 0%);
  border-radius: 50%;
  top: 0.375em;
  left: 1.25em;
  width: 0.5em;
  height: 0.5em;
}

.hamster__nose {
  background: hsl(0, 90%, 75%);
  border-radius: 35% 65% 85% 15% / 70% 50% 50% 30%;
  top: 0.75em;
  left: 0;
  width: 0.2em;
  height: 0.25em;
}

.hamster__body {
  animation: hamsterBody var(--dur) ease-in-out infinite;
  background: hsl(30, 90%, 90%);
  border-radius: 50% 30% 50% 30% / 15% 60% 40% 40%;
  box-shadow: 0.1em 0.75em 0 hsl(30, 90%, 55%) inset, 0.15em -0.5em 0 hsl(30, 90%, 80%) inset;
  top: 0.25em;
  left: 2em;
  width: 4.5em;
  height: 3em;
  transform-origin: 17% 50%;
  transform-style: preserve-3d;
}

.hamster__limb--fr,
.hamster__limb--fl {
  clip-path: polygon(0 0, 100% 0, 70% 80%, 60% 100%, 0% 100%, 40% 80%);
  top: 2em;
  left: 0.5em;
  width: 1em;
  height: 1.5em;
  transform-origin: 50% 0;
}

.hamster__limb--fr {
  animation: hamsterFRLimb var(--dur) linear infinite;
  background: linear-gradient(hsl(30, 90%, 80%) 80%, hsl(0, 90%, 75%) 80%);
  transform: rotate(15deg) translateZ(-1px);
}

.hamster__limb--fl {
  animation: hamsterFLLimb var(--dur) linear infinite;
  background: linear-gradient(hsl(30, 90%, 90%) 80%, hsl(0, 90%, 85%) 80%);
  transform: rotate(15deg);
}

.hamster__limb--br,
.hamster__limb--bl {
  border-radius: 0.75em 0.75em 0 0;
  clip-path: polygon(0 0, 100% 0, 100% 30%, 70% 90%, 70% 100%, 30% 100%, 40% 90%, 0% 30%);
  top: 1em;
  left: 2.8em;
  width: 1.5em;
  height: 2.5em;
  transform-origin: 50% 30%;
}

.hamster__limb--br {
  animation: hamsterBRLimb var(--dur) linear infinite;
  background: linear-gradient(hsl(30, 90%, 80%) 90%, hsl(0, 90%, 75%) 90%);
  transform: rotate(-25deg) translateZ(-1px);
}

.hamster__limb--bl {
  animation: hamsterBLLimb var(--dur) linear infinite;
  background: linear-gradient(hsl(30, 90%, 90%) 90%, hsl(0, 90%, 85%) 90%);
  transform: rotate(-25deg);
}

.hamster__tail {
  animation: hamsterTail var(--dur) linear infinite;
  background: hsl(0, 90%, 85%);
  border-radius: 0.25em 50% 50% 0.25em;
  box-shadow: 0 -0.2em 0 hsl(0, 90%, 75%) inset;
  top: 1.5em;
  right: -0.5em;
  width: 1em;
  height: 0.5em;
  transform: rotate(30deg) translateZ(-1px);
  transform-origin: 0.25em 0.25em;
}

.spoke {
  animation: spoke var(--dur) linear infinite;
  background: radial-gradient(100% 100% at center, hsl(0, 0%, 60%) 4.8%, hsla(0, 0%, 60%, 0) 5%), linear-gradient(hsla(0, 0%, 55%, 0) 46.9%, hsl(0, 0%, 65%) 47% 52.9%, hsla(0, 0%, 65%, 0) 53%) 50% 50% / 99% 99% no-repeat;
}

/* Animations */
@keyframes hamster {

  from,
  to {
    transform: rotate(4deg) translate(-0.8em, 1.85em);
  }

  50% {
    transform: rotate(0) translate(-0.8em, 1.85em);
  }
}

@keyframes hamsterHead {

  from,
  25%,
  50%,
  75%,
  to {
    transform: rotate(0);
  }

  12.5%,
  37.5%,
  62.5%,
  87.5% {
    transform: rotate(8deg);
  }
}

@keyframes hamsterEye {

  from,
  90%,
  to {
    transform: scaleY(1);
  }

  95% {
    transform: scaleY(0);
  }
}

@keyframes hamsterEar {

  from,
  25%,
  50%,
  75%,
  to {
    transform: rotate(0);
  }

  12.5%,
  37.5%,
  62.5%,
  87.5% {
    transform: rotate(12deg);
  }
}

@keyframes hamsterBody {

  from,
  25%,
  50%,
  75%,
  to {
    transform: rotate(0);
  }

  12.5%,
  37.5%,
  62.5%,
  87.5% {
    transform: rotate(-2deg);
  }
}

@keyframes hamsterFRLimb {

  from,
  25%,
  50%,
  75%,
  to {
    transform: rotate(50deg) translateZ(-1px);
  }

  12.5%,
  37.5%,
  62.5%,
  87.5% {
    transform: rotate(-30deg) translateZ(-1px);
  }
}

@keyframes hamsterFLLimb {

  from,
  25%,
  50%,
  75%,
  to {
    transform: rotate(-30deg);
  }

  12.5%,
  37.5%,
  62.5%,
  87.5% {
    transform: rotate(50deg);
  }
}

@keyframes hamsterBRLimb {

  from,
  25%,
  50%,
  75%,
  to {
    transform: rotate(-60deg) translateZ(-1px);
  }

  12.5%,
  37.5%,
  62.5%,
  87.5% {
    transform: rotate(20deg) translateZ(-1px);
  }
}

@keyframes hamsterBLLimb {

  from,
  25%,
  50%,
  75%,
  to {
    transform: rotate(20deg);
  }

  12.5%,
  37.5%,
  62.5%,
  87.5% {
    transform: rotate(-60deg);
  }
}

@keyframes hamsterTail {

  from,
  25%,
  50%,
  75%,
  to {
    transform: rotate(30deg) translateZ(-1px);
  }

  12.5%,
  37.5%,
  62.5%,
  87.5% {
    transform: rotate(10deg) translateZ(-1px);
  }
}

@keyframes spoke {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(-1turn);
  }
}
.van-notice-bar{
  width: 100%;
  background-color: inherit;
}
</style>
