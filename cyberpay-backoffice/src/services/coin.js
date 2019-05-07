import axios from '@/utils/axios'

// 获取币列表
export async function getCoinsList() {
  return axios.post('/server/coin/list', { limit: 100, offset: 0 })
}

// 更新币信息
export async function updateCoinsInfo(params) {
  return axios.post('/server/coin/update', { ...params })
}

// 新增币种
export async function addCoins(params) {
  return axios.post('/server/coin/add', { ...params })
}

// 设置币种费率
export async function setCoinRate(params) {
  return axios.post('/server/rate/add', { ...params })
}

// 修改币种费率
export async function updateCoinRate(params) {
  return axios.post('/server/rate/update', { ...params })
}
