import { routerRedux } from 'dva/router'
import { accountLogin } from '@/services/user'
import { setAuthority } from '@/utils/authority'
import { getPageQuery } from '@/utils/utils'
import { reloadAuthorized } from '@/utils/Authorized'
import Storage from '@/utils/storage'

export default {
  namespace: 'login',
  state: {},
  effects: {
    // 登录
    *login({ payload }, { call, put }) {
      const param = {
        name: payload.userName,
        pwd: payload.password,
      }

      const response = yield call(accountLogin, param)

      yield put({
        type: 'changeLoginStatus',
        payload: {
          ...response,
          currentAuthority: 'admin',
        },
      })

      // 设置token
      yield Storage.setItem('Authorization', `Bearer ${response.data._t}`) // eslint-disable-line no-underscore-dangle

      if (!!response && !!response.code && response.code === 200) {
        Storage.setItem('userId', response.data.userInfo.id)
        Storage.setItem('userName', response.data.userInfo.name)

        yield reloadAuthorized()

        const urlParams = new URL(window.location.href)
        const params = getPageQuery()
        let { redirect } = params
        if (redirect) {
          const redirectUrlParams = new URL(redirect)
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length)
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1)
            }
          } else {
            redirect = null
          }
        }
        yield put(routerRedux.replace(redirect || '/'))
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
            currentAuthority: 'guest',
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
      setAuthority(payload.currentAuthority)
      return {
        ...state,
        ...payload,
      }
    },
  },
}
