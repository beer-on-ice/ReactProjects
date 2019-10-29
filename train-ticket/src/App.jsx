import React, { useState, useCallback, useEffect, useRef } from 'react'
import {
  createSet,
  createAdd,
  createRemove,
  createToggle
} from './Actions'


let idSeq = Date.now()


const Operator = props => {
  const {addTodo} = props
  const inputRef = useRef()

  const onSubmit = (e) => {
    e.preventDefault()
    const newText = inputRef.current.value.trim()
    if(newText.length === 0) return 
    addTodo({
      id: ++idSeq,
      text:newText,
      complete:false
    })
    inputRef.current.value = ''
  }

  return (
    <div className="operator">
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="what needs to be done?" ref={inputRef}/>
      </form>
    </div>
  )
}

const TodoItem = props => {
  const {
    todo:{
      id,
      text,
      complete
    },
    removeTodo,
    toggleTodo
  } = props

  const onRemove = () => {
    removeTodo(id)
  }
  
  const onChange = () => {
    toggleTodo(id)
  }

  return (
    <li className="todo-item">
      <input type="checkbox" onChange={onChange} checked={complete}/>
      <label>{text}</label>
      <button onClick={onRemove}>Delete</button>
    </li>
  )
}

const TodoList = props => {
  const {
    todos,
    removeTodo,
    toggleTodo
  } = props
  
  return (
    <ul>
      {
        todos.map(todo=> <TodoItem key={todo.id} todo={todo} removeTodo={removeTodo} toggleTodo={toggleTodo}/> )
      }
    </ul>
  )
}

const App = props => {
  const [todos,setTodo] = useState([])

  const addTodo = useCallback(todo => {
    setTodo(todos => [...todos,todo])
  },[])

  const removeTodo = useCallback(id => {
    setTodo(todos => todos.filter(todo => {
      return todo.id !== id
    }))
  },[])

  const toggleTodo = useCallback(id => {
    setTodo(todos => todos.map(todo => {
      return todo.id === id ? { ...todo,  complete: !todo.complete } : todo
    }))
  },[])

  useEffect(()=>{
    const todos = JSON.parse(localStorage.getItem('haha'))
    setTodo(todos)
  },[])

  useEffect(()=>{localStorage.setItem('haha',JSON.stringify(todos))},[todos])

  return (
    <div className="todo-list">
      <Operator addTodo={addTodo}/>
      <TodoList removeTodo={removeTodo} toggleTodo={toggleTodo} todos={todos}/>
    </div>
  )
}

export default App