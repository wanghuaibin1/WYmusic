<template>
  <div id="app">
    <router-view />
    <playerMusic/>
  </div>

</template>
<script>
import playerMusic from './components/SongItem/playerMusic.vue'
export default {
  components: {
    playerMusic
  }
}

</script>
<style lang="less" >
*{
  box-sizing: border-box;
  // margin: auto;
  padding: auto;
}
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

body {
  --backImage: url('https://cdn.pixabay.com/photo/2023/02/09/06/16/clouds-7778012_640.jpg') no-repeat ;
}

body {
   background: var(--backImage);
   /* 背景图垂直、水平均居中 */
background-position: center center;
/* 当内容高度大于图片高度时，背景图像的位置相对于viewport固定 */
background-attachment: fixed;
/* 让背景图基于容器大小伸缩 */
background-size: cover;
/* 设置背景颜色，背景图加载过程中会显示背景色 */
background-color: #464646;
font-family: 楷体;

}
</style>
