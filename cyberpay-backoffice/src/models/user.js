import { query as queryUsers, queryCurrent, updatePassword } from '@/services/user'

export default {
  namespace: 'user',

  state: {
    list: [],
    currentUser: {},
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers)
      yield put({
        type: 'save',
        payload: response,
      })
    },
    // 获取当前用户信息
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent)
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      })
    },
    // 修改密码
    *updatePwd({ payload }, { call }) {
      const userId = Storage.getItem('userId')
      const param = {
        oldPwd: payload.oldPassword,
        newPwd: payload.password,
        userId,
      }
      yield call(updatePassword, param)
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      }
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      }
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      }
    },
  },
}
