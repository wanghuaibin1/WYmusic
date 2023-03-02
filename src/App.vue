<template>
  <div id="app">

    <router-view />
  </div>
</template>

<style lang="less" >
*{
  box-sizing: border-box;
  margin: auto;
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
  --backImage: url('https://ts1.cn.mm.bing.net/th?id=OIP-C.kJE5c2uL7he1BwdQb3-APAHaNK&w=187&h=333&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2');
  --backColor: pink;
}

body {
   background: var(--backImage);
}
</style>
