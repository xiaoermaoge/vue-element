import api from '../api'
import lodash from 'lodash'
import {Message} from 'element-ui'
import axios from 'axios'
export default {
  // 根据修改的字段 设置默认
  defaultObject (objA, objB) {
    let newObj = {}
    if (!objB) {
      return newObj
    }
    for (let key in objA) {
      if (key in objB) {
        switch (Object.prototype.toString.call(objB[key])) {
          case '[object Object]':
            newObj[key] = this.defaultObject(objA[key], objB[key])

            break;
          case '[object Array]':
            newObj[key] = objB[key]
              .slice(0)
              .map((v, i) => {
                if (typeof v !== 'object') {
                  if (objA[key][i]) {
                    return v
                  }
                }

                return this.defaultObject(objA[key].v, objB[key].v)
              })
              .filter(v => typeof v !== 'undefined')

            break;
          default:
            newObj[key] = objB[key]
        }
      } else {
        newObj[key] = objA[key]
      }
    }
    return newObj
  },
  // 根据字段名称 获取值
  getComponentsVal (defaultParams, returnParmas) {
    if (returnParmas.data === '') {
      returnParmas.data = null
    }
    let obj = lodash.cloneDeep(defaultParams)
    lodash.forIn(obj, (value, key) => {
      if (key === String(returnParmas.paramsName)) {
        obj[key] = returnParmas.data
      }
    })
    return obj
  },
  // 消息提示
  message (message = '', type = 'success', duration = 3000) {
    Message({
      message: message,
      type: type,
      duration: duration
    })
  },
  changeMessage (code, message, type = 'success', duration = 3000) {
    if (code === 200) {
      Message({
        message: message,
        type: type,
        duration: duration
      })
    }
  },
  async getImg (data) {
    console.log('api', api)
    let resData = (await api.attach.download({
      id: data
    })) || {
      data: ''
    }
    return resData.data
  },
  // 过滤 返回200 状态码 data 为null
  filterData (data) {
    let returnData
    if (data.code === 200 && data.data) {
      returnData = data.data
    } else if (data.code === 200 && !data.data) {
      returnData = ''
    }
    return returnData
  },
  // select 设置 id 和name
  selectFilter (data, id = 'id', name = 'name') {
    let arr = []
    data.forEach(item => {
      if (!item.id) {
        item['id'] = item[id]
      }
      if (!item.name) {
        item['name'] = item[name]
      }
    })
    arr = data
    return arr
  },
  downExcel (options) {
    // console.log('options', options)
    // if (options.total <= 0) {
    //   this.warnMessage('当前没有可导出的数据')
    //   return false
    // }
    let headerOption = {
      headers: {
        // 'content-type': 'application/json;charset=UTF-8',
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        // accessToken: sessionStorage.getItem('token')
      },
      responseType: 'arraybuffer',
      params: options.params
    }
    // console.log('options', options)
    return axios({
      method: 'post',
      url: options.url,
      headers: {
        'content-type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        // accessToken: sessionStorage.getItem('token')
      },
      responseType: 'arraybuffer',
      data: options.params
    }).then(function (res) {
      if (res) {
        const url = window.URL.createObjectURL(
          new Blob([res.data], {type: 'application/vnd.ms-excel'})
        )
        const link = document.createElement('a')

        link.href = url
        link.setAttribute('download', options.text + '.xls')
        document.body.appendChild(link)
        link.click()
        Message({
          message: '导出成功',
          type: 'success',
          duration: 3000
        })
      } else {
        Message({
          message: '导出失败',
          type: 'error',
          duration: 3000
        })
      }
    })

    // return axios.post(options.url, headerOption).then(function (res) {
    //   if (res) {
    //     const url = window.URL.createObjectURL(
    //       new Blob([res], {type: 'application/vnd.ms-excel'})
    //     )
    //     const link = document.createElement('a')

    //     link.href = url
    //     link.setAttribute('download', options.text + '.xls')
    //     document.body.appendChild(link)
    //     link.click()
    //     Message({
    //       message: '导出成功',
    //       type: 'success',
    //       duration: 3000
    //     })
    //   } else {
    //     Message({
    //       message: '导出失败',
    //       type: 'error',
    //       duration: 3000
    //     })
    //   }
    // })
  }
}
