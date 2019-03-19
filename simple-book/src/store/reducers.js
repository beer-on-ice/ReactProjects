import { combineReducers } from 'redux-immutable'
import { headerReducer } from './../common/header/store'

const reducers = combineReducers({
  header: headerReducer
})

export default reducers
