import React, { Component } from 'react'
import PageTitleUI from './indexUI.jsx'

class PageTitle extends Component {
  constructor(props) {
    super(props)
  }
  componentWillMount() {
    document.title = this.props.title + '-  HAPPY MMALL'
  }
  render() {
    return (
      <PageTitleUI title={this.props.title} children={this.props.children} />
    )
  }
}

export default PageTitle
