import React, { Component } from 'react'
import PageTitle from 'component/page-title/index.jsx'
import TableList from 'util/table-list/index.jsx'

import MUtil from 'util/mm.jsx'
import Order from 'service/order-service.jsx'

import './detail.scss'

const _mm = new MUtil()
const _order = new Order()

class OrderDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      orderNumber: this.props.match.params.orderNumber,
      orderInfo: {}
    }
  }

  componentDidMount() {
    this.loadOrderDetail()
  }

  // 商品详情
  loadOrderDetail() {
    if (this.state.orderNumber) {
      _order.getOrderDetail(this.state.orderNumber).then(
        res => {
          this.setState({
            orderInfo: res
          })
        },
        errMsg => {
          _mm.errorTips(errMsg)
        }
      )
    }
  }
  // 发货

  onSendGoods(e) {
    if (window.confirm('是否确认发货？')) {
      _order.sendGoods(this.state.orderNumber).then(
        res => {
          _mm.successTips('发货成功')
          this.loadOrderDetail()
        },
        errMsg => {
          _mm.errorTips(errMsg)
        }
      )
    }
  }

  render() {
    let receiverInfo = this.state.orderInfo.shippingVo || '',
      productList = this.state.orderInfo.orderItemVoList || [],
      tableHeads = [
        {
          name: '商品图片',
          width: '10%'
        },
        {
          name: '商品信息',
          width: '45%'
        },
        {
          name: '单价',
          width: '15%'
        },
        {
          name: '数量',
          width: '15%'
        },
        {
          name: '合计',
          width: '15%'
        }
      ],
      listBody = productList.map((item, index) => (
        <tr key={index}>
          <td>
            <img
              className="p-img"
              alt={item.productName}
              src={`${this.state.orderInfo.imageHost}${item.productImage}`}
            />
          </td>
          <td>
            <p>{item.productName}</p>
          </td>
          <td>￥{item.currentUnitPrice}</td>
          <td>{item.quantity}</td>
          <td>￥{item.totalPrice}</td>
        </tr>
      ))

    return (
      <div id="page-wrapper">
        <PageTitle title="订单详情" />
        <div className="form-horizontal">
          <div className="form-group">
            <label className="col-md-2 control-label">订单号</label>
            <div className="col-md-5">
              <p className="form-control-static">
                {this.state.orderInfo.orderNo}
              </p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">创建时间</label>
            <div className="col-md-5">
              <p className="form-control-static">
                {this.state.orderInfo.createTime}
              </p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">收件人</label>
            <div className="col-md-5">
              <p className="form-control-static">
                {receiverInfo.receiverName}，{receiverInfo.receiverProvince}
                {receiverInfo.receiverCity}
                {receiverInfo.receiverAddress}
                {receiverInfo.receiverMobile || receiverInfo.receiverPhone}
              </p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">订单状态</label>
            <div className="col-md-5">
              <p className="form-control-static">
                {this.state.orderInfo.statusDesc}
                {this.state.orderInfo.status === 20 ? (
                  <button
                    className="btn btn-default btn-sm btn-send-goods"
                    onClick={e => this.onSendGoods(e)}
                  >
                    立即发货
                  </button>
                ) : null}
              </p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">支付方式</label>
            <div className="col-md-5">
              <p className="form-control-static">
                {this.state.orderInfo.paymentTypeDesc}
              </p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">订单金额</label>
            <div className="col-md-5">
              <p className="form-control-static">
                ￥{this.state.orderInfo.payment}
              </p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品列表</label>
            <div className="col-md-5">
              <TableList tableHeads={tableHeads}>{listBody}</TableList>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default OrderDetail
