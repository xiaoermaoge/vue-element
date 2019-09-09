
<template>
  <div class="shop-expense-container">

    <div>
      <strong>企业审批列表</strong>
    </div>

    <search>
      <div slot>
        <div class="glo-reset-form">
          <el-form inline
                   size="small">
            <searchInput placeholder="企业名称"
                         @getSelectVal="getSelectVal"
                         paramsName="entName">
            </searchInput>
            <searchSelect placeholder="审核状态"
                          :dataArr="dicData.sysAdmin.approve.approvalStatus"
                          @getSelectVal="getSelectVal"
                          paramsName="approvalStatus">
            </searchSelect>
            <searchDate startPlace='申请开始时间'
                        endPlace='申请结束时间'
                        styleName='width:240px;'
                        @getSelectVal="daterangeVal"
                        type='daterange'
                        paramsName="applicant">
            </searchDate>
            <searchDate startPlace='审批开始时间'
                        endPlace='审批结束时间'
                        styleName='width:240px;'
                        @getSelectVal="daterangeVal"
                        type='daterange'
                        paramsName="approval">
            </searchDate>
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
        <el-table-column label="营业执照">
          <template slot-scope="scope">
            <tableImg :imgId='scope.row.entLicenseId'></tableImg>
          </template>
        </el-table-column>
        <el-table-column prop="userPhone"
                         label="联系方式">
        </el-table-column>
        <el-table-column prop="applyTime"
                         label="申请时间">
        </el-table-column>
        <el-table-column prop="approvalStatus"
                         label="审核状态">
        </el-table-column>
        <el-table-column prop="approvalTime"
                         label="审核时间">
        </el-table-column>
        <el-table-column label='操作'>
          <template slot-scope="scope">
            <textBtn text='查看'
                     @click.native='compDetailSearch(scope.row)'></textBtn>
            <span v-if='scope.row.approvalStatus === "未审核"'>
              <textBtn text='同意'
                       @click.native='topUp(scope.row)'></textBtn>
              <textBtn text="拒绝"
                       @click.native='failComp(scope.row)'></textBtn>
            </span>
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

    <inclusDialog title="企业审批"
                  width="500px"
                  ref="compApprove"
                  :showClose="Boolean(true)">>
      <div slot='dialog-content'>
        <span>是否拒绝该申请？</span>
        <el-row class="glo-inDialog-close-container">
          <el-button @click='closeCompApprove'>
            取消
          </el-button>
          <priBtn text='确定'
                  @click.native='closeCompApproveSub'></priBtn>
        </el-row>
      </div>
    </inclusDialog>

    <inclusDialog title="企业详情"
                  ref="compDetailRef"
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
import searchSelect from '@/components/common/searchSelect'
import textBtn from '@/components/textBtn'
import compDetail from './detail'

export default {
  name: 'index',
  components: {
    compDetail,
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
      detailRow: '',
      failCompData: '',
      tableData: [],
      pageProp: {
        pageNo: 1,
        rows: 10,
        total: 0
      },
      searchData: {
        applicantEndTime: '',
        applicantStartTime: '',
        approvalEndTime: '',
        approvalStartTime: '',
        entName: '', // 企业名称
        userPhone: '', // 联系方式
        approvalStatus: '', // 审核状态
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
    compDetailSearch (row) {
      this.detailRow = row
      this.$refs.compDetailRef.dialogOpen()
    },
    daterangeVal (data) {
      console.log('data', data)
      if (data.paramsName === 'approval') {
        this.searchData.approvalStartTime = data.data[0] || ''
        this.searchData.approvalEndTime = data.data[1] || ''
      } else if (data.paramsName === 'applicant') {
        this.searchData.applicantStartTime = data.data[0] || ''
        this.searchData.applicantEndTime = data.data[1] || ''
      }
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
      let resData = await this.api.approve.entList(this.searchData)
      let data = this.untils.filterData(resData)
      console.log('data', data)
      this.tableData = data.records || []
      this.tableData.forEach((item) => {
        if (item.approvalStatus === 1) {
          item.approvalStatus = '已同意'
        } else if (item.approvalStatus === 0) {
          item.approvalStatus = '未审核'
        } else {
          item.approvalStatus = '已拒绝'
        }
      })
      this.pageProp.total = data.total || 0
      console.log('resData', resData)
    },
    async topUp (row) {
      let resData = await this.api.approve.entDecide({
        decide: 1,
        approvalId: row.id
      })
      this.untils.changeMessage(resData.code, resData.message)
      if (resData.code === 200) {
        this.getList()
      }
      this.closeCompApprove()
      console.log('row', row)
    },
    failComp (row) {
      console.log('row', row)
      this.failCompData = row
      this.$refs.compApprove.dialogOpen()
    },
    closeCompApprove () {
      this.$refs.compApprove.dialogClose()
      this.$refs.compApprove.handleClose()
    },
    async closeCompApproveSub () {
      let resData = await this.api.approve.entDecide({
        decide: -1,
        approvalId: this.failCompData.id
      })
      this.untils.changeMessage(resData.code, resData.message)
      if (resData.code === 200) {
        this.closeCompApprove()
        this.getList()
      }
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
