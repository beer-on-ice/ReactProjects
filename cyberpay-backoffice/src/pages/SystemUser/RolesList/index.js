import React from 'react'
import { Card, Form } from 'antd'
import { connect } from 'dva'
import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import TableForm from './TableForm'
import styles from './index.less'

const tableData = [
  {
    key: '1',
    password: '00001',
    name: 'John Brown',
    level: '超超超级管理员',
    department: '苏州技术部',
    createUser: '大宝',
    createDate: '2019-04-18 14:37:12',
  },
  {
    key: '2',
    password: '00002',
    name: 'Jim Green',
    level: '超级管理员',
    department: '上海技术部',
    createUser: '大捞',
    createDate: '2019-04-18 14:37:12',
  },
  {
    key: '3',
    password: '00003',
    name: 'Joe Black',
    level: '辣鸡管理员',
    department: '新加坡技术部',
    createUser: '大跑',
    createDate: '2019-04-18 14:37:12',
  },
]

const RoleList = props => {
  const {
    form: { getFieldDecorator },
  } = props

  return (
    <PageHeaderWrapper title="角色管理" wrapperClassName={styles.advancedForm}>
      <Card title="管理员列表" bordered={false}>
        {getFieldDecorator('members', {
          initialValue: tableData,
        })(<TableForm />)}
      </Card>
    </PageHeaderWrapper>
  )
}

const RolesList = Form.create({})(RoleList)
export default connect()(RolesList)
