import { fromJS } from 'immutable'
import * as actionTypes from './actionTypes'

const defaultState = fromJS({
  topicList: [],
  articleList: [],
  RecommendList: []
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.CHANGEHOMEDATA:
      return state.merge({
        topicList: fromJS(action.topicList),
        articleList: fromJS(action.articleList),
        RecommendList: fromJS(action.RecommendList)
      })
    default:
      return state
  }
}
