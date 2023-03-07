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

// 获取审批页面表格数据
export function getApprovalTableAPI(page, size) {
  return request({
    url: `/api/user/process/instance/${page}/${size}`,
    method: "put",
  });
}

// 获取流程设置
export function getProcessSetAPI() {
  return request({
    url: `/api/user/process/definition`,
    method: "get",
  });
}

// 获取流程设置修改提交
export function updataProcessSetAPI(processKey,enable) {
  return request({
    url: `/api/user/process/suspend/process_overtime?processKey=${processKey}&enable=${enable}`,
    method: "get",
  });
}

// 获取个人审批详细信息
export function getprocessDetailAPI(processId) {
  return request({
    url: `/api/user/process/instance/${processId}`,
    method: "get",
  });
}
// 获取个人审批时间线信息
export function getprocessDetailHistoryAPI(processId) {
  return request({
    url: `/api/user/process/instance/tasks/${processId}`,
    method: "get",
  });
}