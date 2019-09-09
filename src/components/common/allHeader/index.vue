<template>
  <div class="">
    <span @click='changePassSub'>修改密码</span>
    <span @click='loginOut'
          style='display: inline-block;margin-left: 15px;'>
      退出
    </span>

    <inclusDialog title="退出系统"
                  width="500px"
                  ref="loginSys"
                  :showClose="Boolean(true)">>
      <div slot='dialog-content'>
        <span>是否退出系统？</span>
        <el-row class="glo-inDialog-close-container">
          <el-button @click='failLoginOut'>
            取消
          </el-button>
          <priBtn text='确定'
                  @click.native='failLoginOutSub'></priBtn>
        </el-row>
      </div>
    </inclusDialog>

    <inclusDialog title="修改密码"
                  width="500px"
                  ref="changePass"
                  :showClose='!isNeedChangePass'>
      <div slot='dialog-content'>
        <el-form inline
                 ref='changePassRef'
                 :rules="changeRules"
                 :model="changeData"
                 size="small">
          <textInput :required="Boolean(true)"
                     validateText='oldPassWord'
                     paramsName='oldPassWord'
                     @getFormData='getFormData'
                     text='旧密码：'></textInput>
          <textInput :required="Boolean(true)"
                     inputType='password'
                     validateText='newPassword'
                     paramsName='newPassword'
                     @getFormData='getFormData'
                     text='新密码：'></textInput>
          <textInput :required="Boolean(true)"
                     inputType='password'
                     validateText='confirmNewPass'
                     paramsName='confirmNewPass'
                     @getFormData='getFormData'
                     text='再次确认新密码：'></textInput>
        </el-form>
        <el-row class="glo-inDialog-close-container">
          <el-button @click='closeChangePass'
                     v-if='!isNeedChangePass'>
            取消
          </el-button>
          <priBtn text='确定'
                  @click.native='closeChangePassSub("changePassRef")'></priBtn>
        </el-row>
      </div>
    </inclusDialog>
  </div>
</template>

<script>
import textInput from '@/components/common/form/textInput'
import inclusDialog from '@/components/common/inclusDialog'
export default {
  name: '',
  components: {
    inclusDialog,
    textInput
  },
  data () {
    return {
      isNeedChangePass: false,
      changeData: {
        userId: '',
        oldPassWord: '',
        newPassword: '',
        confirmNewPass: ''
      },
      changeRules: {
        oldPassWord: [
          { required: true, message: '请输入旧密码', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { validator: this.vali.letterNum, trigger: 'blur' }
        ],
        confirmNewPass: [
          { required: true, message: '请再次输入新密码', trigger: 'blur' },
          { validator: this.vali.letterNum, trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    this.isNeedChange()
  },
  methods: {
    loginOut () {
      this.$refs.loginSys.dialogOpen()
    },
    failLoginOut () {
      this.$refs.loginSys.dialogClose()
      this.$refs.loginSys.handleClose()
    },
    failLoginOutSub () {
      console.log('退出')
      this.$router.push({
        path: '/login'
      })
      this.$refs.loginSys.dialogClose()
      this.$refs.loginSys.handleClose()
      sessionStorage.clear()
    },
    changePassSub () {
      this.$refs.changePass.dialogOpen()
    },
    getFormData (data) {
      console.log('data', data)
      this.changeData = this.untils.getComponentsVal(this.changeData, data)
    },
    closeChangePass () {
      this.$refs.changePass.dialogClose()
      this.$refs.changePass.handleClose()
    },
    closeChangePassSub (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          if (this.changeData.newPassword !== this.changeData.confirmNewPass) {
            this.untils.message('两次输入的新密码不相同，请重新输入新密码', 'warning')
          } else {
            let userInfo = JSON.parse(sessionStorage.getItem('userInfo') || '')
            let _userId = userInfo.id
            let resData = await this.api.common.modifyPassword({
              userId: _userId,
              oldPassword: this.changeData.oldPassWord,
              newPassword: this.changeData.newPassword
            })
            this.untils.changeMessage(resData.code, resData.message)
            if (resData.code === 200) {
              this.closeChangePass()
              this.$router.push({
                path: '/login'
              })
            }
          }
        }
      })
    },
    // 只有企业管理员才强制修改
    isNeedChange () {
      let userInfo = JSON.parse(sessionStorage.getItem('userInfo') || '')
      let isModifyPwd = userInfo.isModifyPwd
      let roles = userInfo.roles
      if (roles === 2) {
        if (isModifyPwd === 0 || !isModifyPwd) {
          this.isNeedChangePass = true
          this.$refs.changePass.dialogOpen()
        }
      }
    }
  }
}
</script>

<style lang="" scoped>
. {
}
</style>
