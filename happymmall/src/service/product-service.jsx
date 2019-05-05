import MUtil from 'util/mm.jsx'
const _mm = new MUtil()

class Product {
  // 获取产品列表
  getProductList(pageNum) {
    return _mm.request({
      type: 'post',
      url: '/manage/product/list.do',
      data: {
        pageNum: pageNum
      }
    })
  }
  // 上下架产品
  setProductStatus(params) {
    return _mm.request({
      type: 'post',
      url: '/manage/product/set_sale_status.do',
      data: params
    })
  }
}

export default Product
