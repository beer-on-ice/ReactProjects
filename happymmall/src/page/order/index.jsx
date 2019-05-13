import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Pagination from 'util/pagination/index.jsx'
import PageTitle from 'component/page-title/index.jsx'
import TableList from 'util/table-list/index.jsx'
import ListSearch from './index-list-search.jsx'

import MUtil from 'util/mm.jsx'
import Order from 'service/order-service.jsx'

const _mm = new MUtil()
const _order = new Order()

class OrderList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      pageNum: 1,
      listType: 'list',
      orderNumber: ''
    }
  }

  componentDidMount() {
    this.loadOrderList()
  }

  // 加载商品列表
  loadOrderList() {
    let listParam = {}
    listParam.pageNum = this.state.pageNum
    listParam.listType = this.state.listType

    if (this.state.listType === 'search') {
      listParam.orderNo = this.state.orderNumber
    }
    _order.getOrderList(listParam).then(
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
      this.loadOrderList()
    })
  }
  // 搜索
  onSearch(orderNumber) {
    let listType = orderNumber === '' ? 'list' : 'search'
    this.setState(
      {
        listType,
        pageNum: 1,
        orderNumber
      },
      () => {
        this.loadOrderList()
      }
    )
  }

  render() {
    let tableHeads = [
      '订单号',
      '收件人',
      '订单状态',
      '订单总价',
      '创建时间',
      '操作'
    ]

    let listBody = this.state.list.map((item, index) => (
      <tr key={index}>
        <td>
          <Link to={`/order/detail/${item.orderNo}`}>{item.orderNo}</Link>
        </td>
        <td>
          <p>{item.receiverName}</p>
        </td>
        <td>{item.statusDesc}</td>
        <td>￥{item.payment}</td>
        <td>{item.createTime}</td>
        <td>
          <Link to={`/order/detail/${item.orderNo}`}>详情</Link>
        </td>
      </tr>
    ))
    return (
      <div id="page-wrapper">
        <PageTitle title="订单列表" />
        <ListSearch onSearch={orderNumber => this.onSearch(orderNumber)} />
        <TableList tableHeads={tableHeads}>{listBody}</TableList>
        <Pagination
          current={this.state.pageNum}
          total={this.state.total}
          onChange={pageNum => this.onPageNumChange(pageNum)}
        />
      </div>
    )
  }
}

export default OrderList
