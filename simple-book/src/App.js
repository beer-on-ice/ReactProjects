import React, { Component, Fragment } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import store from './store'

import Header from './common/header'
import Routers from './routers/'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Fragment>
          <BrowserRouter>
            <Header />
            <Routers />
          </BrowserRouter>
        </Fragment>
      </Provider>
    )
  }
}

export default App
