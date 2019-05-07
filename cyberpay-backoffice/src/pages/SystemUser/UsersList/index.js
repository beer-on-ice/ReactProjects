import React, { PureComponent } from 'react'
import { connect } from 'dva'
import moment from 'moment'
import router from 'umi/router'
import { formatMessage } from 'umi-plugin-react/locale'
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  Dropdown,
  Menu,
  DatePicker,
  Popconfirm,
  Badge,
} from 'antd'

import StandardTable from '@/components/StandardTable'
import PageHeaderWrapper from '@/components/PageHeaderWrapper'

import styles from './index.less'

const FormItem = Form.Item
const { Option } = Select
const getValue = obj => {
  Object.keys(obj)
    .map(key => obj[key])
    .join(',')
}
const statusMap = ['default', 'success']
const status = [
  formatMessage({ id: 'app.systemuser.status.disabled' }),
  formatMessage({ id: 'app.systemuser.status.activated' }),
]

class TableList extends PureComponent {
  state = {
    expandForm: false,
    selectedRows: [],
    formValues: {},
    pageIndex: 0,
    pageSize: 10,
  }

  columns = [
    {
      title: formatMessage({ id: 'app.systemuser.column.userid' }),
      dataIndex: 'id',
      key: 'id',
      render: text => <a onClick={() => this.previewItem(text)}>{text}</a>,
    },
    {
      title: formatMessage({ id: 'app.systemuser.column.username' }),
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: formatMessage({ id: 'app.systemuser.column.userstatus' }),
      dataIndex: 'status',
      key: 'status',
      filters: [
        {
          text: status[0],
          value: 'activated',
        },
        {
          text: status[1],
          value: 'blocked',
        },
      ],
      onFilter: (value, record) => record.status === value,
      render(val) {
        // eslint-disable-next-line no-nested-ternary
        const index = val === 'activated' ? 1 : val === 'blocked' ? 0 : -1
        return <Badge status={statusMap[index]} text={status[index]} />
      },
    },
    {
      title: formatMessage({ id: 'app.systemuser.column.usertime' }),
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      sorter: true,
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: formatMessage({ id: 'app.systemuser.column.operate' }),
      key: 'operate',
      render: (text, record) => {
        const opertate =
          record.status === 'activated'
            ? formatMessage({ id: 'app.systemuser.operate.disable' })
            : formatMessage({ id: 'app.systemuser.operate.activation' })
        return (
          <Popconfirm
            title={`你要${opertate}此用户状态吗`}
            onConfirm={() => this.handlePopconfirmConfirm(record)}
            onCancel={() => this.handlePopconfirmCancel(record)}
            okText="Yes"
            cancelText="No"
          >
            <a>
              {formatMessage({ id: 'app.systemuser.operate.disable' })}/
              {formatMessage({ id: 'app.systemuser.operate.activation' })}
            </a>
          </Popconfirm>
        )
      },
    },
  ]

  // 请求列表数据
  componentDidMount() {
    const { getUsersList } = this.props
    const { pageIndex, pageSize } = this.state

    getUsersList({
      offset: pageIndex,
      limit: pageSize,
    })
  }

  // 处理禁用/激活用户
  handlePopconfirmConfirm = item => {
    const { changeUserStatus } = this.props
    changeUserStatus([{ ...item }])
  }

  // 处理禁用/激活用户
  handlePopconfirmCancel = () => {}

  // 处理翻页、筛选等
  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { getUsersList } = this.props
    const { formValues, pageSize } = this.state

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj }
      newObj[key] = getValue(filtersArg[key])
      return newObj
    }, {})

    // 当前页的第一条
    const offset = pagination.current * pagination.pageSize - 1

    const params = {
      offset,
      limit: pageSize,
      ...formValues,
      ...filters,
    }

    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`
    }

    this.setState(
      {
        pageIndex: offset,
      },
      () => {
        getUsersList(params)
      }
    )
  }

  // 查看用户详情
  previewItem = id => {
    router.push(`/profile/basic/${id}`)
  }

  // 删除用户
  handleDeleteUser = () => {
    const { removeUser } = this.props
    const { selectedRows } = this.state

    if (selectedRows.length === 0) return
    removeUser(selectedRows)
  }

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    })
  }

  // 处理批量选择时的操作
  handleMenuClick = e => {
    const { changeUserStatus } = this.props
    const { selectedRows } = this.state

    if (selectedRows.length === 0) return
    switch (e.key) {
      case 'blocked':
        changeUserStatus(selectedRows)
        break
      case 'activated':
        changeUserStatus(selectedRows)
        break
      default:
        break
    }
  }

  // 重置搜索条件
  handleFormReset = () => {
    const { form, getUsersList } = this.props
    form.resetFields()
    this.setState({
      formValues: {},
    })
    getUsersList()
  }

  // 是否展开高级搜索条件
  toggleForm = () => {
    const { expandForm } = this.state
    this.setState({
      expandForm: !expandForm,
    })
  }

  // 根据查询条件处理搜索
  handleSearch = e => {
    e.preventDefault()
    const { getUsersList, form } = this.props

    form.validateFields((err, fieldsValue) => {
      if (err) return

      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      }

      this.setState({
        formValues: values,
      })

      getUsersList(values)
    })
  }

  // 渲染简单筛选表单
  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label={formatMessage({ id: 'app.systemuser.form.keyword' })}>
              {getFieldDecorator('name')(
                <Input placeholder={formatMessage({ id: 'app.systemuser.form.input' })} />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label={formatMessage({ id: 'app.systemuser.form.status' })}>
              {getFieldDecorator('status')(
                <Select
                  placeholder={formatMessage({ id: 'app.systemuser.form.choose' })}
                  style={{ width: '100%' }}
                >
                  <Option value="0">
                    {formatMessage({ id: 'app.systemuser.status.disabled' })}
                  </Option>
                  <Option value="1">
                    {formatMessage({ id: 'app.systemuser.status.activated' })}
                  </Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                {formatMessage({ id: 'app.systemuser.form.search' })}
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                {formatMessage({ id: 'app.systemuser.form.reset' })}
              </Button>
              <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                {formatMessage({ id: 'app.systemuser.form.down' })} <Icon type="down" />
              </a>
            </span>
          </Col>
        </Row>
      </Form>
    )
  }

  // 渲染高级筛选表单
  renderAdvancedForm() {
    const {
      form: { getFieldDecorator },
    } = this.props
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label={formatMessage({ id: 'app.systemuser.form.keyword' })}>
              {getFieldDecorator('name')(
                <Input placeholder={formatMessage({ id: 'app.systemuser.form.input' })} />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label={formatMessage({ id: 'app.systemuser.form.status' })}>
              {getFieldDecorator('status')(
                <Select
                  placeholder={formatMessage({ id: 'app.systemuser.form.choose' })}
                  style={{ width: '100%' }}
                >
                  <Option value="0">
                    {formatMessage({ id: 'app.systemuser.status.disabled' })}
                  </Option>
                  <Option value="1">
                    {formatMessage({ id: 'app.systemuser.status.activated' })}
                  </Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label={formatMessage({ id: 'app.systemuser.form.time' })}>
              {getFieldDecorator('date')(
                <DatePicker
                  style={{ width: '100%' }}
                  placeholder={formatMessage({ id: 'app.systemuser.form.choosetime' })}
                />
              )}
            </FormItem>
          </Col>
        </Row>
        <div style={{ overflow: 'hidden' }}>
          <div style={{ marginBottom: 24 }}>
            <Button type="primary" htmlType="submit">
              {formatMessage({ id: 'app.systemuser.form.search' })}
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
              {formatMessage({ id: 'app.systemuser.form.reset' })}
            </Button>
            <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
              {formatMessage({ id: 'app.systemuser.form.up' })}
              <Icon type="up" />
            </a>
          </div>
        </div>
      </Form>
    )
  }

  // 切换简单/高级搜索
  renderForm() {
    const { expandForm } = this.state
    return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm()
  }

  render() {
    const {
      systemuser: { data },
      loading,
    } = this.props

    const { selectedRows } = this.state
    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="blocked">全部禁用</Menu.Item>
        <Menu.Item key="activated">全部激活</Menu.Item>
      </Menu>
    )

    return (
      <PageHeaderWrapper title="用户列表">
        <Card bordered={false} title="列表管理">
          <div className={styles.tableList}>
            {
              // 搜索功能
              // <div className={styles.tableListForm}>{this.renderForm()}</div>
            }
            <div className={styles.tableListOperator}>
              {selectedRows.length > 0 && (
                <span>
                  <Button onClick={this.handleDeleteUser}>删除</Button>
                  <Dropdown overlay={menu}>
                    <Button>
                      更多操作 <Icon type="down" />
                    </Button>
                  </Dropdown>
                </span>
              )}
            </div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    )
  }
}

const mapStateToProps = ({ systemuser, loading }) => ({
  systemuser,
  loading: loading.models.rule,
})

const mapDispatchToProps = dispatch => {
  return {
    // 获取用户列表
    getUsersList(params) {
      dispatch({
        type: 'systemuser/fetch',
        payload: params,
      })
    },
    // 删除用户
    removeUser(params) {
      dispatch({
        type: 'systemuser/remove',
        payload: {
          key: params.map(row => row.id),
        },
        callback: () => {
          this.setState({
            selectedRows: [],
          })
        },
      })
    },
    // 禁用用户
    changeUserStatus(params) {
      dispatch({
        type: 'systemuser/changeStatus',
        payload: {
          userId: params[0].id,
          status: params[0].status === 'blocked' ? 'activated' : 'blocked',
        },
        callback: () => {
          this.setState({
            selectedRows: [],
          })
        },
      })
    },
  }
}

// eslint-disable-next-line no-class-assign
TableList = Form.create({})(TableList)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableList)
