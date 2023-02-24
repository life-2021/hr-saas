import { getToken, setToken, removeToken } from "../../utils/auth.js";
import { login, getUserProfileAPI } from "../../api/user.js";

// 数据
const state = {
  token: getToken(), //设置token为共享状态  初始化的vuex时候先从缓存读取
  userInfo: { userName: "guanliyuan" }, //用户信息
};

// 同步
const mutations = {
  // 设置token
  setToken(state, token) {
    state.token = token; //将token给vuex
    setToken(token);
  },
  // 移除koten
  removeToken(state) {
    state.token = token; //清空vuex中的token
    removeToken();
  },
  // 存储用户信息
  setUser(state, value) {
    state.userInfo = value;
  },
};

// 异步
const actions = {
  // 登录
  async login(context, data) {
    const result = await login(data); //调用user接口模块的login接口拿到token
    context.commit("setToken", result.data.data); //设置token
  },

  // 获取用户信息
  async getUserProfile(context) {
    // console.log(context.state.token);
    const result = await getUserProfileAPI({
      "Content-Type": "application/x-www-form-urlencoded",
    });
    console.log(result);
    // context.commit("setUser", result); //设置token
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
