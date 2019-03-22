import React, { Component } from 'react'
import { ListItem, ListInfo } from './../style'
import { connect } from 'react-redux'
class List extends Component {
  render() {
    const { articleList } = this.props

    return (
      <div>
        {articleList.map(item => (
          <ListItem className="clearfix" key={item.get('id')}>
            <img src={item.get('imgUrl')} alt="" className="pic" />
            <ListInfo>
              <h3 className="title">{item.get('title')}</h3>
              <p className="desc">{item.get('desc')}</p>
            </ListInfo>
          </ListItem>
        ))}
      </div>
    )
  }
}

const mapState = state => ({
  articleList: state.getIn(['home', 'articleList'])
})

export default connect(
  mapState,
  null
)(List)
