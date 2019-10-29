import React, { Component,useState,createContext,useContext } from 'react'

const CountContext = createContext()


class Foo extends Component {
  render() {
    return (
      <CountContext.Consumer>
        {
          count => <h1>{count}</h1>
        }
      </CountContext.Consumer>
    )
  }
}

class Bar extends Component {
  static contextType = CountContext
  render() {
    const count = this.context
    return (
      <h2>{count}</h2>
    )
  }
}

function Counter() {
  const count = useContext(CountContext)
  return (
    <h3>{count}</h3>
  )
}

function App(props) {
  const [count, setCount] = useState(()=>{
    return props.defaultCount || 0
  })
  return (
    <div>
      <button type="button" onClick={()=>setCount(count+1)}>
        Add
      </button>        
      <CountContext.Provider value={count}>
        <Foo/>
        <Bar/>
        <Counter/>
      </CountContext.Provider>
    </div>
  )
}

export default App