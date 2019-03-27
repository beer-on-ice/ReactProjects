import * as actionTypes from './actionTypes'
import axios from 'axios'

const changeHomeData = data => ({
  type: actionTypes.CHANGE_HOME_DATA,
  topicList: data.topicList,
  articleList: data.articleList,
  RecommendList: data.RecommendList
})

const addArticleList = (list, nextPage) => ({
  type: actionTypes.ADD_ARTICLE_DATA,
  list,
  nextPage
})

export const getHomeInfo = () => {
  return dispatch => {
    axios
      .get('/api/home.json')
      .then(res => {
        const data = res.data.data
        dispatch(changeHomeData(data))
      })
      .catch(err => console.log(err))
  }
}

export const getMoreList = articlePage => {
  return dispatch => {
    axios
      .get(`/api/homeList.json?page=${articlePage}`)
      .then(res => {
        const data = res.data.data
        dispatch(addArticleList(data, articlePage + 1))
      })
      .catch(err => console.log(err))
  }
}

export const toggleScrollTop = flag => ({
  type: actionTypes.TOGGLE_SCROLLTOP,
  flag
})
