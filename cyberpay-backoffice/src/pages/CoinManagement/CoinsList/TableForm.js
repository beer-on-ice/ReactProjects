import React, { PureComponent, Fragment } from 'react'
import { Table, Button, Input, message, Popconfirm, Divider } from 'antd'
import isEqual from 'lodash/isEqual'
import { connect } from 'dva'
import styles from './index.less'
import LevelModal from './LevelModal'

class TableForm extends PureComponent {
  index = 0

  cacheOriginData = {}

  constructor(props) {
    super(props)
    this.state = {
      data: props.value,
      value: props.value,
      loading: false,
      /* eslint-disable-next-line react/no-unused-state */
    }
  }

  static getDerivedStateFromProps(nextProps, preState) {
    if (isEqual(nextProps.value, preState.value)) {
      return null
    }
    return {
      data: nextProps.value,
      value: nextProps.value,
    }
  }

  getRowByKey(id, newData) {
    const { data } = this.state
    return (newData || data).filter(item => item.id === id)[0]
  }

  toggleEditable = (e, id) => {
    e.preventDefault()
    const { data } = this.state
    const newData = data.map(item => ({ ...item }))
    const target = this.getRowByKey(id, newData)

    if (target) {
      // 进入编辑状态时保存原始数据
      if (!target.editable) {
        this.cacheOriginData[id] = { ...target }
      }
      target.editable = !target.editable
      this.setState({ data: newData })
    }
  }

  newMember = () => {
    const { data } = this.state
    const newData = data.map(item => ({ ...item }))
    newData.push({
      id: `NEW_TEMP_ID_${this.index}`,
      coinName: '',
      coinDescription: '',
      coinRegion: '',
      editable: true,
      isNew: true,
    })

    this.index += 1
    this.setState({ data: newData })
  }

  levelHandler = (val, fieldName, id) => {
    const { data } = this.state
    const newData = data.map(item => ({ ...item }))
    const target = this.getRowByKey(id, newData)
    if (target) {
      target[fieldName] = val
      this.setState({ data: newData })
    }
  }

  remove(id) {
    const { data } = this.state
    const { onChange } = this.props
    const newData = data.filter(item => item.id !== id)
    this.setState({ data: newData })
    onChange(newData)
  }

  handleKeyPress(e, id) {
    if (e.id === 'Enter') {
      this.saveRow(e, id)
    }
  }

  handleFieldChange(e, fieldName, id) {
    const { data } = this.state
    const newData = data.map(item => ({ ...item }))
    const target = this.getRowByKey(id, newData)
    if (target) {
      target[fieldName] = e.target.value
      this.setState({ data: newData })
    }
  }

  saveRow(e, id) {
    const { updateCoinInfo, addCoin } = this.props
    const { data } = this.state

    e.persist()
    this.setState({
      loading: true,
    })
    setTimeout(() => {
      if (this.clickedCancel) {
        this.clickedCancel = false
        return
      }
      const target = this.getRowByKey(id) || {}

      if (!target.coinAbbr || !target.coinName || !target.coinRegion || !target.coinDescription) {
        message.error('请填写完整的信息。')
        e.target.focus()
        this.setState({
          loading: false,
        })
        return
      }

      // 判断是否重名
      let tempData = JSON.parse(JSON.stringify(data))
      tempData = tempData.filter(item => item.coinName === target.coinName)
      if (tempData.length > 1) {
        message.error('加密币的名字已存在，请换一个吧~')
        e.target.focus()
        this.setState({
          loading: false,
        })
        return
      }

      if (target.isNew) addCoin(target)
      else updateCoinInfo(target)

      delete target.isNew
      this.toggleEditable(e, id)

      this.setState({
        loading: false,
      })
    }, 500)
  }

  cancel(e, id) {
    this.clickedCancel = true
    e.preventDefault()
    const { data } = this.state
    const newData = data.map(item => ({ ...item }))
    const target = this.getRowByKey(id, newData)
    if (this.cacheOriginData[id]) {
      Object.assign(target, this.cacheOriginData[id])
      delete this.cacheOriginData[id]
    }
    target.editable = false
    this.setState({ data: newData })
    this.clickedCancel = false
  }

  render() {
    const columns = [
      {
        id: 'coinName',
        title: '名称',
        dataIndex: 'coinName',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                onChange={e => this.handleFieldChange(e, 'coinName', record.id)}
                onKeyPress={e => this.handleKeyPress(e, record.id)}
                placeholder="币种名称"
              />
            )
          }
          return text
        },
      },
      {
        title: '简称',
        dataIndex: 'coinAbbr',
        id: 'coinAbbr',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                onChange={e => this.handleFieldChange(e, 'coinAbbr', record.id)}
                onKeyPress={e => this.handleKeyPress(e, record.id)}
                placeholder="币种简称"
              />
            )
          }
          return text
        },
      },
      {
        title: '区域',
        dataIndex: 'coinRegion',
        id: 'coinRegion',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                onChange={e => this.handleFieldChange(e, 'coinRegion', record.id)}
                onKeyPress={e => this.handleKeyPress(e, record.id)}
                placeholder="币种区域"
              />
            )
          }
          return text
        },
      },
      {
        title: '描述',
        dataIndex: 'coinDescription',
        id: 'coinDescription',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                onChange={e => this.handleFieldChange(e, 'coinDescription', record.id)}
                onKeyPress={e => this.handleKeyPress(e, record.id)}
                placeholder="币种描述"
              />
            )
          }
          return text
        },
      },
      {
        title: '状态',
        dataIndex: 'coinStatus',
        id: 'coinStatus',
        render: (text, record) => {
          if (record.editable) {
            return (
              <span>
                <LevelModal
                  record={record}
                  onOk={val => this.levelHandler(val, 'coinStatus', record.id)}
                >
                  <a>修改状态</a>
                </LevelModal>
              </span>
            )
          }
          return (
            <span>
              {// eslint-disable-next-line no-nested-ternary
              record.coinStatus === 'available'
                ? '正常使用'
                : record.coinStatus === 'pending'
                ? '待审核'
                : '已禁用'}
            </span>
          )
        },
      },
      {
        title: '操作',
        id: 'action',
        render: (text, record) => {
          const { loading } = this.state
          if (!!record.editable && loading) {
            return null
          }
          if (record.editable) {
            if (record.isNew) {
              return (
                <span>
                  <a onClick={e => this.saveRow(e, record.id)}>添加</a>
                  <Divider type="vertical" />
                  <Popconfirm title="是否要删除此行？" onConfirm={() => this.remove(record.id)}>
                    <a>删除</a>
                  </Popconfirm>
                </span>
              )
            }
            return (
              <span>
                <a onClick={e => this.saveRow(e, record.id)}>保存</a>
                <Divider type="vertical" />
                <a onClick={e => this.cancel(e, record.id)}>取消</a>
              </span>
            )
          }
          return (
            <span>
              <a onClick={e => this.toggleEditable(e, record.id)}>编辑</a>
              <Divider type="vertical" />
              <Popconfirm title="是否要删除此币种？" onConfirm={() => this.remove(record.id)}>
                <a>删除</a>
              </Popconfirm>
            </span>
          )
        },
      },
    ]

    const { loading, data } = this.state
    return (
      <Fragment>
        <Table
          loading={loading}
          columns={columns}
          dataSource={data}
          pagination={false}
          rowKey={record => record.id}
          rowClassName={record => (record.editable ? styles.editable : '')}
        />
        <Button
          style={{ width: '100%', marginTop: 16, marginBottom: 8 }}
          type="dashed"
          onClick={this.newMember}
          icon="plus"
        >
          新增币种
        </Button>
      </Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateCoinInfo(params) {
      const param = {
        coinId: params.id,
        coinAbbr: params.coinAbbr,
        coinDescription: params.coinDescription,
        coinName: params.coinName,
        coinRegion: params.coinRegion,
        status: params.coinStatus,
      }
      dispatch({
        type: 'coinmanagement/update',
        payload: param,
      })
    },
    addCoin(params) {
      const param = {
        coinAbbr: params.coinAbbr,
        coinDescription: params.coinDescription,
        coinName: params.coinName,
        coinRegion: params.coinRegion,
      }
      dispatch({
        type: 'coinmanagement/addCoin',
        payload: param,
      })
    },
  }
}

// export default TableForm
export default connect(
  null,
  mapDispatchToProps
)(TableForm)
