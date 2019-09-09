export default {
  numberVerify (rule, value, callback) {
    let reg = /^(-)?[1-9][0-9]*$/ // 正数 和 负数
    let data = reg.test(value)
    // console.log('data', data)
    // console.log(value)
    if (data) {
      callback()
    } else {
      callback(new Error('只能为数字类型'))
    }
  },
  letterNum (rule, value, callback) {
    let reg = /^(?!(?:\d+|[a-zA-Z]+)$)[\da-zA-Z]{6,10}$/
    let data = reg.test(value)
    if (data) {
      callback()
    } else {
      callback(new Error('必须包含英文和数字，长度为6到10'))
    }
  }
}
