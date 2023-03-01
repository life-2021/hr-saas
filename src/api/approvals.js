import request from "@/utils/request";
// 提交申请
export function startProcess(data) {
    // console.log(data);
    return request({
      url: "/api/user/process/startProcess",
      method: "POST",
      data,
    });
}
