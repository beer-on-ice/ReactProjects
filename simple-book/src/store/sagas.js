import {
  takeEvery,
  put
} from 'redux-saga/effects'
import {
  GET_INIT_LIST
} from './actionType'
import {
  initListAction
} from './actionCreator'

import axios from 'axios'

function* getInitList() {
  try {
    const res = yield axios.get('/list.json')
    const action = initListAction(res.data)

    yield put(action)
  } catch (e) {
    console.log(e)

  }

}

function* todoSagas() {
  yield takeEvery(GET_INIT_LIST, getInitList);
}

export default todoSagas;