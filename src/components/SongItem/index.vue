<template>
  <!-- 歌曲组件 -->
    <van-cell center :title="name" :label="author + ' - ' + name" >
      <template #right-icon>
        <van-icon name="play-circle-o" size="30px" @click="$store.dispatch('songdateilApi',id)"/>
      </template>
    </van-cell>
  </template>

<script>
export default {
  name: 'SongItem',
  props: {
    name: String, // 歌名
    author: String, // 歌手
    id: Number // 歌曲id (标记这首歌曲-为将来跳转播放页做准备)
  }
}
</script>

  <style scoped>
  /* 给单元格设置底部边框 */
  .van-cell {
    border-bottom: .02rem solid lightgray;
  }
  .van-cell{
    line-height: 25px;
  }
  </style>
