import Vue from 'vue'
import App from './App.vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

// ElementUI
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

// 导入Vuex
import Vuex from "vuex";
Vue.use(Vuex);

import component from "./components";
Vue.use(component);

// 导入路由
import VueRouter from "vue-router";
Vue.use(VueRouter);

//导入axios
import axios from "axios";
Vue.prototype.$axios = axios;

import router from '@/router'
import store from '@/store';

import '@/icons' // icon
import '@/permission' // permission control

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
