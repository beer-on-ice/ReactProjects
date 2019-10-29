import React, { Component,useState } from 'react'

class App2 extends Component {
  state = {
    count: 0
  }
  render() {
    const {count} = this.state
    return (
      <div>
        <button type="button" onClick={()=>this.setState({count:count+1})}>
          Add
        </button>        
        <h1>{count}</h1>
      </div>
    )
  }
}

function App(props) {
  // React Hooks不能出现在条件判断语句中，因为它必须有完全一样的渲染顺序
  console.log(2222); // 会多次打印
  const [count,setCount] = useState(() => {
    console.log(1); // 只会打印一次
    return props.defaultCount || 0
  })
  const [name, setName] = useState('Mike')

  return (
    <div>
      <button type="button" onClick={()=>setCount(count+1)}>
        Add
      </button>        
      <h1>{count}</h1>
      <h1>{name}</h1>
    </div>
  )
}

export default App