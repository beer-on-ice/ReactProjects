import { fromJS } from 'immutable'
import * as actionTypes from './actionTypes'

const defaultState = fromJS({
  login: false
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_LOGIN:
      return state.set('login', action.data)
    case actionTypes.CHANGE_LOGOUT:
      return state.set('login', action.data)
    default:
      return state
  }
}
