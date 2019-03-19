import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import { GlobalReset } from './reset'
import { GlobalIconFont } from './statics/iconfont/iconfont'

ReactDOM.render(
  <Fragment>
    <GlobalReset />
    <GlobalIconFont />
    <App />
  </Fragment>,
  document.getElementById('root')
)
