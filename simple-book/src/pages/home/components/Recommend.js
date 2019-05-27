import React, { Component } from 'react'
import { RecommendWrapper, RecommendItem } from './../style'
import { connect } from 'react-redux'

class Recommend extends Component {
  render() {
    const { RecommendList } = this.props
    return (
      <RecommendWrapper>
        {RecommendList.map(item => (
          <RecommendItem imgUrl={item.get('imgUrl')} key={item.get('id')} />
        ))}
      </RecommendWrapper>
    )
  }
}

const mapState = state => ({
  RecommendList: state.getIn(['home', 'RecommendList'])
})

export default connect(
  mapState,
  null
)(Recommend)
