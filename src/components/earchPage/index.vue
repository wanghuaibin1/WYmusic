<template>
  <!-- 搜索组件 -->
  <div>
    <!-- 顶部搜索 -->
    <van-row gutter="0" type="flex" justify="center">
      <van-col span="0"  @click="$router.push('/')">
        <svg style="font-size: .5rem;margin-left: .2rem;" class="icon" aria-hidden="true">
          <use xlink:href="#icon-xitongfanhui" ></use>
        </svg>
      </van-col>

      <van-col span="17">
        <van-search
          class="seach"
          shape="round"
          background="rgba(0, 0, 0, 0)"
          v-model.trim="value"
          @input="searchPropose"
          @search="search"
          placeholder="请输入搜索关键词"
          :autofocus="true"
          @clear="suggest=[],searchResult=[],page = 1"
        />
      </van-col>
      <van-col>
        <span style="color: #fff; margin-right: 0.3rem" @click="search(value)">
          搜索</span
        >
      </van-col>
    </van-row>
    <div  class="d">
    <!-- 搜索建议 -->
    <template v-if="suggest.length !==0">
      <div
        v-for="(item, index) in suggest"
        :key="index"
        class="suggestedResults"
        @click="search(item.keyword)"
      >
        <p>{{ item.keyword }}</p>
      </div>
    </template>
    <!-- 搜索结果 -->
    <template v-else-if="searchResult.length !==0">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <SongItem
          v-for="obj in searchResult"
          :key="obj.id"
          :name="obj.name"
          :author="obj.artists[0].name"
          :id="obj.id"
        >
        </SongItem>
      </van-list>
    </template>
    <!-- 热搜 -->
      <div class="main" v-else>
      <div class="currentplaying">
        <p class="heading">热搜榜</p>
      </div>
      <div class="loader" v-for="obj,index in hotSearch" :key="index">
        <div class="song" @click="searHotClick(obj.first)">
          <p class="artist"><span>{{ index+1 }}</span>{{ obj.first }}</p>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import { searchSuggestAPI, searchAPI, searHotAPI } from '@/api'
import SongItem from '@/components/SongItem'
export default {
  name: 'SearchPage',
  data () {
    return {
      value: '', // 搜索关键词
      suggest: [], // 搜索建议
      limit: 20, // 搜索结果数量
      searchResult: [], // 搜索结果
      loading: true,
      finished: false,
      page: 1, // 当前搜索结果的页码
      hotSearch: [] // 热搜
    }
  },
  methods: {
    // 搜索建议
    async searchPropose () {
      if (!this.value) {
        this.suggest = []
        return
      }
      const { data: res } = await searchSuggestAPI({
        keywords: this.value,
        type: 'mobile'
      })
      this.searchResult = [] // 文本框发生改变 清空搜索结果数据
      this.page = 1
      this.suggest = res.result.allMatch
    },
    // 搜索
    async search (e) {
      if (e) this.value = e // 点击搜索建议，把歌名赋值给value
      if (!this.value) return
      this.suggest = [] // 执行搜索  清空搜索建议中的数据
      const { data: res } = await searchAPI({
        keywords: this.value,
        limit: this.limit,
        offset: (this.page - 1) * 20
      })
      this.searchResult = [...this.searchResult, ...res.result.songs]
      this.loading = false
      // 数据全部加载完成
      if (res.result.songs.length < 20) {
        this.finished = true
      }
    },
    // 搜索结果上拉
    onLoad () {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        this.page++
        this.search()
      }, 1000)
    },
    // 热搜
    async searHot () {
      const { data: res } = await searHotAPI()
      this.hotSearch = res.result.hots
    },
    // 热搜点击搜索
    searHotClick (e) {
      this.value = e
      this.search()
    }
  },
  components: {
    SongItem
  },
  props: {},
  watch: {},
  computed: {},
  created () {
    this.searHot()
  },
  mounted () {}
}
</script>
<style lang="less" scoped>
.d{
  overflow: auto;
  width: 100%;
  height: 92vh;
}
.van-search__content--round {
  background-color: rgb(54 125 125 / 20%);
}

/deep/.van-field__control {
  color: #fff;
}
.van-row--justify-center{
  position: sticky;
  z-index: 10;
  top: 0;
  left: 0;
}
.suggestedResults {
  background-color: rgb(255 255 255 / 20%);
  color: #ffffff;

  p {
    padding: 0.2rem 0.4rem;
    line-height: 1rem;
    height: 1rem;
    border-bottom: 1px solid #afafaf;
  }
}

.main {
  background-color: rgb(255 255 255 / 0.2);
  padding: 1em;
  padding-bottom: 1.1em;
  border-radius: .2rem;
  margin: 1em;
}

.loader {
  display: flex;
  flex-direction: row;
  height: 4em;
  padding-left: 1em;
  padding-right: 1em;
  transform: rotate(180deg);
  justify-content: right;
  border-radius: 10px;
  transition: 0.4s ease-in-out;
}
.loader:hover{
  background:red
}

.currentplaying {
  display: flex;
  margin: 1em;
}
.heading {
  color: black;
  float: left;
  font-size: 1.1em;
  font-weight: bold;
  align-self: center;
}

.song {
  position: relative;
  transform: rotate(180deg);
  margin-right: 1em;
  color: rgb(255, 255, 255);
  align-self: center;
  font-family: 楷体;
}

.artist {
  font-size: 0.6em;
  span{
    margin-right: .2rem;
  }

}
.artist span:nth-child(-n+3){
   color: aqua;
  }
</style>
