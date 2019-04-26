/* eslint-disable */
import axios from 'axios'
import { message, notification } from 'antd'
import router from 'umi/router'
import Storage from './storage'

// api host
const env = {
  cyberpay: '',
  test: 'http://localhost:8000',
  dev: 'http://localhost:8000',
}

// eslint-disable-next-line
export const BaseURL = env[MY_ENV]

const SUCCESS_CODE = 200
const SERVER_ERROR_CODE = 500
const NO_LOGIN_CODE = 401
const NO_PERMISSION_CODE = 403
const NOT_FOUND_CODE = 404
const CLIENT_CODE = 422
const GATEWAY_CODE = 504
const TIME_OUT = 2000000

axios.defaults.timeout = TIME_OUT

// token
let token = Storage.getItemJsonZlib('Authorization')
axios.defaults.headers.common['Authorization'] = token

axios.defaults.headers.get['Content-Type'] = 'application/json'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.put['Content-Type'] = 'application/json'
axios.defaults.withCredentials = true

//request to show loading
axios.interceptors.request.use(
  config => {
    config.baseURL = BaseURL
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

//response to hide loading
axios.interceptors.response.use(
  response => {
    const statusCode =
      !!response && !!response.data && !!response.data.code ? response.data.code : SUCCESS_CODE
    const msg = !!response && !!response.data && !!response.data.msg ? response.data.msg : ''

    /* eslint-disable no-underscore-dangle */
    const dispatch = window.g_app._store.dispatch

    const noLogin = statusCode.toString().indexOf('401') !== -1

    if (statusCode === NO_LOGIN_CODE || noLogin) {
      MY_ENV === 'dev' || MY_ENV === 'test'
        ? notification.error({
            message: `请求错误 ${statusCode}: ${response.request.responseURL}`,
            description: msg,
          })
        : ''
      dispatch({ type: 'login/logout' })
    } else if (statusCode === NO_PERMISSION_CODE) {
      MY_ENV === 'dev' || MY_ENV === 'test'
        ? notification.error({
            message: `请求错误 ${statusCode}: ${response.request.responseURL}`,
            description: msg,
          })
        : ''
      router.push('/exception/403')
    } else if (statusCode >= NOT_FOUND_CODE && statusCode < CLIENT_CODE) {
      MY_ENV === 'dev' || MY_ENV === 'test'
        ? notification.error({
            message: `请求错误 ${statusCode}: ${response.request.responseURL}`,
            description: msg,
          })
        : ''
      router.push('/exception/404')
      throw error
    } else if (statusCode <= GATEWAY_CODE && statusCode >= SERVER_ERROR_CODE) {
      MY_ENV === 'dev' || MY_ENV === 'test'
        ? notification.error({
            message: `请求错误 ${statusCode}: ${response.request.responseURL}`,
            description: msg,
          })
        : ''
      router.push('/exception/500')
      throw error
    } else if (statusCode < SUCCESS_CODE || statusCode > SUCCESS_CODE) {
      MY_ENV === 'dev' || MY_ENV === 'test'
        ? notification.error({
            message: `请求错误 ${response.statusCode}: ${response.request.responseURL}`,
            description: msg,
          })
        : ''
      message.error(msg)
    }
    if (!!response.data && !!response.data.size && !!response.data.type) {
      const fileName = '导出报表.xls'
      const blob = new Blob([response.data], { type: 'application/vnd.ms-excel' })
      if (window.navigator.msSaveOrOpenBlob) {
        navigator.msSaveBlob(blob, fileName)
      } else {
        const link = document.getElementById('link')
        link.href = window.URL.createObjectURL(blob)
        link.download = fileName
        link.click()
        window.URL.revokeObjectURL(link.href)
      }
    }
    return response && response.data ? response.data : null
  },
  error => {
    /* eslint-disable no-underscore-dangle */
    const dispatch = window.g_app._store.dispatch
    const statusCode =
      !!error && !!error.response && !!error.response.status ? error.response.status : 500

    MY_ENV === 'dev' || MY_ENV === 'test'
      ? notification.error({
          message: `请求错误 ${statusCode}: ${error.response.data.path}`,
          description: error.response.data.message,
        })
      : ''

    if (statusCode === NO_LOGIN_CODE) {
      dispatch({ type: 'login/logout' })
    } else if (statusCode === NO_PERMISSION_CODE) {
      router.push('/exception/403')
      return
    } else if (statusCode >= NOT_FOUND_CODE && statusCode < CLIENT_CODE) {
      router.push('/exception/404')
    } else if (statusCode <= GATEWAY_CODE && statusCode >= SERVER_ERROR_CODE) {
      router.push('/exception/500')
      return
    } else {
      router.push('/exception/500')
      return
    }
  }
)

export default axios
