// eslint-disable-next-line
import React, { Component } from 'react'
import { Input, Button, List } from 'antd'

// 无状态组件
const TodoListUI = props => {
  return (
    <div style={{ margin: '10px' }}>
      <Input
        placeholder="todo info"
        style={{ width: '300px', marginRight: '10px' }}
        value={props.inputValue}
        onChange={props.handleInputChange}
      />
      <Button type="primary" onClick={props.handleButtonClick}>
        提交
      </Button>
      <List
        style={{ width: '300px', marginTop: '10px' }}
        size="small"
        bordered
        dataSource={props.list}
        renderItem={(item, index) => (
          <List.Item
            onClick={() => {
              props.handleItemDelete(index)
            }}
          >
            {item}
          </List.Item>
        )}
      />
    </div>
  )
}

// UI组件
// class TodoListUI extends Component {
//   render() {
//     return (
//       <div style={{ margin: '10px' }}>
//         <Input
//           placeholder="todo info"
//           style={{ width: '300px', marginRight: '10px' }}
//           value={props.inputValue}
//           onChange={props.handleInputChange}
//         />
//         <Button type="primary" onClick={props.handleButtonClick}>
//           提交
//       </Button>
//         <List
//           style={{ width: '300px', marginTop: '10px' }}
//           size="small"
//           bordered
//           dataSource={props.list}
//           renderItem={(item, index) => (
//             <List.Item
//               onClick={index => {
//                 props.handleItemDelete(index)
//               }}
//             >
//               {item}
//             </List.Item>
//           )}
//         />
//       </div>
//     )
//   }
// }

export default TodoListUI
