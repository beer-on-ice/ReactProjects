import MUtil from 'util/mm.jsx'
const _mm = new MUtil()

class Product {
  // 获取产品列表
  getProductList(listParam) {
    let url = '',
      data = {}
    if (listParam.listType === 'list') {
      url = '/manage/product/list.do'
      data.pageNum = listParam.pageNum
    } else if (listParam.listType === 'search') {
      url = '/manage/product/search.do'
      data.pageNum = listParam.pageNum
      data[listParam.searchType] = listParam.keyword
      console.log(listParam)
    }
    return _mm.request({
      type: 'post',
      url,
      data
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
