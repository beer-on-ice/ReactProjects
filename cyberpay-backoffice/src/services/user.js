import request from '@/utils/request'
import axios from '@/utils/axios'

export async function query() {
  return request('/api/users')
}

export async function queryCurrent() {
  return request('/api/currentUser')
}

export async function accountLogin(params) {
  return axios.post('/server/api/1.0/admin/login', { ...params })
}

export async function updatePassword(params) {
  return axios.post('/server/api/1.0/admin/updatePwd', { ...params })
}
