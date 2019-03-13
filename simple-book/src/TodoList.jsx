import React, { Fragment } from 'react'
import axios from 'axios'
import Mock from 'mockjs'

import TodoItem from './TodoItem'
import './style.css'

class TodoList extends React.Component {
  constructor(props) {
    super(props)
    // 当组件的state或者props变化时，render函数就会重新执行
    this.state = {
      inputValue: '',
      list: []
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleButtonClick = this.handleButtonClick.bind(this)
    this.handleDeleteItem = this.handleDeleteItem.bind(this)
  }
  // 在组件即将挂载到页面的时刻自动执行
  componentWillMount() {
    console.log('componentWillMount')
  }
  render() {
    console.log('parent render')
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
            ref={input => {
              this.input = input
            }}
          />
          <button onClick={this.handleButtonClick}>提交</button>
        </div>
        <ul
          ref={ul => {
            this.ul = ul
          }}
        >
          {this.getTodoItem()}
        </ul>
      </Fragment>
    )
  }
  // 页面被挂载到页面后，自动执行
  componentDidMount() {
    // console.log('componentDidMount')
    var arr = ['momo', 'yanzi', 'ziweie']

    Mock.mock('/api/todolist', arr)
    // ajax请求习惯放在这儿
    axios
      .get('/api/todolist')
      .then(res => {
        console.log(res.data)
        this.setState(() => ({ list: [...res.data] }))
      })
      .catch(() => {
        console.log('error')
      })
  }
  // 组件被更新之前，会被自动执行
  shouldComponentUpdate() {
    // console.log('shouldComponentUpdate')
    return true
  }
  // 组件被更新之前，会被自动执行，但他在shouldComponentUpdate之后执行
  // 如果shouldComponentUpdate返回true，才执行。false则不执行
  componentWillUpdate() {
    // console.log('componentWillUpdate')
  }
  // 组件更新完成之后会被执行
  componentDidUpdate() {
    // console.log('componentDidUpdate')
  }
  componentWillReceiveProps() {
    // console.log('parent componentWillReceiveProps')
  }
  getTodoItem() {
    return this.state.list.map((item, index) => {
      return (
        <li key={item}>
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
    // const value = e.target.value
    const value = this.input.value
    this.setState(() => ({
      inputValue: value
    }))
  }
  handleButtonClick() {
    // 因为setState函数是异步的
    this.setState(
      prevState => ({
        list: [...prevState.list, prevState.inputValue],
        inputValue: ''
      }),
      () => {
        console.log(this.ul.querySelectorAll('li').length)
      }
    )
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
