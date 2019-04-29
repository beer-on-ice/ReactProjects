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
      loading: false,
      /* eslint-disable-next-line react/no-unused-state */
      value: props.value,
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

  getRowByKey(key, newData) {
    const { data } = this.state
    return (newData || data).filter(item => item.key === key)[0]
  }

  toggleEditable = (e, key) => {
    e.preventDefault()
    const { data } = this.state
    const newData = data.map(item => ({ ...item }))
    const target = this.getRowByKey(key, newData)
    if (target) {
      // 进入编辑状态时保存原始数据
      if (!target.editable) {
        this.cacheOriginData[key] = { ...target }
      }
      target.editable = !target.editable
      this.setState({ data: newData })
    }
  }

  newMember = () => {
    const { data } = this.state
    const newData = data.map(item => ({ ...item }))
    newData.push({
      key: `NEW_TEMP_ID_${this.index}`,
      id: '',
      coinName: '',
      coinDescription: '',
      coinRegion: '',
      editable: true,
      isNew: true,
    })

    this.index += 1
    this.setState({ data: newData })
  }

  levelHandler = (val, fieldName, key) => {
    const { data } = this.state
    const newData = data.map(item => ({ ...item }))
    const target = this.getRowByKey(key, newData)
    if (target) {
      target[fieldName] = val
      this.setState({ data: newData })
    }
  }

  remove(key) {
    const { data } = this.state
    const { onChange } = this.props
    const newData = data.filter(item => item.key !== key)
    this.setState({ data: newData })
    onChange(newData)
  }

  handleKeyPress(e, key) {
    if (e.key === 'Enter') {
      this.saveRow(e, key)
    }
  }

  handleFieldChange(e, fieldName, key) {
    const { data } = this.state
    const newData = data.map(item => ({ ...item }))
    const target = this.getRowByKey(key, newData)
    if (target) {
      target[fieldName] = e.target.value
      this.setState({ data: newData })
    }
  }

  saveRow(e, key) {
    const { updateCoinInfo, addCoin } = this.props
    e.persist()
    this.setState({
      loading: true,
    })
    setTimeout(() => {
      if (this.clickedCancel) {
        this.clickedCancel = false
        return
      }
      const target = this.getRowByKey(key) || {}
      if (!target.coinAbbr || !target.coinName || !target.coinRegion || !target.coinDescription) {
        message.error('请填写完整的信息。')
        e.target.focus()
        this.setState({
          loading: false,
        })
        return
      }

      if (target.isNew) {
        addCoin(target)
      } else {
        updateCoinInfo(target)
      }

      delete target.isNew
      this.toggleEditable(e, key)

      const { data } = this.state
      const { onChange } = this.props

      onChange(data)
      this.setState({
        loading: false,
      })
    }, 500)
  }

  cancel(e, key) {
    this.clickedCancel = true
    e.preventDefault()
    const { data } = this.state
    const newData = data.map(item => ({ ...item }))
    const target = this.getRowByKey(key, newData)
    if (this.cacheOriginData[key]) {
      Object.assign(target, this.cacheOriginData[key])
      delete this.cacheOriginData[key]
    }
    target.editable = false
    this.setState({ data: newData })
    this.clickedCancel = false
  }

  render() {
    const columns = [
      {
        key: 'coinName',
        title: '名称',
        dataIndex: 'coinName',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                onChange={e => this.handleFieldChange(e, 'coinName', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
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
        key: 'coinAbbr',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                onChange={e => this.handleFieldChange(e, 'coinAbbr', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
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
        key: 'coinRegion',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                onChange={e => this.handleFieldChange(e, 'coinRegion', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
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
        key: 'coinDescription',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                onChange={e => this.handleFieldChange(e, 'coinDescription', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
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
        key: 'coinStatus',
        render: (text, record) => {
          if (record.editable) {
            return (
              <span>
                <LevelModal
                  record={record}
                  onOk={val => this.levelHandler(val, 'coinStatus', record.key)}
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
        key: 'action',
        render: (text, record) => {
          const { loading } = this.state
          if (!!record.editable && loading) {
            return null
          }
          if (record.editable) {
            if (record.isNew) {
              return (
                <span>
                  <a onClick={e => this.saveRow(e, record.key)}>添加</a>
                  <Divider type="vertical" />
                  <Popconfirm title="是否要删除此行？" onConfirm={() => this.remove(record.key)}>
                    <a>删除</a>
                  </Popconfirm>
                </span>
              )
            }
            return (
              <span>
                <a onClick={e => this.saveRow(e, record.key)}>保存</a>
                <Divider type="vertical" />
                <a onClick={e => this.cancel(e, record.key)}>取消</a>
              </span>
            )
          }
          return (
            <span>
              <a onClick={e => this.toggleEditable(e, record.key)}>编辑</a>
              <Divider type="vertical" />
              <Popconfirm title="是否要删除此币种？" onConfirm={() => this.remove(record.key)}>
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
