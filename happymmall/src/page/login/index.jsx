import React, { Component } from 'react'
import './index.scss'

import MUtil from 'util/mm.jsx'
import User from 'service/user-service.jsx'

const _mm = new MUtil()
const _user = new User()

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      redirect: _mm.getUrlParam('redirect') || '/'
    }
  }
  handleInputChange(e) {
    let inputName = e.target.name,
      inputVal = e.target.value

    this.setState({
      [inputName]: inputVal
    })
  }
  handleSubmit() {
    let loginInfo = {
      username: this.state.username,
      password: this.state.password
    }
    _user.login(loginInfo).then(
      res => {
        this.props.history.push(this.state.redirect)
      },
      err => {
        _mm.errorTips(err)
      }
    )
  }
  render() {
    return (
      <div className="col-md-4 col-md-offset-4">
        <div className="panel panel-default login-panel">
          <div className="panel-heading">欢迎登录 - MMALL管理系统</div>
          <div className="panel-body">
            <div>
              <div className="form-group">
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  placeholder="请输入用户名"
                  onChange={e => this.handleInputChange(e)}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="请输入密码"
                  onChange={e => this.handleInputChange(e)}
                />
              </div>
              <button
                className="btn btn-primary btn-lg btn-block"
                onClick={e => this.handleSubmit(e)}
              >
                登录
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
