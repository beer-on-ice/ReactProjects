import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Pagination from 'util/pagination/index.jsx'
import PageTitle from 'component/page-title/index.jsx'

import MUtil from 'util/mm.jsx'
import TableList from 'util/table-list/index.jsx'
import User from 'service/user-service.jsx'

const _mm = new MUtil()
const _user = new User()

class UserList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      pageNum: 1
    }
  }
  componentDidMount() {
    this.loadUserList()
  }
  loadUserList() {
    _user.getUserList(this.state.pageNum).then(
      res => {
        this.setState(res)
      },
      errMsg => {
        this.setState({
          list: []
        })
        _mm.errorTips(errMsg)
      }
    )
  }
  //当页数变化
  onPageNumChange(pageNum) {
    this.setState({ pageNum }, () => {
      this.loadUserList()
    })
  }
  render() {
    let listBody = this.state.list.map((item, index) => (
      <tr key={index}>
        <td>{item.id}</td>
        <td>{item.username}</td>
        <td>{item.email}</td>
        <td>{item.phone}</td>
        <td>{new Date(item.createTime).toLocaleString()}</td>
      </tr>
    ))
    let listError = (
      <tr>
        <td colSpan="5" className="text-center">
          {this.state.firstLoading ? '正在加载...' : '没有找到相应的结果'}
        </td>
      </tr>
    )
    let tableListBody = this.state.list.length > 0 ? listBody : listError
    return (
      <div id="page-wrapper">
        <PageTitle title="用户列表" />
        <div className="row">
          <div className="col-md-12">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <td>ID</td>
                  <td>用户名</td>
                  <td>邮箱</td>
                  <td>电话</td>
                  <td>注册时间</td>
                </tr>
              </thead>
              <tbody>{tableListBody}</tbody>
            </table>
          </div>
          <Pagination
            current={this.state.pageNum}
            total={this.state.total}
            onChange={pageNum => this.onPageNumChange(pageNum)}
          />
        </div>
      </div>
    )
  }
}

export default UserList
