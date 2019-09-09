import {service, api} from '@/untils/request'
import url from '@/untils/api'
export default {
  // 获取用户详情接口
  detail (params) {
    return service.get(api + url.user.detail, {params}).then(function (res) {
      return res.data
    })
  },
  // 人脸照片绑定
  faceUpload (params) {
    return service
      .get(api + url.user.faceUpload, {params})
      .then(function (res) {
        return res.data
      })
  },
  // 用户新增
  add (params) {
    return service.post(api + url.user.add, params).then(function (res) {
      return res.data
    })
  },
  // 更新用户
  update (params) {
    return service.json(api + url.user.update, params).then(function (res) {
      return res.data
    })
  },
  // 用户列表
  list (params) {
    return service.json(api + url.user.list, params).then(function (res) {
      return res.data
    })
  },
  // 用户充值
  addValue (params) {
    return service
      .get(api + url.user.addValue, {params})
      .then(function (res) {
        return res.data
      })
  },
  // 用户消费
  cost (params) {
    return service.post(api + url.user.cost, params).then(function (res) {
      return res.data
    })
  },
  // 用户登录
  login (params) {
    return service.json(api + url.user.login, params).then(function (res) {
      return res.data
    })
  }
}
