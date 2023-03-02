import request from '../utils/request'

// 查询企业的部门列表
export function getDepartments() {
    return request({
        url: '/company/department'
    })
}

// 新增部门
export function addDepartments(data) {
    return request({
        url: '/company/department',
        method: 'post',
        data
    })
}

// 根据id删除部门
export function delDepartments(id) {
    return request({
        url: `/company/department/${id}`,
        method: 'delete'
    })
}

// 获取部门详情数据 
export function getDepartDetail(id) {
    return request({
        url: `/company/department/${id}`
    })
}

// 编辑部门信息
export function updateDepartments(data) {
    return request({
        url: `/company/department/${data.id}`,
        method: 'put',
        data
    })
}