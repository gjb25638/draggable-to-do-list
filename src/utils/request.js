import axios from 'axios'
axios.defaults.baseURL = ''
axios.isRefreshing = false
axios.requests = []

var httpReq = {
  /** get 請求
   * @param  {接口地址} url
   * @param  {請求參數} params
   * @param  {參數} config
   */
  get: function (url, params = {}, config = {}) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url: url,
        params: params,
        ...config
      })
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  /** post 請求
   * @param  {接口地址} url
   * @param  {請求參數} data
   * @param  {參數} config
   */
  post: function (url, data = {}, config = {}) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: url,
        data: data,
        ...config
      })
        .then((response) => {
          resolve(response.data || { result: response.status, message: '新增成功' })
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  /** put 請求
   * @param  {接口地址} url
   * @param  {請求參數} data
   * @param  {參數} config
   */
  put: function (url, data = {}, config = {}) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'put',
        url: url,
        data: data,
        ...config
      })
        .then((response) => {
          resolve(response.data || { result: response.status, message: '修改成功' })
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  /** patch 請求
   * @param  {接口地址} url
   * @param  {請求參數} data
   * @param  {參數} config
   */
  patch: function (url, data = {}, config = {}) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'patch',
        url: url,
        data: data,
        ...config
      })
        .then((response) => {
          resolve(response.data || { result: response.status })
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  /** delete 請求
   * @param  {接口地址} url
   * @param  {請求參數} data
   * @param  {參數} config
   */
  delete: function (url, data = {}, config = {}) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'delete',
        url: url,
        data: data,
        ...config
      })
        .then((response) => {
          resolve(response.data || { result: response.status, message: '刪除成功' })
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}

export default httpReq
