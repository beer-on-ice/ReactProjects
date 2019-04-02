import React, { Component } from 'react'
import { Link } from 'react-router-dom'
class TopNav extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="navbar navbar-default top-navbar" role="navigation">
        <div className="navbar-header">
          <Link className="navbar-brand" to="/">
            <b>MISTY</b>HILL
          </Link>
        </div>

        <ul className="nav navbar-top-links navbar-right">
          <li className="dropdown">
            <a
              className="dropdown-toggle"
              data-toggle="dropdown"
              href="#"
              aria-expanded="false"
            >
              <i className="fa fa-user fa-fw" />
              <span>欢迎，adminxxx</span>
              <i className="fa fa-caret-down" />
            </a>
            <ul className="dropdown-menu dropdown-user">
              <li>
                <a
                  onClick={() => {
                    this.onLogOut()
                  }}
                >
                  <i className="fa fa-sign-out fa-fw" />
                  <span>退出登录</span>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    )
  }
  onLogOut() {
    console.log('退出登录')
  }
}

export default TopNav
