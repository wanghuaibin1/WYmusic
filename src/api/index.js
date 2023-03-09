import request from '@/utils/request'
/**
 *搜索建议
 * @param {*} keywords : 关键词
 * @returns    可选参数 : type : 如果传 'mobile' 则返回移动端数据
 */
export const searchSuggestAPI = params => request({
  url: '/search/suggest',
  params
  // 将来外面可能传入params的值 {limit: 20}
})

/**
 *  搜索
 * @param {*} params keywords : 关键词
 * @returns
 */
export const searchAPI = params => request({
  url: '/search',
  params
})

/**
 *  热搜榜
 * @returns 无值
 */
export const searHotAPI = () => request({
  url: '/search/hot'
})

/**
 *
 * @returns 首页轮播图
 */
export const bannerAPI = () => {
  return request({
    url: '/banner',
    params: {
      type: 1
    }
  })
}
/**
 *  推荐歌单
 * @param {*} params  limit`: 取出数量 , 默认为 30 (不支持 offset)
 * @returns
 */
export const personalizedAPI = () => request({
  url: '/personalized?limit=10'
})

/**
 * 歌单详情
 * @param {*} params 歌单id
 * @returns
 */
export const datailAPI = params => request({
  url: '/playlist/detail',
  params
})
/**
 * 获取歌单所有歌曲
 * @param {*} params
 * @returns 必选参数 : id : 歌单 id
可选参数 : limit : 限制获取歌曲的数量，默认值为当前歌单的歌曲数量

可选参数 : offset : 默认值为0
 */
export const trackAllAPI = params => request({
  url: '/playlist/track/all',
  params
})

/**
 * 收藏歌单/取消歌单
 * @param {*} params t : 类型,1:收藏,2:取消收藏 id : 歌单 id
 * @returns
 */
export const subscribeAPI = data => request({
  url: '/playlist/subscribe',
  data
})

/**
 * 登录
 * @param {*} params
 * @returns
 */
// export const loginAPI = params => request({
//   url: '/login/cellphone',
//   params
// })

/**
 *  登录获取key
 * @returns
 */
export const keyAPI = params => request({
  url: '/login/qr/key',
  params
})

/**
 * 登录通过key获取二维码的base64值
 * @param {*} params   获取的key
 * @returns
 */
export const createAPI = params => request({
  url: '/login/qr/create',
  params
})

/**
 * 二维码检测扫码状态接口

 * @param {*} params  key,由第一个接口生成
 * @returns
 */
export const checkAPI = params => request({
  url: '/login/qr/check',
  params
})

/**
 * 登录状态
 * @param {*} params
 * @returns
 */
export const statusAPI = params => request({
  url: '/login/status',
  params
})
