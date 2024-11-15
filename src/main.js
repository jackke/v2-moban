import Vue from 'vue';
import "./api/config"
import "./utils/reg"
import App from './App.vue';
import ElementUI from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';
import router from "./router";
import store from "./store";
import * as echarts from 'echarts';
import "./styles/main.scss"
import "./styles/el-main.scss"



Vue.prototype.$echarts = echarts;

Vue.use(ElementUI);

Vue.config.productionTip = false;


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
