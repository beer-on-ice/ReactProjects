import axios from '@/utils/axios'

// 获取币列表
export async function getCoinsList(params) {
  return axios.post('/server/coin/list', { ...params })
}

// 更新币信息
export async function updateCoinsInfo(params) {
  return axios.post('/server/coin/update', { ...params })
}

// 新增币种
export async function addCoins(params) {
  return axios.post('/server/coin/add', { ...params })
}
