import {service, api} from '@/untils/request'
import url from '@/untils/api'
export default {
  // 后台给企业充值
  entAddValue (params) {
    return service
      .get(api + url.addVal.entAddValue, {params})
      .then(function (res) {
        return res.data
      })
  },
  // 后台给用户充值
  userAddValue (params) {
    return service
      .get(api + url.addVal.userAddValue, {params})
      .then(function (res) {
        return res.data
      })
  },
  // 企业给用户充值
  cost (params) {
    return service
      .jsonGet(api + url.addVal.cost, {params})
      .then(function (res) {
        return res.data
      })
  }
}
