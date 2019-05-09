import React, { Component } from 'react'
import './category-selector.scss'

import MUtil from 'util/mm.jsx'
import Product from 'service/product-service.jsx'

const _mm = new MUtil()
const _product = new Product()

class CategorySelector extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstCategoryList: [],
      firstCategoryId: 0,
      secondCategoryList: [],
      secondCategoryId: 0
    }
  }
  componentDidMount() {
    this.loadFirstCategory()
  }
  // 加载一级分类
  loadFirstCategory() {
    _product.getCategoryList().then(
      res => {
        this.setState({
          firstCategoryList: res
        })
      },
      errMsg => {
        _mm.errorTips(errMsg)
      }
    )
  }
  // 加载二级分类
  loadSecondCategory() {
    _product.getCategoryList(this.state.firstCategoryId).then(
      res => {
        this.setState({
          secondCategoryList: res
        })
      },
      errMsg => {
        _mm.errorTips(errMsg)
      }
    )
  }

  // 选择一级品类
  onFirstCategoryChange(e) {
    let newVal = e.target.value || 0
    this.setState(
      {
        firstCategoryId: newVal,
        secondCategoryList: [],
        secondCategoryId: 0
      },
      () => {
        this.loadSecondCategory()
        this.onPropsCategoryChange()
      }
    )
  }
  // 选择二级品类
  onSecondCategoryChange(e) {
    let newVal = e.target.value || 0
    this.setState(
      {
        secondCategoryId: newVal
      },
      () => {
        this.onPropsCategoryChange()
      }
    )
  }

  // 传给父组件选中的结果
  onPropsCategoryChange() {
    // 判断props里回调函数存在
    let categoryChangable =
      typeof this.props.onPropsCategoryChange === 'function'
    // 如果有选择二级品类
    if (this.state.secondCategoryId) {
      this.props.onCategoryChange(
        this.state.secondCategoryId,
        this.state.firstCategoryId
      )
    }
    // 如果只有一级品类
    else {
      this.props.onCategoryChange(this.state.firstCategoryId, 0)
    }
  }
  render() {
    return (
      <div>
        <select
          className="form-control cate-select"
          onChange={e => this.onFirstCategoryChange(e)}
        >
          <option value="">请选择一级分类</option>
          {this.state.firstCategoryList.map(category => (
            <option value={category.id} key={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        {this.state.secondCategoryList.length ? (
          <select
            className="form-control cate-select"
            onChange={e => this.onSecondCategoryChange(e)}
          >
            <option value="">请选择二级分类</option>
            {this.state.secondCategoryList.map(category => (
              <option value={category.id} key={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        ) : null}
      </div>
    )
  }
}

export default CategorySelector
