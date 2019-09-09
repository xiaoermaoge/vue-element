import {service, api} from '@/untils/request'
import url from '@/untils/api'
export default {
  costRecord (params) {
    return service
      .json(api + url.cost.costRecord, params)
      .then(function (res) {
        return res.data
      })
  },
  list (params) {
    return service.post(api + url.cost.list, params).then(function (res) {
      return res.data
    })
  },
  // 超市流水明细
  listToMarket (params) {
    return service
      .json(api + url.cost.listToMarket, params)
      .then(function (res) {
        return res.data
      })
  },
  // 餐饮流水明细
  listToEat (params) {
    return service
      .json(api + url.cost.listToEat, params)
      .then(function (res) {
        return res.data
      })
  },
  // 获取系统管理员充值记录（给企业）
  entRecordToAdmin (params) {
    return service
      .json(api + url.cost.entRecordToAdmin, params)
      .then(function (res) {
        return res.data
      })
  },
  // 获取系统管理员充值记录（给个人）
  userRecordToAdmin (params) {
    return service
      .json(api + url.cost.userRecordToAdmin, params)
      .then(function (res) {
        return res.data
      })
  }
}
