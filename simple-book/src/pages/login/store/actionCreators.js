import * as actionTypes from './actionTypes'
import axios from 'axios'

const changeLogin = () => ({
  type: actionTypes.CHANGE_LOGIN,
  data: true
})

export const login = (account, password) => {
  return dispatch => {
    axios
      .get(`/api/login.json?account=${account}&password=${password}`)
      .then(res => {
        const flag = res.data.data
        if (flag) {
          dispatch(changeLogin())
        } else {
          alert('登录失败')
        }
      })
  }
}

export const logout = () => ({
  type: actionTypes.CHANGE_LOGOUT,
  data: false
})
