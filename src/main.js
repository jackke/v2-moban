import Vue from 'vue';
import "./api/config"
import App from './App.vue';
import ElementUI from "element-ui";
import router from "./router";
import store from "./store";
import * as echarts from 'echarts';



Vue.prototype.$echarts = echarts;

Vue.use(ElementUI);

Vue.config.productionTip = false;

import 'element-ui/lib/theme-chalk/index.css';
import "./api/main.js";

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
