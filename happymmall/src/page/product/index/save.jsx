import React, { Component } from 'react'
import PageTitle from 'component/page-title/index.jsx'
import CategorySelector from './category-selector.jsx'
import FileUploader from 'util/file-uploader/index.jsx'

class ProductSave extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categoryId: 0,
      parentCategoryId: 0
    }
  }
  onCategoryChange(categoryId, parentCategoryId) {
    console.log(categoryId, parentCategoryId)
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
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品品类</label>
            <div className="col-md-10">
              <CategorySelector
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
                />
                <span className="input-group-addon">件</span>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品图片</label>
            <div className="col-md-10">
              <FileUploader />
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品详情</label>
            <div className="col-md-10">detail</div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button type="submit" className="btn btn-primary">
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
