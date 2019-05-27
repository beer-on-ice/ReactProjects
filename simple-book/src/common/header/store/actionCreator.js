import * as actionTypes from './actionTypes'
import { fromJS } from 'immutable'
import axios from 'axios'

const changeList = data => ({
  type: actionTypes.CHANGE_LIST,
  data: fromJS(data),
  totalPage: Math.ceil(data.length / 10)
})

export const searchFocus = () => ({
  type: actionTypes.SEARCH_FOCUS
})

export const searchBlur = () => ({
  type: actionTypes.SEARCH_BLUR
})

export const changeMouseEnter = () => ({
  type: actionTypes.CHANGE_MOUSEENTER
})

export const changeMouseLeave = () => ({
  type: actionTypes.CHANGE_MOUSELEAVE
})

export const changePage = page => ({
  type: actionTypes.CHANGE_PAGE,
  page
})

export const getList = () => {
  return dispatch => {
    axios
      .get('/api/headerList.json')
      .then(res => {
        const data = res.data.data
        dispatch(changeList(data))
      })
      .catch(() => {
        console.log('ERROR')
      })
  }
}
