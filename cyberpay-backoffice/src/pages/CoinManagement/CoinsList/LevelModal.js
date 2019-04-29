import React, { Component } from 'react'
import { Modal, Radio } from 'antd'

const RadioGroup = Radio.Group
class LevelModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      radioValue: 'available',
    }
  }

  showModalHandler = e => {
    if (e) e.stopPropagation()
    this.setState({
      visible: true,
    })
  }

  hideModalHandler = () => {
    this.setState({
      visible: false,
    })
  }

  okHandler = () => {
    const { onOk } = this.props
    const { radioValue } = this.state
    onOk(radioValue)
    this.hideModalHandler()
  }

  onChange = e => {
    this.setState({
      radioValue: e.target.value,
    })
  }

  render() {
    const { children } = this.props
    const { visible, radioValue } = this.state

    return (
      <span>
        <span onClick={this.showModalHandler}>{children}</span>
        <Modal
          title="修改权限"
          visible={visible}
          onOk={this.okHandler}
          onCancel={this.hideModalHandler}
        >
          <RadioGroup onChange={this.onChange} value={radioValue} style={{ width: '100%' }}>
            <Radio value="available">激活</Radio>
            <Radio value="forbidden">禁用</Radio>
            <Radio value="pending">待审核</Radio>
          </RadioGroup>
        </Modal>
      </span>
    )
  }
}

export default LevelModal
