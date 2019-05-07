import {
  getCoinsList,
  updateCoinsInfo,
  addCoins,
  setCoinRate,
  updateCoinRate,
} from '@/services/coin'

export default {
  namespace: 'coinmanagement',
  state: {
    data: {
      list: [],
    },
  },

  effects: {
    // 请求币列表
    *fetch({ payload }, { call, put }) {
      const response = yield call(getCoinsList, payload)
      yield put({
        type: 'save',
        payload: response,
      })
    },
    *update({ payload }, { call, put }) {
      yield call(updateCoinsInfo, payload)
      yield put({ type: 'fetch' })
    },
    *addCoin({ payload }, { call, put }) {
      yield call(addCoins, payload)
      yield put({ type: 'fetch' })
    },
    *setRate({ payload }, { call, put }) {
      yield call(setCoinRate, payload)
      yield put({ type: 'fetch' })
    },
    *updateRate({ payload }, { call, put }) {
      yield call(updateCoinRate, payload)
      yield put({ type: 'fetch' })
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: {
          list: action.payload.data,
        },
      }
    },
  },
}
