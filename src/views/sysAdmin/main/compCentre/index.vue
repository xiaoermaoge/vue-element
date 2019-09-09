<template>
  <div class="shop-expense-container">

    <div>
      <strong>企业列表</strong>
    </div>

    <search>
      <div slot>
        <div class="glo-reset-form">
          <el-form inline
                   size="small">
            <searchInput placeholder="企业名称"
                         @getSelectVal="getSelectVal"
                         paramsName="entName"></searchInput>
            <searchInput placeholder="法人代表"
                         @getSelectVal="getSelectVal"
                         paramsName="entLegal"></searchInput>
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
        <el-table-column prop="entName"
                         label="企业名称">
        </el-table-column>
        <el-table-column prop="entLegal"
                         label="企业法人">
        </el-table-column>
        <el-table-column prop="entSocialCode"
                         label="企业统一社会信用代码"
                         width="320">
        </el-table-column>
        <el-table-column label="企业营业执照"
                         width="120">
          <template slot-scope="scope">
            <tableImg :imgId='scope.row.entLicenseId'></tableImg>
          </template>
        </el-table-column>
        <el-table-column label="企业余额/元"
                         prop='entBalance'>

        </el-table-column>
        <el-table-column prop="entAdmin"
                         label="企业管理员">
        </el-table-column>
        <el-table-column label='操作'>
          <template slot-scope="scope">
            <div>
              <textBtn text="查看"
                       @click.native='detail(scope.row)'></textBtn>
              <textBtn text='充值'
                       @click.native='topUp(scope.row)'></textBtn>
              <!-- <textBtn text="删除"
                       @click.native='deleteRow(scope.row)'></textBtn> -->
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
          <!-- <div style='display:flex;align-items:center;justify-content: center;'> -->
          <div>
            <el-form inline
                     ref='topUpDataRef'
                     :rules="topUpDataRule"
                     :model="topUpData"
                     size="small">
              <textInput :required="Boolean(false)"
                         :readOnly='Boolean(true)'
                         :inputVal='topUpcompData.entName'
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

    <inclusDialog title="删除企业"
                  width="500px"
                  ref="deleteComp"
                  :showClose="Boolean(true)">>
      <div slot='dialog-content'>
        <span>是否删除企业</span>
        <el-row class="glo-inDialog-close-container">
          <el-button @click='closeDeleteDialog'>
            取消
          </el-button>
          <priBtn text='确定'
                  @click.native='deleteCompF'></priBtn>
        </el-row>
      </div>
    </inclusDialog>

    <inclusDialog title="企业详情"
                  ref="compDetail"
                  :closeOnClickModal='Boolean(true)'
                  :showClose="Boolean(true)">>
      <div slot='dialog-content'>
        <compDetail :row='detailRow'></compDetail>
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
import textBtn from '@/components/textBtn'
import compDetail from './detail'
import textInput from '@/components/common/form/textInput'

export default {
  name: 'index',
  components: {
    textInput,
    compDetail,
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
      topUpcompData: '',
      topUpData: {
        entId: '',
        amount: ''
      },
      topUpDataRule: {
        amount: [
          { required: true, message: '请输入充值的金额', trigger: 'blur' },
          { validator: this.vali.numberVerify, trigger: 'blur' }
        ]
      },
      detailRow: '',
      tableData: [],
      pageProp: {
        pageNo: 1,
        rows: 10,
        total: 0
      },
      searchData: {
        entName: '', // 企业名称
        entLegal: '', // 法人代表
        page: 1,
        rows: 10
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
    getSelectVal (data) {
      this.searchData = this.untils.getComponentsVal(this.searchData, data)
    },
    getPageData (data) {
      this.searchData.page = data.pageNo
      this.searchData.rows = data.rows
      this.getList()
    },
    async getList () {
      console.log(this.searchData)
      let resData = await this.api.comp.list(this.searchData)
      let data = this.untils.filterData(resData)
      this.tableData = data.records
      this.pageProp.total = data.total || 0
      console.log('resData', resData)
    },
    deleteRow (row) {
      console.log('row', row)
      this.$refs.deleteComp.dialogOpen()
    },
    closeDeleteDialog () {
      this.$refs.deleteComp.dialogClose()
      this.$refs.deleteComp.handleClose()
    },
    deleteCompF () {
      console.log('确定删除')
      this.closeDeleteDialog()
    },
    detail (row) {
      this.detailRow = row
      this.$refs.compDetail.dialogOpen()
    },

    topUp (row) {
      this.topUpcompData = row
      this.$refs.userAddValue.dialogOpen()
    },
    topUpSub (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          console.log('验证')
          let resData = await this.api.addVal.entAddValue({
            entId: this.topUpcompData.id,
            amount: this.topUpData.amount
          })
          this.untils.changeMessage(resData.code, resData.message)
          this.closeTopUp()
          if (resData.code === 200) {
            this.getList()
          }
        }
      })
    },
    closeTopUp () {
      this.$refs.userAddValue.dialogClose()
      this.$refs.userAddValue.handleClose()
    },
    getFormData (data) {
      console.log('data', data)
      this.topUpData = this.untils.getComponentsVal(this.topUpData, data)
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
