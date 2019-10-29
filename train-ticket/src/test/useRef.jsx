import React, { useState,PureComponent, useEffect, useCallback,useRef } from 'react'


class Counter extends PureComponent {
  speak = () => {
    console.log(`now counter is:${this.props.count}` );
  }
  render() {
    return (
      <h3 onClick={this.props.onClick}>{this.props.count}</h3>
    )
  }
}

function App (props) {
  const [count, setCount] = useState(() => {
    return props.defaultCount || 0
  })
  
  const counterRef = useRef()
  const it = useRef()


  const onClick = useCallback(() => {
    console.log('onClick')
    counterRef.current.speak()
  }, [counterRef])

  useEffect(()=>{
    it.current = setInterval(()=>{
      setCount(count => count + 1)
    },1000)
  }, [])

  useEffect(()=>{
    if(count >= 10) {
      clearInterval(it.current)
    }
  })

  return (
    <div>
      <button type="button" onClick={() => setCount(count + 1)}>
        Add
      </button>
      <Counter ref={counterRef} count={count} onClick={onClick} />
    </div>
  )
}

export default App