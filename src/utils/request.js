import axios from 'axios'
import store from '@/store'
import router from '@/router'

// axios函数请求的url地址前面会被拼接基地址, 然后axios请求baseURL+url后台完整地址
export const baseURL = 'http://localhost:3000'
const myAxios = axios.create({
  baseURL
})
// 导出自定义的axios方法, 供外面调用传参发请求

// myAxios.interceptors.request.use(function (config) {
//   // 发起时，统一携带请求头Authorization和token值
//   // 判断，登录和注册页面，vuex中无token，并且登录接口和注册接口不需要携带token

//   if (store.state.cookie) {
//     config.headers.Authorization = store.state.cookie
//   }
//   return config
// }, function (error) {
//   return Promise.reject(error)
// })

// 定义响应拦截器
// 在axios响应拦截器中, 一旦有请求发送回来的是401, 证明原地token过期了, 清除vuex并跳转到登录页面
myAxios.interceptors.response.use(function (response) {
  // 响应状态码为 2xx 时触发成功的回调，形参中的 response 是“成功的结果”
  return response
}, function (error) {
  // 响应状态码不是 4xx 5xxx 时触发失败的回调，形参中的 error 是“失败的结果”
  if (error.response.status === 401) {
    // 本次响应是token过期了
    // 清除vuex里的一切，再切换到登录页面

    store.commit('updateToken', '')
    // store.commit('updataUserInfo', {})

    router.push('/login')
  }
  return Promise.reject(error)
})
// 导出自定义的axios方法, 供外面调用传参发请求
export default myAxios
