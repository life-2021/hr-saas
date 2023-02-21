import Vue from 'vue'
import App from './App.vue'

//reset.css
import "reset.css/reset.cssreset.css";

// ElementUI
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

// 导入Vuex
import Vuex from "vuex";
Vue.use(Vuex);

// 导入路由
import VueRouter from "vue-router";
Vue.use(VueRouter);

//导入axios
import axios from "axios";
Vue.prototype.$axios = axios;


import store from '@/store';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
