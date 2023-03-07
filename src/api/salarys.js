import request from '@/utils/request'

export function getSalarysList(data) {
  return request({
    url: '/api/salarys/list',
    data,
    method: 'post'
  })
}

export function getTips(yearMonth) {
  return request({
    url: `/api/salarys/tips/${yearMonth}`
  })
}
export function getSettings() {
  return request({
    url: '/api/salarys/settings'
  })
}

export function getCompanySetting() {
  return request({
    url: '/api/salarys/company-settings'
  })
}
export function saveSettings(data) {
  return request({
    url: '/api/salarys/settings',
    method: 'post', data
  })
}

export function getSalaryDetail(userId) {
  return request({
    url: `/api/salarys/modify/${userId}`
  })
}
export function changeSalary(data) {
  return request({
    url: `/api/salarys/modify/${data.userId}`,
    method: 'post',
    data
  })
}
export function initSalary(data) {
  return request({
    url: `/salarys/init/${data.userId}`,
    method: 'post',
    data
  })
}
export function getArchivingList(params) {
  return request({
    url: `/salarys/reports/${params.year}`,
    params
  })
}
export function getArchivingCont(params) {
  return request({
    url: `/salarys/reports/${params.yearMonth}`,
    params
  })
}
export function newReport(data) {
  return request({
    url: `/salarys/reports/${data.yearMonth}/newReport`,
    method: 'put',
    data
  })
}
export function getArchivingExport(params) {
  return request({
    url: `/salarys/reports/${params.yearMonth}/export`,
    params
  })
}
export function getArchivingFirst(params) {
  return request({
    url: `/salarys/reports/${params.yearMonth}/first`,
    params
  })
}
export function getArchivingArchive(data) {
  return request({
    url: `/salarys/reports/${data.yearMonth}/archive`,
    data,
    method: 'post'
  })
}
