import React from 'react'
import { Card, Form } from 'antd'
import { connect } from 'dva'
import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import TableForm from './TableForm'
import styles from './index.less'

class CoinsList extends React.Component {
  componentDidMount = () => {
    const { getCoinsList } = this.props
    getCoinsList()
  }

  render() {
    const {
      form: { getFieldDecorator },
      coinmanagement: { data },
    } = this.props

    return (
      <PageHeaderWrapper title="虚拟币管理" wrapperClassName={styles.advancedForm}>
        <Card title="币列表" bordered={false}>
          {getFieldDecorator('coinlist', {
            initialValue: data.list,
          })(<TableForm />)}
        </Card>
      </PageHeaderWrapper>
    )
  }
}

const mapStateToProps = ({ coinmanagement }) => {
  return {
    coinmanagement,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCoinsList(params) {
      dispatch({
        type: 'coinmanagement/fetch',
        payload: params,
      })
    },
  }
}

// eslint-disable-next-line no-class-assign
CoinsList = Form.create({})(CoinsList)
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoinsList)
