import React from 'react'
import PropTypes from 'prop-types'

class TodoItem extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.content !== this.props.content) {
      return true
    } else {
      return false
    }
  }
  render() {
    console.log('child render')
    // JSX -> CreateElement -> 虚拟DOM(JS对象) -> 真实的DOM
    const { content, test } = this.props
    return (
      <div onClick={this.handleClick}>
        {test} - {content}
      </div>
    )
  }
  // 当一个组件要从父组件接收参数
  // 只要父组件的render函数被重新执行了，子组件这个生命周期就会被执行
  // 如果这个组件第一次存在于父组件中，不会执行
  // 如果这个组件之前已经存在于父组件中，才会执行
  componentWillReceiveProps() {
    // console.log('child componentWillReceiveProps')
  }
  // 当这个组件将从页面中剔除时，会被执行
  componentWillUnmount() {
    // console.log('child componentWillUnmount')
  }
  handleClick() {
    const { deleteItem, index } = this.props
    deleteItem(index)
  }
}

TodoItem.propTypes = {
  test: PropTypes.string.isRequired,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  deleteItem: PropTypes.func,
  index: PropTypes.number
}

TodoItem.defaultProps = {
  test: 'hello Default'
}

export default TodoItem
