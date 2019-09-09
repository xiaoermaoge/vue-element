import {service, api} from '@/untils/request'
import url from '@/untils/api'
export default {
  // 修改密码
  modifyPassword (params) {
    return service
      .json(api + url.common.modifyPassword, params)
      .then(function (res) {
        return res.data
      })
  },
  // 管理权限移交
  powerChange (params) {
    return service
      .json(api + url.common.powerChange, params)
      .then(function (res) {
        return res.data
      })
  },
  // 后台修改企业管理员
  modifyAdmin (params) {
    return service
      .jsonGet(api + url.common.modifyAdmin, {params})
      .then(function (res) {
        return res.data
      })
  },
  // 获取报表
  getReportForm (params) {
    return service
      .json(api + url.common.getReportForm, params)
      .then(function (res) {
        return res.data
      })
  }
}
