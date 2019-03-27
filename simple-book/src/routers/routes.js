import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

import Home from '../pages/home'
import Detail from '../pages/detail'
import Login from '../pages/login'

class Routes extends Component {
  render() {
    return (
      <Fragment>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/detail/:id" exact component={Detail} />
      </Fragment>
    )
  }
}

export default Routes
