import React, { Component } from 'react'
import { Switch } from 'react-router-dom'

import Routes from './routes'

class Routers extends Component {
  render() {
    return (
      <Switch>
        <Routes />
      </Switch>
    )
  }
}

export default Routers
