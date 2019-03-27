import { fromJS } from 'immutable'
// import * as actionTypes from './actionTypes'

const defaultState = fromJS({
  login: false
})

export default (state = defaultState, action) => {
  switch (action.type) {
    default:
      return state
  }
}
