import {service, api} from '@/untils/request'
import url from '@/untils/api'
export default {
  // 企业新增
  add (params) {
    return service.json(api + url.comp.add, params).then(function (res) {
      return res.data
    })
  },
  // 企业列表
  list (params) {
    return service.json(api + url.comp.list, params).then(function (res) {
      return res.data
    })
  },
  // 企业更新
  update (params) {
    return service.post(api + url.comp.update, params).then(function (res) {
      return res.data
    })
  },
  // 企业详情
  detail (params) {
    return service.post(api + url.comp.detail, params).then(function (res) {
      return res.data
    })
  },
  // 企业详情
  powerChange (params) {
    return service
      .json(api + url.comp.powerChange, params)
      .then(function (res) {
        return res.data
      })
  },
  // 企业详情
  costRecord (params) {
    return service
      .json(api + url.comp.costRecord, params)
      .then(function (res) {
        return res.data
      })
  },
  // 企业删除用户
  deleteUser (params) {
    return service
      .get(api + url.comp.deleteUser, {params})
      .then(function (res) {
        return res.data
      })
  }
}
