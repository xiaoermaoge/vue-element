import {service, api} from '@/untils/request'
import url from '@/untils/api'
export default {
  download (params) {
    return service.get(api + url.attach.download, {params})
      .then(function (res) {
        return res.data
      })
  },
  upload (params) {
    return service.post(api + url.attach.upload, params)
      .then(function (res) {
        return res.data
      })
  }
}
