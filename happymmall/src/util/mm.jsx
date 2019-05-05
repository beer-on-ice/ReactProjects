class MUtil {
  // 请求
  request(param) {
    return new Promise((resolve, reject) => {
      $.ajax({
        type: param.type || 'get',
        url: param.url || '',
        dataType: param.dataType || 'json',
        data: param.data || null,
        success: res => {
          switch (res.status) {
            case 0:
              typeof resolve === 'function' && resolve(res.data, res.msg)
              break
            case 10:
              // 没有登录状态，强制登录
              this.doLogin()
              break
            default:
              typeof reject === 'function' && reject(res.msg || res.data)
          }
        },
        error(err) {
          typeof reject === 'function' && reject(err.statusText)
        }
      })
    })
  }
  // 跳转登录
  doLogin() {
    window.location.href = `/login?redirect=${encodeURIComponent(
      window.location.pathname
    )}`
  }
  // 获取url参数
  getUrlParam(name) {
    let queryString = window.location.search.split('?')[1] || ''
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
    let result = queryString.match(reg)
    return result ? decodeURIComponent(result[2]) : null
  }
  // 错误提示
  errorTips(errMsg) {
    alert(errMsg || '哪里出错了~')
  }
  successTips(successMsg) {
    alert(successMsg || '操作成功！')
  }
  // 存储
  setStorage(name, data) {
    let dataType = typeof data
    // JSON对象
    if (dataType === 'object') {
      window.localStorage.setItem(name, JSON.stringify(data))
    }
    // 基础类型
    else if (['number', 'string', 'boolean'].indexOf(dataType) >= 0) {
      window.localStorage.setItem(name, data)
    }
    // 其他不支持的类型
    else {
      alert('该类型不能用于本地存储')
    }
  }
  // 获取存储内容
  getStorage(name) {
    let data = window.localStorage.getItem(name)
    if (data) {
      return JSON.parse(data)
    } else {
      return ''
    }
  }
  // 删除本地存储
  removeStorage(name) {
    window.localStorage.removeItem(name)
  }
}

export default MUtil
