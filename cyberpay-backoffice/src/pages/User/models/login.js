import { routerRedux } from 'dva/router'
import { accountLogin } from '@/services/user'
import { setAuthority } from '@/utils/authority'
import { reloadAuthorized } from '@/utils/Authorized'
import Storage from '@/utils/storage'

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    // 登录
    *login({ payload }, { call, put }) {
      const param = {
        name: payload.userName,
        pwd: payload.password,
      }

      const response = yield call(accountLogin, param)
      if (!!response && !!response.code && response.code === 200) {
        yield put({
          type: 'changeLoginStatus',
          payload: {
            ...response,
            currentAuthority: 'admin',
          },
        })

        Storage.setItemJsonZlib('userId', response.data.userInfo.id)
        Storage.setItem('userName', response.data.userInfo.name)
        // 设置token
        // eslint-disable-next-line no-underscore-dangle
        yield Storage.setItemJsonZlib('Authorization', `Bearer ${response.data._t}`)

        yield reloadAuthorized()

        yield (window.location.href = '/welcome')
      }
    },
    // 登出
    *logout(_, { put, select }) {
      try {
        // 清除token
        yield Storage.removeItem('Authorization')
        yield Storage.removeItem('userId')
        yield Storage.removeItem('userName')
        // get location pathname
        const urlParams = new URL(window.location.href)
        const pathname = yield select(state => state.routing.location.pathname)
        // add the parameters in the url
        urlParams.searchParams.set('redirect', pathname)
        window.history.replaceState(null, 'login', urlParams.href)
      } finally {
        yield put({
          type: 'changeLoginStatus',
          payload: {
            currentAuthority: ['guest'],
          },
        })
        reloadAuthorized()
        yield put(routerRedux.push('/user/login'))
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      // 设置权限
      setAuthority(payload.currentAuthority || ['guest'])
      return {
        ...state,
        ...payload,
      }
    },
  },
}
