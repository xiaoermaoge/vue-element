import Mock from 'mockjs'
import url from '@/untils/api'
export default {
  entList () {
    Mock.mock(RegExp(url.approve.entList + '.*'), () => {
      return {
        code: 200,
        message: '操作成功',
        data: [
          {
            entName: '信通院',
            entLicenseId: 65,
            userPhone: '18545613655',
            applyTime: '2018 - 05 - 13',
            approvalStatus: '已拒绝',
            approvalTime: '2018 - 06 - 13'
          },
          {
            entName: '信通院',
            entLicenseId: 65,
            userPhone: '18545613655',
            applyTime: '2018 - 05 - 13',
            approvalStatus: '已拒绝',
            approvalTime: '2018 - 06 - 13'
          },
          {
            entName: '信通院',
            entLicenseId: 65,
            userPhone: '18545613655',
            applyTime: '2018 - 05 - 13',
            approvalStatus: '已拒绝',
            approvalTime: '2018 - 06 - 13'
          },
          {
            entName: '信通院',
            entLicenseId: 65,
            userPhone: '18545613655',
            applyTime: '2018 - 05 - 13',
            approvalStatus: '已拒绝',
            approvalTime: '2018 - 06 - 13'
          }
        ]
      }
    })
  }
}
