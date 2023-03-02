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

// 获取公司社保历史信息
export function getSocialHistoricalAPI(data) {
  return request({
    url: `api/social_securitys/historys/${data}/list`,
    method: "get",
  });
}

// 获取公司社保历史表单
export function getSocialHistoricalTableAPI(data) {
  return request({
    url: `api/social_securitys/historys/202001?month=202001&year=2020&opType=2`,
    method: "get",
  });
}
