import React from 'react'
import { connect } from 'react-redux'
import {
  changeInputValue,
  addNewItem,
  deleteItem
} from './store/actionCreators'

const TodoList = props => {
  const {
    inputValue,
    changeInputValue,
    handleClick,
    list,
    handleDelete
  } = props
  return (
    <div>
      <div>
        <input type="text" value={inputValue} onChange={changeInputValue} />
        <button onClick={handleClick}>提交</button>
      </div>
      <ul>
        {list.map((item, index) => {
          return (
            <li key={index} onClick={() => handleDelete(index)}>
              {item}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    inputValue: state.inputValue,
    list: state.list
  }
}

// store.dispatch / props
const mapDispatchToProps = dispatch => {
  return {
    changeInputValue(e) {
      const action = changeInputValue(e.target.value)
      dispatch(action)
    },
    handleClick() {
      const action = addNewItem()
      dispatch(action)
    },
    handleDelete(index) {
      const action = deleteItem(index)
      dispatch(action)
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)
