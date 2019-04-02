import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

class SideNav extends Component {
  render() {
    return (
      <div className="navbar-default navbar-side">
        <div className="sidebar-collapse">
          <ul className="nav">
            <li>
              <NavLink exact activeClassName="active-menu" to="/">
                <i className="fa fa-dashboard" />
                <span>首页</span>
              </NavLink>
            </li>

            <li className="active">
              <NavLink to="/product" activeClassName="active-menu">
                <i className="fa fa-sitemap" />
                <span>商品</span>
                <span className="fa arrow" />
              </NavLink>
              <ul className="nav nav-second-level collapse in">
                <li>
                  <NavLink to="/product" activeClassName="active-menu">
                    <span>商品管理</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/product-category" activeClassName="active-menu">
                    <span>品类管理</span>
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className="active">
              <NavLink to="/order" activeClassName="active-menu">
                <i className="fa fa-sitemap" />
                <span>订单</span>
                <span className="fa arrow" />
              </NavLink>
              <ul className="nav nav-second-level collapse in">
                <li>
                  <NavLink to="/order" activeClassName="active-menu">
                    <span>订单管理</span>
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className="active">
              <NavLink to="/user" activeClassName="active-menu">
                <i className="fa fa-sitemap" />
                <span>用户</span>
                <span className="fa arrow" />
              </NavLink>
              <ul className="nav nav-second-level collapse in">
                <li>
                  <NavLink to="/user" activeClassName="active-menu">
                    <span>用户管理</span>
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default SideNav
