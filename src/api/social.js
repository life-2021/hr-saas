import request from "@/utils/request";

// 查询部门列表
export function getDepartmentListAPI() {
  return request({
    url: "api/company/department",
    method: "get",
  });
}

// 查询城市列表
export function getCitysListAPI() {
  return request({
    url: "api/sys/city",
    method: "get",
  });
}

// 获取社保表格数据
export function getSocialListAPI(data) {
  return request({
    url: "api/social_securitys/list",
    method: "post",
    data,
  });
}
// 获取当前月份
export function getYearMonthAPI() {
  return request({
    url: "api/social_securitys/settings",
    method: "get",
  });
}

// 获取公司社保历史信息
export function getSocialHistoricalAPI(data) {
  return request({
    url: `api/social_securitys/historys/${data}/list`,
    method: "get",
  });
}

// 获取公司社保历史表单
export function getSocialHistoricalTableAPI(data) {
  // console.log(data);
  return request({
    url: `api/social_securitys/historys/${data}?month=${data}&year=${data}&opType=2`,
    method: "get",
  });
}

// 获取当前月份表单
export function getMonthTableAPI(data) {
  return request({
    url: `api/social_securitys/historys/${data}?month=${data}&opType=1`,
    method: "get",
  });
}

// 归档
export function submitMonthTableAPI() {
  return request({
    url: `api/social_securitys/historys/undefined/archive`,
    method: "post",
  });
}

// 获取用户的社保信息
export function getUserSocialAPI(id) {
  return request({
    url: `api/social_securitys/${id}`,
    method: "get",
  });
}

// 获取指定城市的社保缴费详情
export function getCitySocialAPI(id) {
  // console.log(id);
  return request({
    url: `api/social_securitys/payment_item/${id}`,
    method: "get",
  });
}

// 提交用户社保信息
export function submitUserSocialAPI(data) {
  console.log(data);
  return request({
    url: `api/social_securitys/${data.userId}`,
    method: "put",
  });
}


