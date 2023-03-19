<template>
     <!-- 歌单内歌曲 -->
     <div class="sheetSong" ref="itemMusic" v-if="Object.keys(track).length !== 0">
      <van-sticky  :offset-top="50"  >
        <div class="broadcastSong">
          <div class="songLift">
            <span><van-icon size=".4rem" color="red" name="play-circle" /></span>
            <span style="font-size: .3rem;">播放全部</span>
            <span style="font-size: .2rem;">{{ "(" + track.length + ")" }}</span>
          </div>
          <div class="songRight">
            <span><van-icon name="down" /></span>
            <span><van-icon name="orders-o" /></span>
          </div>
        </div>
      </van-sticky>
      <div class="song">
        <div class="songItem" v-for="obj, index in track" :key="obj.id">
          <span class="songIndex">{{ index + 1 }}</span>
          <div class="songName" @click="bofang(index)">
            <p>{{ obj.name }}</p>
            <p v-if="obj.ar.length === 0">{{ obj.ar[0].name + "—" + obj.al.name }} </p>
            <p v-else>{{ author(obj.ar) + "—" + obj.al.name }}</p>
          </div>
          <div class="songIcon">
            <span>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-shipinbofang"></use>
              </svg>
            </span>
            <span>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-androidgengduo"></use>
              </svg></span>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'Mu-sic',
  data () {
    return {
    }
  },
  methods: {
    ...mapMutations(['updataplayList', 'updataplayListIndex', 'updataBroadcast']),
    // 歌曲作者拼接
    author (obj) {
      const name = []
      obj.map(item => {
        return name.push(item.name)
      })
      return name.join('/')
    },
    bofang (index) {
      this.updataplayList(this.track)
      this.updataplayListIndex(index)
      this.updataBroadcast(false)
    }
  },
  components: {},
  props: {
    track: {
      default: false
    }
  },
  watch: {},
  computed: {},
  created () {},
  mounted () {}
}
</script>
<style lang="less" scoped>
[v-cloak]{
  display: none;
}
.sheetSong {
  width: 100%;
  background-color: #ffffff;
  border-radius: 10px 10px 0 0;

  .broadcastSong {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 50px;
    text-align: center;
    background-color: rgb(255, 255, 255);

    // .songLift,.songRight{
    //   display: flex;
    // justify-content: space-between;
    // }
    .songLift span {
      margin-left: 20px;
    }

    .songRight span {
      margin-right: 20px;
      font-size: 20px;
    }
  }

  .song {
padding-bottom: 70px;
    .songItem {
      height: 50px;
      line-height: 50px;
      display: flex;
      align-items: center;

      .songIndex {
        flex: 1.5;
        text-align: center;
        color: #dd6868;
      }

      .songName {
        flex: 6.5;
        overflow: hidden;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      .songName p {
        line-height: 15px;
        height: 15px;
        font-size: 10px;
        margin: 0;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      .songName p:nth-child(2) {
        color: #787878;
      }

      .songIcon span {
        margin-right: 20px;

        font-size: 20px;
        flex-grow: 2;
      }
    }

  }
}
</style>
