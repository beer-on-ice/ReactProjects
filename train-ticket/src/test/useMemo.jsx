import React, { useState, useMemo, memo, useCallback } from 'react'

const Counter = memo(function Counter (props) {
  return (
    <h3 onClick={props.onClick}>{props.count}</h3>
  )
})

function App (props) {
  const [count, setCount] = useState(() => {
    return props.defaultCount || 0
  })
// useMemo(()=>fn) === useCallback(fn)
  const onClick = useCallback(() => console.log('onClick'), [])

  const double = useMemo(() => {
    return count * 2
  }, [count])

  return (
    <div>
      <button type="button" onClick={() => setCount(count + 1)}>
        Add
      </button>
      <h1>double:{double}</h1>
      <Counter count={count} onClick={onClick} />
    </div>
  )
}

export default App