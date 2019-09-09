import Mock from 'mockjs'
import url from '@/untils/api'
export default {
  list () {
    Mock.mock(RegExp(url.comp.list + '.*'), () => {
      return {
        code: 200,
        message: '操作成功',
        data: [
          {
            entName: '信通院',
            entLegal: 'XXX',
            entEstablishTime: '2018-06-11',
            entSocialCode: '3543434313513214445',
            entAddress: '玉马路八号',
            entLicenseId: 1,
            entBalance: 4527.27,
            entAdmin: 78
          }
        ]
      }
    })
  },
  detail () {
    Mock.mock(RegExp(url.comp.detail + '.*'), () => {
      return {
        code: 200,
        message: '操作成功',
        data: {
          entName: '信通院',
          entLegal: 'XXX',
          entEstablishTime: '2018-06-11',
          entSocialCode: '3543434313513214445',
          entAddress: '玉马路八号',
          entLicenseId: 26,
          entBalance: 4527.27,
          entAdmin: 78,
          isSettledIn: 1
        }
      }
    })
  }
}
