import { getUsersList, deleteSelectUser, changeSelectUserStatus } from '@/services/user'
import { message } from 'antd'

export default {
  namespace: 'systemuser',
  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    // 请求用户列表
    *fetch({ payload }, { call, put }) {
      const response = yield call(getUsersList, payload)
      yield put({
        type: 'save',
        payload: response,
      })
    },
    // 删除选中的用户
    *remove({ payload }, { call }) {
      // eslint-disable-next-line no-unused-vars
      const response = yield call(deleteSelectUser, payload)
    },
    // 禁用选中的用户
    *changeStatus({ payload }, { call, put }) {
      const response = yield call(changeSelectUserStatus, payload)
      if (response.code === 200) message.success('更新用户状态成功！')
      yield put({ type: 'fetch', payload: { offset: 0, limit: 10 } })
    },
  },

  reducers: {
    save(state, action) {
      let current = Math.ceil(
        (action.payload.data.pagination.offset + 1) / action.payload.data.pagination.pageSize
      )
      current = current < 1 ? 1 : current
      return {
        ...state,
        data: {
          list: action.payload.data.userInfo,
          pagination: {
            total: action.payload.data.pagination.total,
            pageSize: action.payload.data.pagination.pageSize,
            current,
          },
        },
      }
    },
  },
}
