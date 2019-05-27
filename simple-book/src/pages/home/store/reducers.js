import { fromJS } from 'immutable'
import * as actionTypes from './actionTypes'

const defaultState = fromJS({
  topicList: [],
  articleList: [],
  RecommendList: [],
  articlePage: 1,
  showScrollTop: false
})

const changeHomeData = (state, action) => {
  return state.merge({
    topicList: fromJS(action.topicList),
    articleList: fromJS(action.articleList),
    RecommendList: fromJS(action.RecommendList)
  })
}

const addArticleData = (state, action) => {
  return state.merge({
    articlePage: fromJS(action.nextPage),
    articleList: state.get('articleList').concat(fromJS(action.list))
  })
}

const toggleScrollTop = (state, action) => {
  return state.set('showScrollTop', action.flag)
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_HOME_DATA:
      return changeHomeData(state, action)
    case actionTypes.ADD_ARTICLE_DATA:
      return addArticleData(state, action)
    case actionTypes.TOGGLE_SCROLLTOP:
      return toggleScrollTop(state, action)
    default:
      return state
  }
}
