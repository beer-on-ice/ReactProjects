import React, { Component } from 'react'
import { Modal, Form, Input } from 'antd'

const FormItem = Form.Item

class UserEditModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      confirmDirty: false,
    }
  }

  showModelHandler = e => {
    if (e) e.stopPropagation()
    this.setState({
      visible: true,
    })
  }

  hideModelHandler = () => {
    this.setState({
      visible: false,
    })
  }

  okHandler = () => {
    const { onOk, form } = this.props
    form.validateFields((err, values) => {
      if (!err) {
        onOk(values)
        this.hideModelHandler()
      }
    })
  }

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props
    const { confirmDirty } = this.state
    if (value && confirmDirty) {
      form.validateFields(['confirm'], { force: true })
    }
    callback()
  }

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!')
    } else {
      callback()
    }
  }

  render() {
    const { children, form } = this.props
    const { visible } = this.state
    const { getFieldDecorator } = form

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    }
    return (
      <span>
        <span onClick={this.showModelHandler}>{children}</span>
        <Modal
          title="Edit"
          visible={visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
        >
          <Form {...formItemLayout} layout="horizontal" onSubmit={this.okHandler}>
            <FormItem label="旧密码">
              {getFieldDecorator('oldPassword', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your oldPassword!',
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem label="新密码">
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your newPassword!',
                  },
                  {
                    validator: this.validateToNextPassword,
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem label="再次确认">
              {getFieldDecorator('confirm', {
                rules: [
                  {
                    required: true,
                    message: 'Please confirm your password!',
                  },
                  {
                    validator: this.compareToFirstPassword,
                  },
                ],
              })(<Input />)}
            </FormItem>
          </Form>
        </Modal>
      </span>
    )
  }
}

export default Form.create()(UserEditModal)
