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
