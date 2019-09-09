
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
            <searchInput placeholder="申请人"
                         @getSelectVal="getSelectVal"
                         paramsName="applicantName">
            </searchInput>
            <searchSelect placeholder="审核状态"
                          :dataArr="dicData.compAdmin.approve.approvalStatus"
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
            <!-- <searchDate placeholder="申请开始时间"
                        @getSelectVal="getSelectVal"
                        paramsName="applicantStartTime">
            </searchDate>
            <searchDate placeholder="申请结束时间"
                        @getSelectVal="getSelectVal"
                        paramsName="applicantEndTime">
            </searchDate>
            <searchDate placeholder="审批开始时间"
                        @getSelectVal="getSelectVal"
                        paramsName="approvalStartTime">
            </searchDate>
            <searchDate placeholder="审批结束时间"
                        @getSelectVal="getSelectVal"
                        paramsName="approvalEndTime">
            </searchDate> -->
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
        <el-table-column prop="applicantName"
                         label="申请人">
        </el-table-column>
        <el-table-column label="申请人头像">
          <template slot-scope="scope">
            <tableImg :imgId='scope.row.userHeadPortrait'></tableImg>
          </template>
        </el-table-column>
        <el-table-column prop="userPhone"
                         label="联系电话">
        </el-table-column>
        <el-table-column prop="applyTime"
                         label="申请时间">
        </el-table-column>
        <el-table-column prop="approvalTime"
                         label="审核时间">
        </el-table-column>
        <el-table-column prop="approvalStatus"
                         label="审核状态">
        </el-table-column>
        <el-table-column label='操作'>
          <template slot-scope="scope">
            <div v-if='scope.row.approvalStatus === "未审核"'>
              <textBtn text='同意'
                       @click.native='topUp(scope.row)'></textBtn>
              <textBtn text="拒绝"
                       @click.native='refuse(scope.row)'></textBtn>
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

    <inclusDialog title="拒绝申请"
                  width="500px"
                  ref="failApprove"
                  :showClose="Boolean(true)">>
      <div slot='dialog-content'>
        <span>是否拒绝
          {{failUser.applicantName}}
          申请认证本企业
        </span>
        <el-row class="glo-inDialog-close-container">
          <el-button @click='closeApprove'>
            取消
          </el-button>
          <priBtn text='确定'
                  @click.native='closeApproveSub'></priBtn>
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

export default {
  name: 'index',
  components: {
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
      failUser: '',
      tableData: [],
      pageProp: {
        pageNo: 1,
        rows: 10,
        total: 0
      },
      searchData: {
        entId: this.dicData.userInfo.userBelongEntId,
        applicantName: '', // 申请人
        applicantStartTime: '', // 申请开始时间
        approvalStartTime: '', // 审批开始时间
        applicantEndTime: '', // 申请结束时间
        approvalEndTime: '', // 审批结束时间
        approvalStatus: null, // 审批状态
        page: 1,
        rows: 10
      }
    }
  },
  props: {},
  computed: {},
  watch: {},
  mounted () {
    console.log('approve', this.dicData)
    this.getList()
  },
  methods: {
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
      console.log('this.searchData', this.searchData)
      console.log('this.searchData', this.dicData)
      let resData = await this.api.approve.userList(this.searchData)
      let data = this.untils.filterData(resData)
      this.tableData = data.records || []
      this.tableData.forEach((item) => {
        if (item.approvalStatus === 0) {
          item.approvalStatus = '未审核'
        } else if (item.approvalStatus === -1) {
          item.approvalStatus = '已拒绝'
        } else if (item.approvalStatus === 1) {
          item.approvalStatus = '已同意'
        }
      })
      this.pageProp.total = data.total || 0
      console.log('resData', resData)
      console.log('this.tableData', this.tableData)
    },
    async topUp (row) {
      let resData = await this.api.approve.userDecide({
        decide: 1,
        approvalId: row.id
      })
      this.untils.changeMessage(resData.code, resData.message)
      if (resData.code === 200) {
        this.getList()
      }
      console.log('row', row)
    },
    refuse (row) {
      this.failUser = row
      console.log('是否拒绝')
      this.$refs.failApprove.dialogOpen()
    },
    async closeApproveSub () {
      let resData = await this.api.approve.userDecide({
        decide: -1,
        approvalId: this.failUser.id
      })
      this.untils.changeMessage(resData.code, resData.message)
      this.closeApprove()
      if (resData.code === 200) {
        this.getList()
      }
    },
    closeApprove () {
      this.$refs.failApprove.dialogClose()
      this.$refs.failApprove.handleClose()
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
