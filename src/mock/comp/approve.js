import Mock from 'mockjs'
import url from '@/untils/api'
export default {
  uesrList () {
    Mock.mock(RegExp(url.approve.uesrList + '.*'), () => {
      return {
        code: 200,
        message: '操作成功',
        data: [
          {
            applicantName: '张学友',
            userHeadPortrait: 65,
            userPhone: '18545613655',
            applyTime: '2018-05-13',
            approvalStatus: '已拒绝',
            approvalTime: '2018-06-13'
          },
          {
            applicantName: '张学友',
            userHeadPortrait: 65,
            userPhone: '18545613655',
            applyTime: '2018-05-13',
            approvalStatus: '已拒绝',
            approvalTime: '2018-06-13'
          },
          {
            applicantName: '张学友',
            userHeadPortrait: 65,
            userPhone: '18545613655',
            applyTime: '2018-05-13',
            approvalStatus: '已拒绝',
            approvalTime: '2018-06-13'
          }
        ]
      }
    })
  }
}
