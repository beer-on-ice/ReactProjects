import React, { Component } from 'react'
import { connect } from 'react-redux'

import { HomeWrapper, HomeLeft, HomeRight, BackTop } from './style'
import Topic from './components/Topic'
import Recommend from './components/Recommend'
import Writter from './components/Writter'
import List from './components/List'

import { actionCreators } from './store'

class Home extends Component {
  render() {
    const { showScrollTop } = this.props
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
        {showScrollTop ? (
          <BackTop onClick={this.handleScrollTop}>回到顶部</BackTop>
        ) : null}
      </HomeWrapper>
    )
  }
  componentDidMount() {
    this.props.changeHomeData()
    this.bindEvents()
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.props.changeScrollTopShow)
  }
  bindEvents() {
    window.addEventListener('scroll', this.props.changeScrollTopShow)
  }
  handleScrollTop() {
    window.scrollTo(0, 0)
  }
}

const mapState = state => ({
  showScrollTop: state.getIn(['home', 'showScrollTop'])
})

const mapDispatch = dispatch => ({
  changeHomeData() {
    dispatch(actionCreators.getHomeInfo())
  },
  changeScrollTopShow() {
    document.documentElement.scrollTop > 400
      ? dispatch(actionCreators.toggleScrollTop(true))
      : dispatch(actionCreators.toggleScrollTop(false))
  }
})

export default connect(
  mapState,
  mapDispatch
)(Home)
