import React, { Component } from 'react'
import { Modal, Steps, Button, InputNumber, Input, message } from 'antd'

const { Step } = Steps

class RateModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      current: 0,
      lowVal: 0,
      mediumVal: 0,
      highVal: 0,
      desc: '',
    }
  }

  next = () => {
    const { current: current1 } = this.state
    const current = current1 + 1
    this.setState({ current })
  }

  prev = () => {
    const { current: current1 } = this.state
    const current = current1 - 1
    this.setState({ current })
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
    const { lowVal, mediumVal, highVal, desc } = this.state
    if (desc === '') {
      message.error('描述不能为空')
      return
    }
    const obj = { lowVal, mediumVal, highVal, rateDescription: desc }
    onOk(obj)
    this.hideModalHandler()
  }

  handleInputVal = (type, val) => {
    this.setState({
      [type]: val,
    })
  }

  handleInputDesc = (e, type) => {
    this.setState({
      [type]: e.target.value,
    })
  }

  render() {
    const { children } = this.props
    const { visible, current, lowVal, mediumVal, highVal, desc } = this.state
    const steps = [
      {
        title: '低费率',
        content: (
          <InputNumber
            min={0}
            max={10}
            step={0.1}
            autoFocus
            value={lowVal}
            onChange={val => this.handleInputVal('lowVal', val)}
            style={{ width: '100%', margin: '20px auto' }}
          />
        ),
      },
      {
        title: '中等费率',
        content: (
          <InputNumber
            min={0}
            max={10}
            step={0.1}
            value={mediumVal}
            onChange={val => this.handleInputVal('mediumVal', val)}
            style={{ width: '100%', margin: '20px auto' }}
          />
        ),
      },
      {
        title: '高费率',
        content: (
          <InputNumber
            min={0}
            max={10}
            step={0.1}
            value={highVal}
            onChange={val => this.handleInputVal('highVal', val)}
            style={{ width: '100%', margin: '20px auto' }}
          />
        ),
      },
      {
        title: '费率描述',
        content: (
          <Input
            value={desc}
            placeholder="费率描述"
            onChange={e => this.handleInputDesc(e, 'desc')}
            style={{ width: '100%', margin: '20px auto' }}
          />
        ),
      },
    ]
    return (
      <span>
        <span onClick={this.showModalHandler}>{children}</span>
        <Modal title="设定费率" visible={visible} onCancel={this.hideModalHandler} footer={null}>
          <div>
            <Steps current={current}>
              {steps.map(item => (
                <Step key={item.title} title={item.title} />
              ))}
            </Steps>
            <div className="steps-content">{steps[current].content}</div>
            <div className="steps-action">
              {current < steps.length - 1 && (
                <Button type="primary" onClick={this.next}>
                  下一步
                </Button>
              )}
              {current === steps.length - 1 && (
                <Button type="primary" onClick={this.okHandler}>
                  完成
                </Button>
              )}
              {current > 0 && (
                <Button style={{ marginLeft: 8 }} onClick={this.prev}>
                  上一步
                </Button>
              )}
            </div>
          </div>
        </Modal>
      </span>
    )
  }
}

export default RateModal
