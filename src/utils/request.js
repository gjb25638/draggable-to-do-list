import axios from 'axios'
import { ElNotification, ElMessageBox } from 'element-plus'
import sysConfig from '@/config'
import tool from '@/utils/tool'
import router from '@/router'
import api from '@/api'
axios.defaults.baseURL = ''
axios.defaults.timeout = sysConfig.TIMEOUT
axios.isRefreshing = false
axios.requests = []
function timer(time) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), time)
  })
}
async function retryOriginalRequest(config) {
  if (axios.isRefreshing) {
    await timer(500)
    return retryOriginalRequest(config)
  } else {
    return formatToken(config)
  }
}
function formatToken(config, token = tool.data.get('TOKEN')) {
  if (token) {
    config.headers[sysConfig.TOKEN_NAME] = `${token.token_type} ${token.access_token}`
  }
  return config
}
axios.interceptors.request.use(
  async (config) => {
    if(!sysConfig.REQUEST_CACHE && config.method == 'get') {
      config.params = config.params || {}
    }
    Object.assign(config.headers, sysConfig.HEADERS)
    const whiteList = ['accessToken', 'login', 'loginOTP', '.json']
    console.log(config.url)
    const data = tool.data.get('TOKEN')
    if (whiteList.some(v => config.url.indexOf(v) > -1)) {
      return formatToken(config)
    } else {
      if (data) {
        const now = +new Date()
        const expired = +new Date(data.expires) - now <= 0
        if (expired) {
          if (!axios.isRefreshing) {
            console.log('刷新token')
            axios.isRefreshing = true
            // token过期刷新
            await api.auth.refreshToken.post({ refresh_token: data.refresh_token })
              .then(res => {
                const data = res.data
                data.expires = +new Date() + (data.expires_in - 5) * 1000
                tool.data.set('TOKEN', data)
              })
              .catch(() => {
                tool.data.remove('TOKEN')
              })
              .finally(() => {
                axios.isRefreshing = false
              })
            return formatToken(config)
          }
          return retryOriginalRequest(config)
        } else {
          return formatToken(config)
        }
      } else {
        return config
      }
    }
  },
  error => {
	  return Promise.reject(error)
  }
)

// HTTP response 攔截器
axios.interceptors.response.use(
  (response) => {
    response.data.serverTime = response.headers.date
    return response
  },
  (error) => {
    if (error.response) {
      if (error.response.status == 404) {
        ElNotification.error({
          title: '請求錯誤',
          message: 'Status:404，正在請求不存在的伺服器記錄！'
        })
      } else if (error.response.status == 500) {
        ElNotification.error({
          title: '請求錯誤',
          message: error.response.data.message || 'Status:500，伺服器發生錯誤！'
        })
      } else if (error.response.status == 401) {
        ElMessageBox.confirm('目前用戶已被登出或無權限訪問此資源，請嘗試重新登入後再操作。', '無權限訪問', {
          type: 'error',
          closeOnClickModal: false,
          center: true,
          confirmButtonText: '重新登錄'
        }).then(() => {
          router.replace({ path: '/login' })
        }).catch(() => {})
      } else if (error.response.status !== 403) {
        ElNotification.error({
          title: '請求錯誤',
          message: error.response.data.message || `Status:${error.response.status}，未知錯誤！`
        })
      }
    } else {
      console.log(error)
      ElNotification.error({
        title: '請求錯誤',
        message: '請求伺服器無回應！'
      })
    }

    return Promise.reject(error.response)
  }
)

var httpReq = {

  /** get 請求
	 * @param  {接口地址} url
	 * @param  {請求參數} params
	 * @param  {參數} config
	 */
  get: function(url, params={}, config={}) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url: url,
        params: params,
        ...config
      }).then((response) => {
        resolve(response.data)
      }).catch((error) => {
        reject(error)
      })
    })
  },

  /** post 請求
	 * @param  {接口地址} url
	 * @param  {請求參數} data
	 * @param  {參數} config
	 */
  post: function(url, data={}, config={}) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: url,
        data: data,
        ...config
      }).then((response) => {
        resolve(response.data || { result: response.status, message: '新增成功' })
      }).catch((error) => {
        reject(error)
      })
    })
  },

  /** put 請求
	 * @param  {接口地址} url
	 * @param  {請求參數} data
	 * @param  {參數} config
	 */
  put: function(url, data={}, config={}) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'put',
        url: url,
        data: data,
        ...config
      }).then((response) => {
        resolve(response.data || { result: response.status, message: '修改成功' })
      }).catch((error) => {
        reject(error)
      })
    })
  },

  /** patch 請求
	 * @param  {接口地址} url
	 * @param  {請求參數} data
	 * @param  {參數} config
	 */
  patch: function(url, data={}, config={}) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'patch',
        url: url,
        data: data,
        ...config
      }).then((response) => {
        resolve(response.data || { result: response.status })
      }).catch((error) => {
        reject(error)
      })
    })
  },

  /** delete 請求
	 * @param  {接口地址} url
	 * @param  {請求參數} data
	 * @param  {參數} config
	 */
  delete: function(url, data={}, config={}) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'delete',
        url: url,
        data: data,
        ...config
      }).then((response) => {
        resolve(response.data || { result: response.status, message: '刪除成功' })
      }).catch((error) => {
        reject(error)
      })
    })
  },
}

export default httpReq
