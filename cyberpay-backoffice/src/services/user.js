import request from '@/utils/request'
import axios from '@/utils/axios'

export async function query() {
  return request('/api/users')
}

export async function queryCurrent() {
  return request('/api/currentUser')
}

// 登录
export async function accountLogin(params) {
  return axios.post('/server/admin/login', { ...params })
}

// 修改密码
export async function updatePassword(params) {
  return axios.post('/server/admin/updatePwd', { ...params })
}

// 会员列表
export async function getUsersList(params) {
  return axios.post('/server/user/list', { ...params })
}

// 删除选中会员
export async function deleteSelectUser(params) {
  return axios.post('/server/admin/member', { ...params })
}

// 禁用/禁用选中会员
export async function changeSelectUserStatus(params) {
  return axios.post('/server/user/update', { ...params })
}
