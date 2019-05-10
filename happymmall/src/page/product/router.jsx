import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import ProductList from 'page/product/index/index.jsx'
import ProductSave from 'page/product/index/save.jsx'
import ProductDetail from 'page/product/index/detail.jsx'
import Category from 'page/product/category/index.jsx'

class ProductRouter extends Component {
  render() {
    return (
      <Switch>
        <Redirect exact from="/product" to="/product/index" />
        <Route path="/product/index" component={ProductList} />
        <Route path="/product/save/:pid?" component={ProductSave} />
        <Route path="/product/detail/:pid" component={ProductDetail} />
      </Switch>
    )
  }
}

export default ProductRouter
