import request from '@/utils/request'

//获取员工简单列表
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

//保存的岗位
export function updateJob(data) {
  return request({
    url: `/employees/${data.userId}/jobs`,
    method: 'put',
    data
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

/** **
*
* 导入员工数据 参数data是一个数组类型
* ****/
export function importEmployee(data) {
   return request({
    url: '/api/sys/user/batch',
    method: 'post',
    data
   })
  }