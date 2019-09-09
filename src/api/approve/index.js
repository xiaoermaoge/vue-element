import {service, api} from '@/untils/request'
import url from '@/untils/api'
console.log('url,', url)
export default {
  // 用户审批列表
  userList (params) {
    return service
      .json(api + url.approve.userList, params)
      .then(function (res) {
        return res.data
      })
  },
  // 企业审批操作
  entDecide (params) {
    return service
      .get(api + url.approve.entDecide, {params})
      .then(function (res) {
        return res.data
      })
  },
  // 企业审批列表
  entList (params) {
    return service
      .json(api + url.approve.entList, params)
      .then(function (res) {
        return res.data
      })
  },
  // 用户审批操作
  userDecide (params) {
    return service
      .get(api + url.approve.userDecide, {params})
      .then(function (res) {
        return res.data
      })
  }
}
