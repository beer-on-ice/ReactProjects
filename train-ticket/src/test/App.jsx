import React, { useState, useEffect, useRef,useCallback } from 'react'

function useCounter(count) {
  return (
    <h3>{count}</h3>
  )
}

function useCount(defaultCount) {
  const [count, setCount] = useState(() => {
    return defaultCount || 0
  })
  
  const it = useRef()

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
  return [count,setCount]
}

function useSize() {
  const [size,setSize] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight
  })

  const onResize = useCallback(
    () => {
      setSize({
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
      })
    }
  ,[])

  useEffect(()=>{
    window.addEventListener('resize',onResize,false)
    return () => {
      window.removeEventListener('resize',onResize,false)
    }
  })

  return size
}

function App (props) {
  const [count,setCount] = useCount(0)
  const Counter = useCounter(count)
  const size = useSize()

  return (
    <div>
      <button type="button" onClick={() => setCount(count + 1)}>
        Add
      </button>
      {
        Counter
      }
      {
        size.width
      } x {
        size.height
      }
    </div>
  )
}

export default App