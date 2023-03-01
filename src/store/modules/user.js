import { getToken, setToken, removeToken } from "../../utils/auth.js";
import {
  login,
  getUserProfileAPI,
  getUserProfileAPI_2,
  getUserProfileAPI_3,
} from "../../api/user.js";

// 数据
const state = {
  token: getToken(), //设置token为共享状态  初始化的vuex时候先从缓存读取
  userInfo: {}, // 用户信息
};

// 同步
const mutations = {
  // 设置token
  setToken(state, token) {
    state.token = token; //将token给vuex
    setToken(token);
  },
  // 清理koten
  removeToken(state) {
    state.token = ""; //清空vuex中的token
    removeToken(); //清理cookie的token
  },
  // 存储用户信息
  setUser(state, data) {
    state.userInfo = data; 
  },
};

// 异步
const actions = {
  // 登录
  async login(context, data) {
    const result = await login(data); //调用user接口模块的login接口拿到token
    context.commit("setToken", result.data.data); //设置token
  },
  // 登出
  async logout(context) {
    // 清理token
    context.commit("removeToken");
  },

  // 获取用户信息
  async getUserProfile(context) {
    // console.log(context.state.token);
    const result = await getUserProfileAPI({
      "Content-Type": "application/x-www-form-urlencoded",
    });
    const result2 = await getUserProfileAPI_2({
      id: result.data.data.userId,
    });
    const result3 = await getUserProfileAPI_3({
      id: result.data.data.userId,
    });
    // console.log(result);
    // console.log(result2);
    // console.log(result3);
    let userInfo = {
      userId: result.data.data.userId,
      username: result.data.data.username,
      sex: result3.data.data.sex,
      birthday: result3.data.data.dateOfBirth,
      mobile: result.data.data.mobile,
      companyId: result.data.data.companyId,
      company: result.data.data.company,
      departmentId: result2.data.data.departmentId,
      departmentName: result2.data.data.departmentName,
      staffPhoto: result2.data.data.staffPhoto,
    };
    // console.log(userInfo);
    context.commit("setUser", userInfo); //设置userInfo
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
