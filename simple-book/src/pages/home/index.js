import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

import { HomeWrapper, HomeLeft, HomeRight } from './style'
import Topic from './components/Topic'
import Recommend from './components/Recommend'
import Writter from './components/Writter'
import List from './components/List'

class Home extends Component {
  render() {
    return (
      <HomeWrapper className="clearfix">
        <HomeLeft>
          <img
            className="banner-img"
            src="https://upload.jianshu.io/admin_banners/web_images/4620/8ce28ed4656eaa9d606d92c60ba6a04e419cf39b.png?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540"
            alt=""
          />
          <Topic />
          <List />
        </HomeLeft>
        <HomeRight>
          <Recommend />
          <Writter />
        </HomeRight>
      </HomeWrapper>
    )
  }
  componentDidMount() {
    axios
      .get('/api/home.json')
      .then(res => {
        const data = res.data.data
        const action = {
          type: 'home/change_home_data',
          topicList: data.topicList,
          articleList: data.articleList,
          RecommendList: data.RecommendList
        }
        this.props.changeHomeData(action)
      })
      .catch(err => console.log(err))
  }
}

const mapDispatch = dispatch => ({
  changeHomeData(action) {
    dispatch(action)
  }
})

export default connect(
  null,
  mapDispatch
)(Home)
