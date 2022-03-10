import axios from 'axios'
import { message } from 'antd'
import qs from 'qs' // qs 模块，用来系列化 post 类型的数据

import { BASE_URL, TIMEOUT } from "./config";

import { showFullScreenLoading, tryHideFullScreenLoading, paramFilter } from './emun'


/**
 * 创建axios实例
 */

const instance = axios.create({
  timeout: TIMEOUT, // 超时时间
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

/**
 * 添加请求拦截
 */

instance.interceptors.request.use(
  config => {
    console.log('object', config)
    if (config.showLoading) {
      showFullScreenLoading()
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

/**
 * 响应拦截
 */

instance.interceptors.response.use(
  response => {
    if (response.config.showLoading) {
      tryHideFullScreenLoading()
    }
    return response
  },
  error => {
    tryHideFullScreenLoading()
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = '错误请求'
          break
        case 401:
          error.message = '未授权，请重新登录'
          break
        case 403:
          error.message = '拒绝访问'
          break
        case 404:
          error.message = '请求错误,未找到该资源'
          break
        case 405:
          error.message = '请求方法未允许'
          break
        case 408:
          error.message = '请求超时'
          break
        case 500:
          error.message = '服务器端出错'
          break
        case 501:
          error.message = '网络未实现'
          break
        case 502:
          error.message = '网络错误'
          break
        case 503:
          error.message = '服务不可用'
          break
        case 504:
          error.message = '网络超时'
          break
        case 505:
          error.message = 'http版本不支持该请求'
          break
        default:
          error.message = `连接错误${error.response.status}`
      }
    } else {
      error.message = '连接到服务器失败'
    }
    return Promise.reject(error.message)
  }
)

/**
 * get请求
 * @method get
 * @param {url, params, showLoading} 请求地址，请求参数，是否需要加载层
 */
const defaultConfig = { showLoading: true }

function get(url, params, showLoading, error) {
  params = paramFilter(params)
  return new Promise((resolve, reject) => {
    instance
      .get(url, { params, ...defaultConfig, ...showLoading })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        err = error ? error : err
        message.error(err, 1)
        reject(err)
      })
  })
}

/**
 * @method post
 * @param {url, params, config} 请求地址，请求参数，是否需要加载层
 */
function post(url, params, config, error) {
  const { headers } = config
  let param = ''
  if (headers && headers['Content-Type'] === 'application/x-www-form-urlencoded') {
    param = qs.stringify(paramFilter(params))
  } else {
    param = paramFilter(params)
  }
  return new Promise((resolve, reject) => {
    instance
      .post(url, param, { ...defaultConfig, ...config })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        err = error ? error : err
        message.error(err, 1)
        reject(err)
      })
  })
}

export default {
  get,
  post
}
