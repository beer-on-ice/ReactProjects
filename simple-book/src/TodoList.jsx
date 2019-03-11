import React, { Fragment } from 'react'

import TodoItem from './TodoItem'
import './style.css'

class TodoList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: '',
      list: [1, 2]
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleButtonClick = this.handleButtonClick.bind(this)
    this.handleDeleteItem = this.handleDeleteItem.bind(this)
  }
  render() {
    return (
      <Fragment>
        <div>
          {/* 多行注释 */}
          {
            // 单行注释
          }
          <label htmlFor="insertArea">输入内容</label>
          <input
            id="insertArea"
            className="input"
            type="text"
            value={this.state.inputValue}
            onChange={this.handleInputChange}
          />
          <button onClick={this.handleButtonClick}>提交</button>
        </div>
        <ul>{this.getTodoItem()}</ul>
      </Fragment>
    )
  }
  getTodoItem() {
    return this.state.list.map((item, index) => {
      return (
        <li key={index}>
          <TodoItem
            content={item}
            index={index}
            deleteItem={this.handleDeleteItem}
          />
          {/* 
            dangerouslySetInnerHTML: 不转义
            <li
              key={index}
              onClick={this.handleDeleteItem.bind(this, index)}
              dangerouslySetInnerHTML={{ __html: item }}
            /> 
          */}
        </li>
      )
    })
  }
  handleInputChange(e) {
    const value = e.target.value
    this.setState(() => ({
      inputValue: value
    }))
  }
  handleButtonClick() {
    this.setState(prevState => ({
      list: [...prevState.list, prevState.inputValue],
      inputValue: ''
    }))
  }
  handleDeleteItem(index) {
    this.setState(prevState => {
      const list = [...prevState.list]
      list.splice(index, 1)
      return { list }
    })
  }
}

export default TodoList
