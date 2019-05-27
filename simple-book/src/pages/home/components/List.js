import React, { Component } from 'react'
import { ListItem, ListInfo, LoadMore } from './../style'
import { connect } from 'react-redux'
import { actionCreators } from './../store'
import { Link } from 'react-router-dom'
class List extends Component {
  render() {
    const { articleList, handleLoadMore, articlePage } = this.props

    return (
      <div>
        {articleList.map(item => (
          <Link key={item.get('id')} to={`/detail/${item.get('id')}`}>
            <ListItem className="clearfix">
              <img src={item.get('imgUrl')} alt="" className="pic" />
              <ListInfo>
                <h3 className="title">{item.get('title')}</h3>
                <p className="desc">{item.get('desc')}</p>
              </ListInfo>
            </ListItem>
          </Link>
        ))}
        <LoadMore onClick={() => handleLoadMore(articlePage)}>
          加载更多
        </LoadMore>
      </div>
    )
  }
}

const mapState = state => ({
  articleList: state.getIn(['home', 'articleList']),
  articlePage: state.getIn(['home', 'articlePage'])
})

const mapDispatch = dispatch => ({
  handleLoadMore(articlePage) {
    dispatch(actionCreators.getMoreList(articlePage))
  }
})

export default connect(
  mapState,
  mapDispatch
)(List)
