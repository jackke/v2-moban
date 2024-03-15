import axios from "axios";
import store from "@/store";
import ElementUI from 'element-ui';
import router from "@/router";

// 路由守卫拦截
router.beforeEach((to,from,next)=>{
  let token = sessionStorage.getItem("token");
  if(!token){
      if(to.path!=='/login'){
          next({path:"/login"})
      }else{
          next()
      }
  }else{
      next()
  }
})


// 创建axios实例
const server = axios.create({
  //baseURL:dict.API_URL,
  //获取用户token，如果没有，跳转到登录页面
  headers: {
    // adminId: store.state.user.id,
    // access_token: store.state.user.token,
  },
  // responseType: "json",
  //withCredentials: true // 跨域
});
// 添加请求拦截器
server.interceptors.request.use(
  function (config) {
    // console.log(config, '请求拦截器');
    if (store.state.token) {
      config.headers['access_token'] = 'Bearer ' + store.state.token
      // console.log(config,'token')
    }
    
    if (store.state.token) {
      config.headers['Content-Type'] = "application/json"
      // console.log(config,'token')
    }
    // console.log(config.data  instanceof FormData);
    if (config.method == "post" && config.data instanceof FormData) {
      config.headers['Content-Type'] = "application/x-www-form-ulrencoded"
    }
  
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    console.log("调用接口错误", error);
    return Promise.reject(error);
  }
);

// 添加响应拦截器
server.interceptors.response.use(
  function (response) {
    // console.log(store.state, '响应拦截器');
    if (response.status != 200) {
      console.log("与服务器连接失败，错误码", response.status);
      return response;
    }
    if (response.data.code == 1015) {
      store.commit('DelToken');
      ElementUI.Message({
        message: "token无效或已过期，请重新登录",
        type: 'warning'
      });
      // 清除本地缓存
      sessionStorage.clear()
      setTimeout(function () {
        router.replace({
          path: '/login',
        });
      }, 1000);
    }
    return response;
  },
  function (error) {
    // 对响应错误做点什么
    console.log("服务器响应错误", error);
    return Promise.reject(error);
  }
);
export default server;
