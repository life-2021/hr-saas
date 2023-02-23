import { getToken, setToken, removeToken } from "../../utils/auth.js";
import { login } from "../../api/user.js";

const state = {
  token: getToken(), //设置token为共享状态  初始化的vuex时候先从缓存读取
};
const mutations = {
  setToken(state, token) {
    state.token = token; //将token给vuex
    //同步给缓存
    setToken(token);
  },
  removeToken(state) {
    state.token = token; //清空vuex中的token
    //同步给缓存
    removeToken();
  },
};
const actions = {
  async login(context, data) {
    const result = await login(data) //拿到token
    context.commit("setToken", result.data.data); //设置token
  },
};


export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
