// 导入axios实例
import request from '@/utils/request'
// 获取所有角色信息
export function getRolesAPI(params) {
    return request({
        url: '/api/sys/role',
        method: 'GET',
        params: params
    })
}

// 获取公司信息
export function getCompanyInfoAPI(companyId) {
    return request({
        url: `/api/company/${companyId}`
    })
}

// 新增角色
export function addRoleAPI(data) {
    return request({
        url: '/api/sys/role',
        method: 'post',
        data
    })
}
// 获取某一个角色列表
export function getRoleIdAPI(id) {
    return request({
        url: `/api/sys/role/${id}`
    })
}

//编辑角色
export function updateRoleAPI(data) {
    return request({
        url: `/api/sys/role/${data.id}`,
        method: 'put',
        data
    })
}

// 删除角色
export function deleteRoleAPI(id) {
    return request({
        url: `/api/sys/role/${id}`,
        method: 'delete'
    })
}
