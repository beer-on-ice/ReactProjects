import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import ProductList from 'page/product/index/index.jsx'
import Category from 'page/product/category/index.jsx'

class ProductRouter extends Component {
  render() {
    return (
      <Switch>
        <Redirect exact from="/product" to="/product/index" />
        <Route path="/product/index" component={ProductList} />
      </Switch>
    )
  }
}

export default ProductRouter
