import request from '@/utils/request'

export function getEmployeeSimple() {
  return request({
    url: '/api/sys/user/simple'
  })
}

//获取员工列表
export function getEmployeeList(params) {
  return request({
    url: '/api/sys/user',
    params
  })
}

export function addEmployee(data) {
  return request({
    url: '/api/sys/user',
    method: 'post',
    data
  })
}

//删除员工
export function delEmployee(id) {
  return request({
    url: `/api/sys/user/${id}`,
    method: 'delete'
  })
}


//分配角色
export function assignRoles(data) {
  return request({
    url: '/api/sys/user/assignRoles',
    data,
    method: 'put'
  })
}

//员工岗位
export function getJobDetail(id) {
  return request({
    url: `/api/employees/${id}/jobs`
  })
}


//保存员工的基本信息
export function saveUserDetailById(data) {
  return request({
    url: `/api/sys/user/${data.id}`,
    method: 'put',
    data
  })
}