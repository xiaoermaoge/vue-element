const apiData = {
  user: {
    detail: '/user/detail', // 获取用户详情接口
    faceUpload: '/user/faceUpload', // 人脸照片绑定
    add: '/user/add', // 新增用户（内部接口
    update: '/user/update', // 更新用户
    list: '/user/userList', // 用户列表
    addValue: '/pay/addValue', // 用户充值
    cost: '/user/cost', // 用户消费
    login: '/user/login' // 用户登录
  },
  comp: {
    add: '/ent/add', // 企业新增
    cost: '/ent/cost', // 企业消费（企业给用户充值）
    addValue: '/ent/addValue', // 企业充值
    update: '/ent/update', // 企业更新
    detail: '/ent/detail', // 企业详情
    list: '/ent/list', // 企业列表
    powerChange: '/user/powerChange', // 管理权限移交
    costRecord: '/ent/costRecord', // 企业交易记录
    deleteUser: '/ent/deleteUser' // 删除企业用户
  },
  attach: {
    download: '/attachedFile/download', // 附件下载
    upload: '/attachedFile/upload' // 附件上传
  },
  cost: {
    costRecord: '/user/costRecord', // 用户交易记录
    list: '/bill/list', // 流水明细
    listToMarket: '/bill/listToMarket', // 超市流水明细
    listToEat: '/bill/listToEat', // 餐饮流水明细
    entRecordToAdmin: '/admin/entRecordToAdmin', // 获取系统管理员充值记录（给企业）
    userRecordToAdmin: '/admin/userRecordToAdmin' // 获取系统管理员充值记录（给个人）
  },
  approve: {
    userList: '/approval/userList', // 用户审批列表
    entDecide: '/approval/entDecide', // 企业审批操作
    entList: '/approval/entList', // 企业审批列表
    userDecide: '/approval/userDecide' // 用户审批操作
  },
  addVal: {
    userAddValue: '/admin/userAddValue', // 后台给用户充值
    entAddValue: '/admin/entAddValue', // 后台给企业充值
    cost: '/ent/cost' // 企业给用户充值
  },
  common: {
    modifyPassword: '/user/modifyPassword', // 修改密码
    getReportForm: '/admin/getReportForm', // 获取报表
    modifyAdmin: '/ent/modifyAdmin' // 后台修改企业管理员
  }
}
export default apiData
