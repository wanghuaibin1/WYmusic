function remSize () {
  // 获取设备宽度
  let deviceWidth = document.documentElement.clientWidth || window.innerWidth
  if (deviceWidth >= 750) {
    deviceWidth = 750
  }
  if (deviceWidth <= 350) {
    deviceWidth = 320
  }
  document.documentElement.style.fontSize = (deviceWidth / 7.5) + 'px'
  // 设置字体大小
  document.querySelector('body').style.fontSize = 0.3 + 'rem'
}
remSize()
// 窗口发生变化
window.onresize = () => {
  remSize()
}
