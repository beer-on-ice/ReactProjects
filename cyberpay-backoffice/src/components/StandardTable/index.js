import React, { PureComponent } from 'react'
import { Table } from 'antd'
import styles from './index.less'

class StandardTable extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      selectedRowKeys: [],
    }
  }

  // 处理被选择的列
  handleRowSelectChange = (selectedRowKeys, selectedRows) => {
    const { onSelectRow } = this.props
    if (onSelectRow) {
      onSelectRow(selectedRows)
    }

    this.setState({ selectedRowKeys })
  }

  // 分页、排序、筛选变化时触发
  handleTableChange = (pagination, filters, sorter) => {
    const { onChange } = this.props

    if (onChange) {
      onChange(pagination, filters, sorter)
    }
  }

  // 清空已经选择的项
  cleanSelectedKeys = () => {
    this.handleRowSelectChange([], [])
  }

  render() {
    const { selectedRowKeys } = this.state
    const { data = {}, rowKey, ...rest } = this.props
    const { list = [], pagination } = data

    const paginationProps = {
      showSizeChanger: false,
      showQuickJumper: false,
      ...pagination,
    }

    const rowSelection = {
      selectedRowKeys,
      onChange: this.handleRowSelectChange,
      getCheckboxProps: record => ({
        disabled: record.disabled,
      }),
    }

    return (
      <div className={styles.standardTable}>
        <Table
          rowKey={record => record.id}
          rowSelection={rowSelection}
          dataSource={list}
          pagination={paginationProps}
          onChange={this.handleTableChange}
          {...rest}
        />
      </div>
    )
  }
}

export default StandardTable
