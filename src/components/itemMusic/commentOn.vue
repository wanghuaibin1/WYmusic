<template>
  <!-- 歌单评论 -->
  <div  style="background-color: #ffff;">
    <!-- 头部栏 -->
    <van-sticky>
      <div class="itemMusicTop">
        <div class="itemLeft" style="width: 45%;">
          <svg class="icon" aria-hidden="true" @click="$router.back()">
            <use xlink:href="#icon-xitongfanhui-copy"></use>
          </svg>
          <span style="margin-left: .2rem;">歌单</span>
        </div>
        <div class="itemRight" style="justify-content: center">
          <svg class="icon" aria-hidden="true ">
            <use xlink:href="#icon-fenxiang-m"></use>
          </svg>
        </div>
      </div>
    </van-sticky>
    <div class="songSheetInfor" @click="$router.back()">
      <img :src="item.coverImgUrl" alt="">
      <div>
        <p class="song_name">{{ item.name }}</p>
        <p style="font-size: 12px;color:aqua">{{ item.nick }}</p>
      </div>
      <span style="display: flex;align-items: center;font-size: 20px;">
        <van-icon name="arrow" />
      </span>
    </div>
    <!-- /评论区 -->
    <div class="commentDistinguish" v-if="playlist">
      <van-sticky :offset-top="50">
        <div style="display: flex;justify-content: space-between;line-height: 30px;background-color: rgba(255,255,255,1); ">
          <span style="margin-left: 10px;">评论区</span>
          <div style="width: 40%;display: flex;justify-content: space-around;">
            <span>推荐</span><span>最热</span><span>最新</span>
          </div>
        </div>
      </van-sticky>

      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div class="box" v-for="obj in playlist" :key="obj.commentId">
          <!-- 评论者信息 -->
          <div class="distinUser">
            <div class="user">
              <img :src="obj.user.avatarUrl" alt="">
              <div style="margin-left: 10px;">
                <p style="font-size: 15px;">{{ obj.user.nickname }}</p>
                       <p style="font-size: 10px;color: aqua; font-weight: 100;">{{ obj.timeStr }}&nbsp;{{ obj.ipLocation.location }}</p>
              </div>
            </div>
            <span style="font-size: 15px;color: #00a1ff;">
              {{ obj.likedCount>0?obj.likedCount:'' }}<van-icon  name="good-job" />
            </span>
          </div>
          <!-- 内容区 -->
          <div class="item">
            <p style="white-space: pre-wrap;">{{obj.content }}</p>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
import { playlistAPI } from '@/api'
export default {
  name: 'Comment-On',
  data () {
    return {
      playlist: '',
      id: this.$route.query.id,
      item: this.$route.query.item,
      limit: 50,
      offset: 1,
      loading: true,
      finished: false
    }
  },
  methods: {
    async playListApi () {
      const { data: res } = await playlistAPI({ id: this.id, limit: this.limit, offset: (this.offset - 1) * 50 })
      // this.playlist = res
      this.playlist = [...this.playlist, ...res.comments]
      this.loading = false
      if (res.comments < 50) {
        this.finished = true
      }
    },
    onLoad () {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        // 加载状态结束
        // this.loading = false
        this.offset++
        this.playListApi()
        // 数据全部加载完成
        // if (this.list.length >= 40) {
        //   this.finished = true
        // }
      }, 1000)
    }
  },
  components: {},
  props: {},
  watch: {},
  computed: {},
  created () {
    this.playListApi()
  },
  mounted () { }
}
</script>
<style lang="less" scoped>
.itemMusicTop {
  width: 100%;
  height: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
background-color: rgba(255,255,255,1);
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
      color: #1f1f1f;
    }

    .icon {
      fill: #2a2a2a;
      font-size: .5rem
    }

  }
}

.songSheetInfor {
  display: flex;
  padding: 10px 15px;
  align-items: center;
  justify-content: space-around;
  border-bottom: 10px solid #e7e7e7;

  img {
    width: 100px;
    height: 100px;
    border-radius: 10px;
  }

  p {
    line-height: 25px;
    margin: 6.25px 5px;
    Letter-spacing: 3px
  }

  .song_name {
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
    color: #000000;
  }
}

.commentDistinguish {
  .van-list{
    padding-bottom: 70px;
  }
  .box {
    display: flex;
    flex-direction: column;
    .distinUser {
      display: flex;
      justify-content: space-between;
      padding: 10px 20px 0 10px;
      align-items: center;

      .user {
        display: flex;

        p {
          line-height: 25px;
        }
      }

      p {
        margin: 0;
      }

      img {
        width: 50px;
        height: 50px;
        border-radius: 50px;
      }
    }

    .item {
      align-self:flex-end;
      padding-right: 20px;
      width: 80%;
      border-bottom: 1px solid #8f8f8f;
      p{
        line-height: 20px;
        font-weight: 100;
      }
    }
  }
}
</style>
