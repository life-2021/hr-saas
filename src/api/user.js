import request from "@/utils/request";

// 登录接口
export function login(data) {
  return request({
    url: "/api/sys/login",
    method: "POST",
    data,
  });
}
// 获取用户数据接口`
// 获取用户基本信息
export function getUserProfileAPI(data) {
  return request({
    url: "/api/sys/profile",
    method: "post",
    data,
  });
}

// 获取用户公司，职位信息
export function getUserProfileAPI_2(data) {
  return request({
    url: `/api/sys/user/${data.id}?id=${data.id}`,
    method: "get",
    data,
  });
}
// 获取性别
export function getUserProfileAPI_3(data) {
  return request({
    url: `/api/employees/${data.id}/personalInfo?id=${data.id}`,
    method: "get",
    data,
  });
}

// 获取用户公司信息
// export function getUserPhotoAPI(id) {
//   return request({
//     url: `/sys/user/${id}`,
//     method: 'GET',
//   });
// }

//获取用户的基本信息
export function getUserDetailById(id) {
  return request({
    url: `/api/sys/user/${id}`,
    method: "GET",
  });
}

// 用户信息修改提交
export function updataUserInfoAPI(data) {
  return request({
    url: `/api/sys/user/${data.userId}`,
    method: "put",
  });
}
