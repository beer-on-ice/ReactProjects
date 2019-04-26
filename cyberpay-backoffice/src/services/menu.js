import axios from '@/utils/axios'

// 获取菜单列表
export async function getMenuList(params) {
  return axios.post('/server/menu/list', { ...params })
}
