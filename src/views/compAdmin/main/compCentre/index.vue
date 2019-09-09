<template>
  <div class="compCentre-contaoner">
    <div>
      <strong>企业详情</strong>
    </div>
    <div>
      <el-row :gutter='10'>
        <el-col :span='24'>
          企业名称： {{detailData.entName}}
        </el-col>
        <el-col :span="12">
          企业管理员：
          <span>
            {{detailData.entAdminName}}
            <textBtn @click.native='changeAdmin'
                     text='移交管理员'></textBtn>
          </span>
        </el-col>
        <el-col :span="12">
          法人代表：{{detailData.entLegal}}
        </el-col>
        <el-col :span="12">
          当前余额：{{detailData.entBalance || 0}}元
        </el-col>
        <el-col :span="12">
          统一社会信用代码：{{detailData.entSocialCode}}
        </el-col>
        <el-col :span="24">
          营业执照：
          <div style='width: 400px; height: 300px;margin: 0 auto'>
            <img :src="imgUrl"
                 style='width: 100%;'
                 alt="">
          </div>
        </el-col>
      </el-row>
    </div>
    <inclusDialog title="移交管理权限"
                  width="500px"
                  ref="changeAdminDialog"
                  :showClose="Boolean(true)">>
      <div slot='dialog-content'>
        <el-form inline
                 ref='changeAdminRef'
                 :rules="changeAdminRules"
                 :model="changeAdminData"
                 size="small">
          <selector :required="Boolean(true)"
                    inputType='newUserId'
                    :clearable='Boolean(false)'
                    :dataArr='allUser'
                    validateText='newUserId'
                    paramsName='newUserId'
                    @getSelectVal='getFormData'
                    text='选择移交人员：'></selector>
          <textInput :required="Boolean(true)"
                     validateText='password'
                     paramsName='password'
                     @getFormData='getFormData'
                     text='输入密码确认：'></textInput>
        </el-form>
        <el-row class="glo-inDialog-close-container">
          <el-button @click='closeChangeAdmin'>
            取消
          </el-button>
          <priBtn text='确定'
                  @click.native='closeChangeAdminSub("changeAdminRef")'></priBtn>
        </el-row>
      </div>
    </inclusDialog>

  </div>
</template>

<script>
import selector from '@/components/common/form/selector'
import textInput from '@/components/common/form/textInput'
import inclusDialog from '@/components/common/inclusDialog'
export default {
  name: '',
  components: {
    selector,
    textInput,
    inclusDialog
  },
  data () {
    return {
      allUser: [],
      changeAdminData: {
        oldUserId: this.dicData.userInfo.id,
        newUserId: '',
        password: ''
      },
      changeAdminRules: {
        newUserId: [
          { required: true, message: '请选择移交的人员', trigger: 'change' }
        ],
        password: [
          { required: true, message: '请再次输入密码确认', trigger: 'blur' }
        ]
      },
      detailData: '',
      imgUrl: ''
    }
  },
  mounted () {
    this.getDetail()
    this.getCompAllUser()
  },
  methods: {
    // 获取当前企业的所有人员
    async getCompAllUser () {
      let resData = await this.api.user.list({
        entId: this.dicData.userInfo.userBelongEntId,
        page: 1,
        rows: 9999999
      })
      let data = this.untils.filterData(resData)
      // 过滤当前管理员
      data.records.forEach((item, index) => {
        if (item.id === (this.detailData.entAdmin || '')) {
          data.records.splice(index, 1)
        }
      })
      let records = this.untils.selectFilter(data.records || [], 'id', 'userName')
      this.allUser = records
      console.log('this.allUser', this.allUser)
      console.log('records', records)
    },
    closeChangeAdminSub (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let resData = await this.api.comp.powerChange(this.changeAdminData)
          this.untils.changeMessage(resData.code, resData.message)
          if (resData.code === 200) {
            this.closeChangeAdmin()
            this.$router.push({
              path: '/login'
            })
          }
        }
      })
    },
    closeChangeAdmin () {
      this.$refs.changeAdminDialog.dialogClose()
      this.$refs.changeAdminDialog.handleClose()
    },
    changeAdmin () {
      this.$refs.changeAdminDialog.dialogOpen()
    },
    getFormData (data) {
      console.log('data', data)
      this.changeAdminData = this.untils.getComponentsVal(this.changeAdminData, data)
    },
    async getDetail () {
      let resData = await this.api.comp.detail({
        entId: this.dicData.userInfo.userBelongEntId
      })
      let data = this.untils.filterData(resData)
      this.detailData = data || {}
      if (resData.code === 200) {
        let imgData = await this.untils.getImg(this.detailData.entLicenseId)
        this.imgUrl = 'data:image/jpeg;base64,' + imgData
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.compCentre-contaoner {
  .el-col-12,
  .el-col-24 {
    padding: 10px 0;
  }
}
</style>
