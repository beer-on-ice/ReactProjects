import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Pagination from 'util/pagination/index.jsx'
import PageTitle from 'component/page-title/index.jsx'
import TableList from 'util/table-list/index.jsx'

import MUtil from 'util/mm.jsx'
import Product from 'service/product-service.jsx'

import './index.scss'

const _mm = new MUtil()
const _product = new Product()

class ProductList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      pageNum: 1
    }
  }
  componentDidMount() {
    this.loadProductList()
  }
  loadProductList() {
    _product.getProductList(this.state.pageNum).then(
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
      this.loadProductList()
    })
  }
  // 设置上/下架
  onSetProductStatus(e, id, currentStatus) {
    let newStatus = currentStatus === 1 ? 2 : 1,
      confirmTips =
        currentStatus === 1 ? '确定要下架该商品吗？' : '确定要上架该商品吗？'
    if (window.confirm(confirmTips)) {
      _product
        .setProductStatus({
          productId: id,
          status: newStatus
        })
        .then(
          res => {
            _mm.successTips(res)
            this.loadProductList()
          },
          errMsg => {
            _mm.errorTips(res)
          }
        )
    }
  }

  render() {
    let tableHeads = [
      { name: '商品ID', width: '10%' },
      { name: '商品信息', width: '50%' },
      { name: '价格', width: '10%' },
      { name: '状态', width: '15%' },
      { name: '操作', width: '15%' }
    ]
    let listBody = this.state.list.map((item, index) => (
      <tr key={index}>
        <td>{item.id}</td>
        <td>
          <p>{item.name}</p>
          <p>{item.subtitle}</p>
        </td>
        <td>￥{item.price}</td>
        <td>
          <p>{item.status == 1 ? '在售' : '已下架'}</p>
          <button
            className="btn btn-warning btn-xs"
            onClick={e => {
              this.onSetProductStatus(e, item.id, item.status)
            }}
          >
            {item.status == 1 ? '下架' : '上架'}
          </button>
        </td>
        <td>
          <Link className="operate" to={`/product/detail/${item.id}`}>
            详情
          </Link>
          <Link className="operate" to={`/product/save/${item.id}`}>
            编辑
          </Link>
        </td>
      </tr>
    ))
    return (
      <div id="page-wrapper">
        <PageTitle title="商品列表" />
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

export default ProductList
