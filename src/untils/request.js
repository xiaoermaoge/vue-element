import axios from 'axios'
// import Vue from 'vue'
import {merge} from 'lodash'
import qs from 'qs'
import untils from './index'
import router from '@/router'

// const api = '/api'
const api = ''

const service = axios.create({
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  baseURL: '', // api 的 base_url
  timeout: 5000 // request timeout
})

// let isCaduc = false // 判断是否过期
service.interceptors.request.use(
  config => {
    // 这里的config包含每次请求的内容
    // isCaduc = false
    if (config.method === 'post') {
      if (!(config.data instanceof FormData)) {
        if (config.headers['Content-Type'].includes('x-www-form-urlencoded')) {
          config.data = qs.stringify(config.data, {arrayFormat: 'repeat'})
        }
      }
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)
service.interceptors.response.use(
  response => {
    console.log('返回结果')

    // if (!isCaduc) {
    //   if (!response.data.success) {
    //     // if (response.data.code === 409 || response.data.code === 401) {
    //     if (response.data.code === 409) {
    //       untils.message(response.data.message, 'error')
    //       router.push({
    //         path: '/'
    //       })
    //       isCaduc = true
    //     } else {
    //       untils.message(response.data.message, 'error')
    //     }
    //     return false
    //   }
    // } else {
    //   router.push({
    //     path: '/'
    //   })
    // }
    if (response.data.code === 500) {
      untils.message(response.data.message, 'error')
    }

    return response
  },
  error => {
    console.log('err', error)
    return Promise.resolve(error.response)
  }
)

service.json = (url, data, config) =>
  service.post(
    url,
    data,
    merge(
      {},
      {
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      },
      config
    )
  )

// get 传输 数组 修改  paramsSerializer
service.jsonGet = (url, data, config) =>
  service.get(
    url,
    merge(
      data,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        paramsSerializer (data) {
          return qs.stringify(data, {arrayFormat: 'repeat'})
        }
      },
      config
    )
  )
// export {service, api, _bus}
export {service, api}
