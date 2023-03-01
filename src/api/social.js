import request from "@/utils/request";

// 登录接口
export function getDepartmentListAPI() {
  return request({
    url: "api/company/department",
    method: "get",
  });
}