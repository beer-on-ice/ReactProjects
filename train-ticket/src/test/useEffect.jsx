import React, { Component,useState,useEffect } from 'react'

class App2 extends Component {
  state = {
    count: 0,
    size:{
      height:document.documentElement.clientHeight,
      width:document.documentElement.clientWidth
    }
  }
  onResize = () => {
    this.setState({
      size:{
        height:document.documentElement.clientHeight,
        width:document.documentElement.clientWidth
      }
    })
  }
  componentDidMount() {
    document.title = this.state.count
    window.addEventListener('resize',this.onResize,false)
  }
  componentDidUpdate(){
    document.title = this.state.count
  }
  componentWillUnmount() {
    window.removeEventListener('resize',this.onResize,false)
  }
  render() {
    const {count,size} = this.state
    return (
      <div>
        <button type="button" onClick={()=>this.setState({count:count+1})}>
          Add
        </button>        
        <h1>{count}</h1>
        <h2>{size.width}x{size.height}</h2>
      </div>
    )
  }
}

function App(props) {
  // React Hooks不能出现在条件判断语句中，因为它必须有完全一样的渲染顺序
  console.log(2222); // 会多次打印
  const [count,setCount] = useState(()=>{
    console.log(1); // 只会打印一次
    return props.defaultCount || 0
  })
  const [name, setName] = useState('Mike')
  const [size, setSize] = useState({
    height:document.documentElement.clientHeight,
    width:document.documentElement.clientWidth
  })

  const onResize = () =>{
    setSize({
      height:document.documentElement.clientHeight,
      width:document.documentElement.clientWidth
    })
  }

  const onClick = () =>{
    console.log('click');
  }

  useEffect(()=>{
    console.log('count:',count);
  }, [count])

  useEffect(()=>{
    window.addEventListener('resize',onResize,false)
    return () =>{
    window.removeEventListener('resize',onResize,false)
    }
  }, [])

  useEffect(()=>{
    document.title = name + count
  })

  useEffect(()=>{
    document.querySelector('#size').addEventListener('click',onClick)
    return () =>{
      document.querySelector('#size').removeEventListener('click')
    }
  })

  return (
    <div>
      <button type="button" onClick={()=>setCount(count+1)}>
        Add
      </button>        
      <h1>{count}</h1>
      <h1>{name}</h1>
      {
        count%2
        ?<h2 id="size">size: {size.width}x{size.height}</h2>
        :<p id="size">size: {size.width}x{size.height}</p>
      }
      </div>
  )
}

export default App