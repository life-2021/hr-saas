import axios from 'axios'
// import { Message } from 'element-ui';

// 创建axios实例
const service = axios.create({
  // 基础地址   process.env为nodejs的环境变量对象
  baseURL: "http://ihrm-java.itheima.net/api",
  timeout: 5000, // 请求超时时间
});

// 请求拦截器   主要负责token的统一注入
// service.interceptors.request.use();
// // 响应拦截器   主要处理数据异常和数据结构
// service.interceptors.request.use(
//   response => {
//     // axios外层加了一层data 对数据进行解构
//     const { success, message, data } = response.data;
//     // 根据success的状态判断是否成功
//     if (success) {
//       console.log(data)
//       return data
//     } else {
//       // 提示错误消息
//       Message.error(message) 
//       return Promise.reject(new Error(message));
//     }

//   }, error => {
//     Message.error(error.message)//提示错误信息
//     return Promise.reject(error)//返回执行错误 让当前执行链挑错成功进入catch
//   }
// );

export default service
