
<template>
  <div class="shop-expense-container">

    <div>
      <strong>企业人员列表</strong>
    </div>

    <search>
      <div slot>
        <div class="glo-reset-form">
          <el-form inline
                   size="small">
            <searchInput placeholder="人员名称"
                         @getSelectVal="getSelectVal"
                         paramsName="name">
            </searchInput>
            <el-form-item>
              <priBtn text="搜索"
                      @click.native='getList'></priBtn>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </search>
    <div class="glo-reset-table">
      <el-table :data="tableData"
                style="width: 100%">
        <el-table-column label="序号"
                         type="index"
                         width="55">
        </el-table-column>
        <el-table-column prop="userName"
                         label="姓名">
        </el-table-column>
        <el-table-column prop="userPhone"
                         label="联系电话">
        </el-table-column>
        <el-table-column prop="userBalance"
                         label="余额/元">
        </el-table-column>
        <el-table-column label='操作'>
          <template slot-scope="scope">
            <div>
              <textBtn text='充值'
                       @click.native='topUp(scope.row)'></textBtn>
              <textBtn text="删除"
                       @click.native='deleteRow(scope.row)'></textBtn>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="glo-page">
      <div class="page-content">
        <page :pageProp="pageProp"
              @getPageData="getPageData"></page>
      </div>
    </div>

    <inclusDialog title="充值"
                  width="500px"
                  ref="userAddValue"
                  :showClose="Boolean(true)">>
      <div slot='dialog-content'>
        <div>
          <div>
            <el-form inline
                     ref='topUpDataRef'
                     :rules="topUpDataRule"
                     :model="topUpData"
                     size="small">
              <textInput :readOnly='Boolean(true)'
                         :inputVal='topUpUser.userName'
                         @getFormData='getFormData'
                         text='充值对象：'></textInput>
              <textInput :required="Boolean(true)"
                         validateText='amount'
                         paramsName='amount'
                         @getFormData='getFormData'
                         text='充值金额：'></textInput>
            </el-form>
          </div>
        </div>
        <el-row class="glo-inDialog-close-container">
          <el-button @click='closeTopUp'>
            取消
          </el-button>
          <priBtn text='确定'
                  @click.native='topUpSub("topUpDataRef")'></priBtn>
        </el-row>
      </div>
    </inclusDialog>

    <inclusDialog title="删除用户"
                  width="500px"
                  ref="deleteComp"
                  :showClose="Boolean(true)">>
      <div slot='dialog-content'>
        <span>是否删除当前用户</span>
        <el-row class="glo-inDialog-close-container">
          <el-button @click='closeDeleteDialog'>
            取消
          </el-button>
          <priBtn text='确定'
                  @click.native='closeDeleteDialogSub'></priBtn>
        </el-row>
      </div>
    </inclusDialog>
  </div>
</template>

<script>
import search from '@/components/common/search'
import searchInput from '@/components/common/searchInput'
import searchDate from '@/components/common/searchDate'
import page from '@/components/common/page'
import tableImg from '@/components/common/tableImg'
import inclusDialog from '@/components/common/inclusDialog'
import searchSelect from '@/components/common/searchSelect'
import textBtn from '@/components/textBtn'
import textInput from '@/components/common/form/textInput'
import formComponent from '@/components/common/form'

export default {
  name: 'index',
  components: {
    formComponent,
    textInput,
    searchSelect,
    inclusDialog,
    tableImg,
    searchDate,
    searchInput,
    page,
    textBtn,
    search
  },
  data () {
    return {
      deleteUser: '',
      topUpUser: '',
      tableData: [],
      pageProp: {
        pageNo: 1,
        rows: 10,
        total: 100
      },
      searchData: {
        entId: this.dicData.userInfo.userBelongEntId,
        name: '', // 人员名称
        page: 1,
        rows: 10
      },
      topUpData: {
        userId: '',
        amount: ''
      },
      topUpDataRule: {
        amount: [
          { required: true, message: '请输入充值的金额', trigger: 'blur' },
          { validator: this.vali.numberVerify, trigger: 'blur' }
        ]
      }
    }
  },
  props: {},
  computed: {},
  watch: {},
  mounted () {
    this.getList()
  },
  methods: {
    getFormData (data) {
      console.log('data', data)
      this.topUpData = this.untils.getComponentsVal(this.topUpData, data)
    },
    getSelectVal (data) {
      this.searchData = this.untils.getComponentsVal(this.searchData, data)
    },
    getPageData (data) {
      this.searchData.page = data.pageNo
      this.searchData.rows = data.rows
      this.getList()
    },
    async getList () {
      console.log('this.searchData', this.searchData)
      let resData = await this.api.user.list(this.searchData)
      let data = this.untils.filterData(resData)

      this.tableData = data.records || []
      this.tableData.forEach((item) => {
        if (!item.userBalance) {
          item['userBalance'] = 0
        }
      })
      this.pageProp.total = data.total || 0
      console.log('resData', resData)
    },
    topUp (row) {
      this.topUpUser = row
      this.$refs.userAddValue.dialogOpen()
    },
    topUpSub (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let resData = await this.api.addVal.cost({
            userId: this.topUpUser.id,
            entId: this.dicData.userInfo.userBelongEntId,
            amount: this.topUpData.amount
          })
          this.untils.changeMessage(resData.code, resData.message)
          if (resData.code === 200) {
            this.getList()
          }
          this.closeTopUp()
        }
      })
    },
    closeTopUp () {
      this.$refs.userAddValue.dialogClose()
      this.$refs.userAddValue.handleClose()
    },
    deleteRow (row) {
      console.log('row', row)
      this.deleteUser = row
      this.$refs.deleteComp.dialogOpen()
    },
    closeDeleteDialog () {
      this.$refs.deleteComp.dialogClose()
      this.$refs.deleteComp.handleClose()
    },
    async closeDeleteDialogSub () {
      console.log('this.api', this.api)
      let resData = await this.api.comp.deleteUser({
        userId: this.deleteUser.id
      })
      this.untils.changeMessage(resData.code, resData.message)
      if (resData.code === 200) {
        this.getList()
        this.closeDeleteDialog()
      }
      console.log('企业删除用户')
    }
  }

}
</script>

<style lang='scss'>
.shop-expense-container {
  .header {
  }
}
</style>
