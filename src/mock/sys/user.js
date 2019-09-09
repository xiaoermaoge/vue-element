import Mock from 'mockjs'
import url from '@/untils/api'
export default {
  list () {
    Mock.mock(RegExp(url.user.list + '.*'), () => {
      return {
        code: 200,
        message: '操作成功',
        data: [
          {
            userName: '周杰伦',
            userPhone: '17895425665',
            userBelongEnt: '信通院',
            userBalance: '62.69'
          },
          {
            userName: '张学友',
            userPhone: '17895425665',
            userBelongEnt: '信通院',
            userBalance: '62.69'
          }
        ]
      }
    })
  },
  // 后台给用户充值
  userAddValue () {
    Mock.mock(RegExp(url.addVal.userAddValue + '.*'), () => {
      return {
        code: 200,
        message: '操作成功',
        data: {
          transactionContent: '后台管理员充值',
          transactionNumber: '2019082100006',
          transactionTime: '2019-08-21',
          transactionAmount: '600.00',
          transactionBalance: '900.00',
          transactionType: '收入'
        }
      }
    })
  }
}
