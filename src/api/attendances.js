import request from "@/utils/request";

// 获取用户考勤列表信息
export function getAttendancesListAPI(params) {
  return request({
    url: `/api/attendances`,
    method: "GET",
    params,
  });
}
