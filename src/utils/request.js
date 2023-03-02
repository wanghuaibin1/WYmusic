import axios from 'axios'

// axios函数请求的url地址前面会被拼接基地址, 然后axios请求baseURL+url后台完整地址
export const baseURL = 'http://localhost:3000'
const myAxios = axios.create({
  baseURL
})
// 导出自定义的axios方法, 供外面调用传参发请求

export default myAxios
