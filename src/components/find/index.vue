<template>
    <div>
        <!-- 轮播图 -->
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item style="background-color: transparent" v-for="obj in banner" :key="obj.bannerId">
                <img style=" width: 100%;
                                    height: 100%;
                                    object-fit: cover;
                                    padding: 10px;
                                    border-radius: 19.5px;
                                  " :src="obj.pic" alt="" />
                <span class="typeTitle">{{ obj.typeTitle }}</span>
            </van-swipe-item>
        </van-swipe>
        <!-- 标签导航栏 -->
        <div class="labelBar">
            <span class="ic" v-for="item, index in icOn" :key="index">
                <svg style="font-size: 25px" class="icon" aria-hidden="true">
                    <use :xlink:href=item.icXlink></use>
                </svg>
                <span class="sp">{{ item.name }}</span>
            </span>
        </div>
        <!-- 推荐歌单 -->
        <div class="recommend-songSheet">
            <p class="title">推荐歌单
                <span>
                    <svg style="font-size: 25px" class="icon" aria-hidden="true">
                        <use xlink:href="#icon-fangxiangxia"></use>
                    </svg>
                </span>
            </p>
            <keep-alive>

            <lazy-component>
                    <div class="songFence" v-if="w">
                        <Song v-for="obj in persoan" :key="obj.id" :picUrl="obj.picUrl" :name="obj.name"
                            :playCount="obj.playCount" :id="obj.id" />
                    </div>
            </lazy-component>
        </keep-alive>

        </div>

    </div>
</template>

<script>
import { bannerAPI, personalizedAPI } from '@/api'
import Song from '@/components/SongSheet'
import { mapMutations } from 'vuex'

export default {
  name: 'Fi-nd',
  data () {
    return {
      icOn: [
        { name: '每日推荐', icXlink: '#icon-rili1' },
        { name: '私人FM', icXlink: '#icon-sharpicons_radio' },
        { name: '歌单', icXlink: '#icon-gedan' },
        { name: '排行榜', icXlink: '#icon-paihangbang' },
        { name: '数字专辑', icXlink: '#icon-zhuanji' }
      ],
      banner: [], // 轮播图数据
      persoan: [], // 推荐歌单数据
      w: false
    }
  },
  methods: {
    ...mapMutations(['updataCookie']),
    // 轮播图
    async bannerApi () {
      const { data: res } = await bannerAPI()
      this.banner = res.banners
    },
    // 推荐歌单
    async perSonalizeApi () {
      const { data: res } = await personalizedAPI()
      this.persoan = res.result
      this.w = true
    }
  },
  components: {
    Song

  },
  props: {},
  watch: {},
  computed: {},
  created () {
    this.bannerApi()
    this.perSonalizeApi()
  },
  mounted () { }
}
</script>
<style lang="less" scoped>
.van-field__control {
    border-radius: 10px;
}

.van-search__content--round {
    background-color: rgb(54 125 125 / 20%);
}

/deep/.van-field__control {
    color: #fff;
}

.my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
}

.my-swipe .van-swipe__track .van-swipe-item {
    height: 150px;
    background-color: transparent;
}

.typeTitle {
    position: absolute;
    bottom: 17px;
    right: 19px;
    height: 20px;
    width: 60px;
    background-color: #fff;
    color: #000;
    border-radius: 5px;
    line-height: 20px;
    font-size: 10px;
}

.labelBar {
    display: flex;
    justify-content: space-around;
    margin-top: 10px;

    .ic {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .sp {
        font-size: 10px;
        color: #d2d2d2;
        margin-top: 10px;
        font-weight: 100;
        font-family: 楷体;
    }
}

.recommend-songSheet {
    height: 225px;
    overflow: hidden;

    .title {
        padding: 13.335px 12px;
        margin: .2rem 0 0 0;
        background-color: rgba(0, 0, 0, 0);
        color: #ffffff;
        font-size: .4rem;
    }

    .songFence {
        display: flex;
        width: 100%;
        height: 175px;
        overflow-x: auto;

    }
}
</style>
