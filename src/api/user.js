import request from "@/utils/request"

// 登录接口
export function login(data) {
  return request({
    url: "/api/sys/login",
    method: "POST",
    data,
  });
}
// 获取用户数据接口
export function getUserProfileAPI(data) {
  return request({
    url: "/api/sys/profile",
    method: "post",
    data,
  });
}

// 获取用户头像
export function getUserPhotoAPI(id) {
  return request({
    url: `/sys/user/${id}`,
  });
}



export function logout() {}


