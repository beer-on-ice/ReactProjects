import React, { Component } from 'react'
import { connect } from 'dva'
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale'
import Login from '@/components/Login'
import styles from './index.less'

const { UserName, Password, Submit } = Login

class LoginPage extends Component {
  state = {
    type: 'account',
  }

  componentDidMount() {
    this.clearAllCookie()
  }

  // 清除所有cookie
  clearAllCookie = () => {
    // eslint-disable-next-line no-useless-escape
    const keys = document.cookie.match(/[^ =;]+(?=\=)/g)
    if (keys) {
      // eslint-disable-next-line no-plusplus
      for (let i = keys.length; i--; )
        document.cookie = `${keys[i]}=0;expires=${new Date(0).toUTCString()}`
    }
  }

  handleSubmit = (err, values) => {
    const { type } = this.state
    if (!err) {
      const { login } = this.props
      login({
        payload: {
          ...values,
          type,
        },
      })
    }
  }

  render() {
    const { submitting } = this.props
    const { type } = this.state
    return (
      <div className={styles.main}>
        <Login
          defaultActiveKey={type}
          onSubmit={this.handleSubmit}
          ref={form => {
            this.loginForm = form
          }}
        >
          <UserName
            name="userName"
            placeholder={`${formatMessage({ id: 'app.login.userName' })}`}
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'validation.userName.required' }),
              },
            ]}
          />
          <Password
            name="password"
            placeholder={`${formatMessage({ id: 'app.login.password' })}`}
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'validation.password.required' }),
              },
            ]}
            onPressEnter={e => {
              e.preventDefault()
              this.loginForm.validateFields(this.handleSubmit)
            }}
          />
          {
            // <div>
            //   <a style={{ float: 'right' }} href="">
            //     <FormattedMessage id="app.login.forgot-password" />
            //   </a>
            // </div>
          }
          <Submit loading={submitting}>
            <FormattedMessage id="app.login.login" />
          </Submit>
        </Login>
      </div>
    )
  }
}

const mapStateToProps = ({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
})

const mapDispatchToProps = dispatch => {
  return {
    login({ payload }) {
      dispatch({
        type: 'login/login',
        payload,
      })
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage)
