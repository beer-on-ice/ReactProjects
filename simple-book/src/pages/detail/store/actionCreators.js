import * as actionTypes from './actionTypes'
import axios from 'axios'

const saveDetailInfo = data => ({
  type: actionTypes.SAVE_DETAILINFO,
  title: data.title,
  content: data.content
})

export const getDetailInfo = id => {
  return dispatch => {
    axios.get(`/api/detailInfo.json?id=${id}`).then(res => {
      const data = res.data.data
      dispatch(saveDetailInfo(data))
    })
  }
}
