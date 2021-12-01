import axios from 'axios'
// 单独引入element-ui的message
import {Message} from 'element-ui'
import router from '../router'

// 使用axios提供的拦截器拦截请求和响应,为了方便在请求或响应时失败统一调用
// success表示成功访问到后端的接口,onRejected(error)表示没有访问到后端接口
axios.interceptors.response.use(success=>{
  // 业务逻辑：后端给出不给予执行的逻辑
  // 判断浏览器响应的status是否存在并且是否为200
  if(success.status & success.status == 200) {
    // 判断后端是否给出错误逻辑:success.data中有三个状态，code:响应码，message：响应信息，object：后端给的数据
    if(success.data.code==500 || success.data.code == 401 || success.data.code == 403) {
      // 弹出错误的消息
      Message.error({message:success.data.message})
      return;
    }
    // 其他情况默认响应成功
    if(success.data.message) {
      Message.success({message: success.data.message})
    }
  }
  // 成功则把数据返回回去
  return success.data;
}, error=>{
  // 由于服务器、网络等原因无法访问后端接口
  if(error.response.code==504 || error.response.code==404) {
    // 做一个友好的提示即可
    Message.error({message: "服务找不到..."})
  } else if(error.response.code == 403) {
    Message.error({message: "权限不足，请联系管理员..."})
  } else if(error.response.code == 401) {
    Message.error({message: "尚未登录，请登录"})
    // 重定向到登录页
    router.replace('/')
  } else {
    if(error.response.data.message) {
      Message.error({message: error.response.data.message})
    } else {
      Message.error({message: '位置错误...'})
    }
  }
  return;
})
