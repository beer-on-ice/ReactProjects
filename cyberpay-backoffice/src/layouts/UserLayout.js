import React, { Fragment } from 'react'
import { connect } from 'dva'
import Link from 'umi/link'
import { Icon } from 'antd'
import GlobalFooter from '@/components/GlobalFooter'
import DocumentTitle from 'react-document-title'
import SelectLang from '@/components/SelectLang'
import { formatMessage } from 'umi-plugin-react/locale'
import styles from './UserLayout.less'
import getPageTitle from '@/utils/getPageTitle'

const copyright = (
  <Fragment>
    Copyright <Icon type="copyright" /> 2019 偲鲸技术部出品
  </Fragment>
)

const UserLayout = ({ children, location: { pathname }, breadcrumbNameMap }) => {
  // componentDidMount() {
  //   const {
  //     dispatch,
  //     route: { routes, authority },
  //   } = this.props
  //   dispatch({
  //     type: 'menu/getMenuData',
  //     payload: { routes, authority },
  //   })
  // }
  return (
    <DocumentTitle title={getPageTitle(pathname, breadcrumbNameMap)}>
      <div className={styles.container}>
        <div className={styles.lang}>
          <SelectLang />
        </div>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <span className={styles.title}>CberPay</span>
              </Link>
            </div>
            <div className={styles.desc}>
              {`${formatMessage({
                id: 'app.login.tab-login-credentials',
              })}`}
            </div>
          </div>
          {children}
        </div>
        <GlobalFooter copyright={copyright} />
      </div>
    </DocumentTitle>
  )
}
const mapStateToProps = ({ menu: menuModel }) => ({
  menuData: menuModel.menuData,
  breadcrumbNameMap: menuModel.breadcrumbNameMap,
})

export default connect(mapStateToProps)(UserLayout)
