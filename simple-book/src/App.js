import React, { Component, Fragment } from 'react'
import { Provider } from 'react-redux'
import store from './store'
import { BrowserRouter, Route } from 'react-router-dom'

import Header from './common/header'
import Home from './pages/home'
import Detail from './pages/detail'
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Fragment>
          <Header />
          <BrowserRouter>
            <Route path="/" exact component={Home} />
            <Route path="/detail" exact component={Detail} />
          </BrowserRouter>
        </Fragment>
      </Provider>
    )
  }
}

export default App
