import request from '@/utils/request'
// 获取考勤列表
export function getAttendancesList(params) {
  return request({
    url: '/api/attendances',
    params
  })
}
//获取考勤详情

export function updateAttendance(data) {
  return request({
    url: `/api/attendances/${data.userId}`,
    method: 'put',
    data
  })
}
