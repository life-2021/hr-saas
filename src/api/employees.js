import request from '@/utils/request'

export function getEmployeeSimple() {
    return request({
      url: '/api/sys/user/simple'
    })
  }

//获取员工列表
export function getEmployeesListAPI(params) {
    return request({
        url:'/api/sys/user',
        params
    })
}

export function addEmployee(data) {
  return request({
    url:'/sys/user',
    method:'post',
    data
  })
}