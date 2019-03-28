import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

import Home from '../pages/home'
import Detail from '../pages/detail/loadable'
import Login from '../pages/login'
import Write from '../pages/write'

class Routes extends Component {
  render() {
    return (
      <Fragment>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/detail/:id" exact component={Detail} />
        <Route path="/write" exact component={Write} />
      </Fragment>
    )
  }
}

export default Routes
