import React, { Fragment } from 'react'
import './style.css'

class TodoList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: '',
      list: [1, 2]
    }
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
            onChange={this.handleInputChange.bind(this)}
          />
          <button onClick={this.handleButtonClick.bind(this)}>提交</button>
        </div>
        <ul>
          {/* dangerouslySetInnerHTML: 不转义 */}
          {this.state.list.map((item, index) => {
            return (
              <li
                key={index}
                onClick={this.handleDelete.bind(this, index)}
                dangerouslySetInnerHTML={{ __html: item }}
              />
            )
          })}
        </ul>
      </Fragment>
    )
  }
  handleInputChange(e) {
    this.setState({
      inputValue: e.target.value
    })
  }
  handleButtonClick() {
    this.setState({
      list: [...this.state.list, this.state.inputValue],
      inputValue: ''
    })
  }
  handleDelete(index) {
    const list = [...this.state.list]
    list.splice(index, 1)
    this.setState({
      list: list
    })
  }
}

export default TodoList
