import { fromJS } from 'immutable'
import * as actionTypes from './actionTypes'

const defaultState = fromJS({
  title: '',
  content: ''
})

const save_detailinfo = (state, action) => {
  return state.merge({
    title: fromJS(action.title),
    content: fromJS(action.content)
  })
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.SAVE_DETAILINFO:
      return save_detailinfo(state, action)
    default:
      return state
  }
}
