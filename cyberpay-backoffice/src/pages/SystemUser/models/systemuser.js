import { getUsersList, deleteSelectUser, changeSelectUserStatus } from '@/services/user'

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
      const response = yield call(deleteSelectUser, payload)
    },
    // 禁用全部
    *changeStatus({ payload }, { call }) {
      const response = yield call(changeSelectUserStatus, payload)
      console.log(response)
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
