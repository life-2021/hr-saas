import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  // 将所有数据放在模块内部
  modules: {
    user,
  },
  // 引入getters实现对子模块数据的快捷访问
  getters,
});

export default store
