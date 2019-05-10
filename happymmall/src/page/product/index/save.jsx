import React, { Component } from 'react'
import PageTitle from 'component/page-title/index.jsx'
import CategorySelector from './category-selector.jsx'
import FileUploader from 'util/file-uploader/index.jsx'
import RichEditor from 'util/rich-editor/index.jsx'

import './save.scss'

import MUtil from 'util/mm.jsx'
import Product from 'service/product-service.jsx'

const _mm = new MUtil()
const _product = new Product()

class ProductSave extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: this.props.match.params.pid,
      name: '',
      subtitle: '',
      categoryId: 0,
      parentCategoryId: 0,
      subImages: [],
      price: '',
      stock: '',
      detail: '',
      status: 1 // 商品状态1为在售
    }
  }
  componentDidMount() {
    this.loadProduct()
  }
  loadProduct() {
    // 有id,是编辑，需要表单回填
    if (this.state.id) {
      _product.getProduct(this.state.id).then(
        res => {
          let images = res.subImages.split(',')
          res.subImages = images.map(imgUri => {
            return {
              uri: imgUri,
              url: res.imageHost + imgUri
            }
          })
          res.defaultDetail = res.detail
          this.setState(res)
        },
        errMsg => {
          _mm.errorTips(errMsg)
        }
      )
    }
  }
  // 简单字段的改变
  onValueChange(e) {
    let name = e.target.name,
      value = e.target.value.trim()
    this.setState({
      [name]: value
    })
  }
  // 品类选择器变化
  onCategoryChange(categoryId, parentCategoryId) {
    this.setState({
      categoryId,
      parentCategoryId
    })
  }
  // 上传成功
  onUploadSuccess(res) {
    let subImages = this.state.subImages
    subImages.push(res)

    this.setState({
      subImages
    })
  }
  //上传失败
  onUploadError(err) {
    _mm.errorTips(err)
  }
  // 删除上传
  onImageDelete(e) {
    let index = parseInt(e.target.getAttribute('index')),
      subImages = this.state.subImages
    subImages.splice(index, 1)
    this.setState({
      subImages
    })
  }
  // 富文本编辑器变化
  onDetailValueChange(val) {
    this.setState({
      detail: val
    })
  }
  getSubImagesString() {
    return this.state.subImages.map(item => item.uri).join(',')
  }
  onSubmit() {
    let product = {
      name: this.state.name,
      subtitle: this.state.subtitle,
      categoryId: parseInt(this.state.categoryId),
      price: parseInt(this.state.price),
      stock: parseInt(this.state.stock),
      detail: this.state.detail,
      status: this.state.status,
      subImages: this.getSubImagesString()
    }
    let productCheckResult = _product.checkProduct(product)
    if (this.state.id) {
      product.id = this.state.id
    }
    if (productCheckResult.status) {
      _product.saveProduct(product).then(
        res => {
          _mm.successTips(res)
          this.props.history.push('/product/index')
        },
        errMsg => {
          _mm.errorTips(errMsg)
        }
      )
    } else {
      _mm.errorTips(productCheckResult.msg)
    }
  }
  render() {
    return (
      <div id="page-wrapper">
        <PageTitle title="添加商品" />
        <div className="form-horizontal">
          <div className="form-group">
            <label className="col-md-2 control-label">商品名称</label>
            <div className="col-md-5">
              <input
                type="text"
                className="form-control"
                placeholder="请输入商品名称"
                name="name"
                value={this.state.name}
                onChange={e => this.onValueChange(e)}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品描述</label>
            <div className="col-md-5">
              <input
                type="text"
                className="form-control"
                placeholder="请输入商品描述"
                name="subtitle"
                value={this.state.subtitle}
                onChange={e => this.onValueChange(e)}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品品类</label>
            <div className="col-md-10">
              <CategorySelector
                categoryId={this.state.categoryId}
                parentCategoryId={this.state.parentCategoryId}
                onCategoryChange={(categoryId, parentCategoryId) =>
                  this.onCategoryChange(categoryId, parentCategoryId)
                }
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品价格</label>
            <div className="col-md-3">
              <div className="input-group">
                <input
                  type="number"
                  className="form-control"
                  placeholder="价格"
                  name="price"
                  value={this.state.price}
                  onChange={e => this.onValueChange(e)}
                />
                <span className="input-group-addon">元</span>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品库存</label>
            <div className="col-md-3">
              <div className="input-group">
                <input
                  type="number"
                  className="form-control"
                  placeholder="库存"
                  name="stock"
                  value={this.state.stock}
                  onChange={e => this.onValueChange(e)}
                />
                <span className="input-group-addon">件</span>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品图片</label>
            <div className="col-md-10">
              {this.state.subImages.length ? (
                this.state.subImages.map((item, index) => (
                  <div className="img-container" key={index}>
                    <img src={item.url} />
                    <i
                      className="fa fa-close"
                      index={index}
                      onClick={e => this.onImageDelete(e)}
                    />
                  </div>
                ))
              ) : (
                <div>请上传图片</div>
              )}
            </div>
            <div className="col-md-offset-2 col-md-10 file-upload-container">
              <FileUploader
                onSuccess={res => this.onUploadSuccess(res)}
                onError={err => this.onUploadError(err)}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品详情</label>
            <div className="col-md-10">
              <RichEditor
                detail={this.state.detail}
                defaultDetail={this.state.defaultDetail}
                onValueChange={val => this.onDetailValueChange(val)}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={e => this.onSubmit(e)}
              >
                提交
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ProductSave
