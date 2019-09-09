let userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
const dicData = {
  sysAdmin: {
    approve: {
      // 企业审核状态
      approvalStatus: [
        {
          id: 0,
          name: '未审核'
        },
        {
          id: 1,
          name: '已同意'
        },
        {
          id: -1,
          name: '已拒绝'
        }
      ]
    },
    report: {
      fieldName: [
        {
          id: 1,
          name: '食堂流水'
        },
        {
          id: 2,
          name: '超市流水'
        },
        {
          id: 3,
          name: '用户充值'
        },
        {
          id: 4,
          name: '用户消费'
        },
        {
          id: 5,
          name: '企业充值'
        },
        {
          id: 5,
          name: '企业消费'
        }
      ]
    }
  },
  compAdmin: {
    approve: {
      // 员工认证企业审核状态
      approvalStatus: [
        {
          id: 0,
          name: '未审核'
        },
        {
          id: 1,
          name: '已同意'
        },
        {
          id: -1,
          name: '已拒绝'
        }
      ]
    },
    topUp: {
      costContent: [
        {
          id: '给用户充值',
          name: '给用户充值'
        },
        {
          id: '管理员充值',
          name: '管理员充值'
        }
      ]
    }
  },
  shopsAdmin: {
    billList: {
      type: [
        {
          id: 1,
          name: '食堂'
        },
        {
          id: 2,
          name: '超市'
        }
      ]
    }
  },
  userInfo: userInfo
}
export default dicData
