<template>
  <div class="shop-expense-container">

    <div>
      <strong>充值记录</strong>
    </div>

    <el-tabs v-model="activeName"
             @tab-click="handleClickTab">
      <el-tab-pane label="企业充值记录"
                   name="ent"></el-tab-pane>
      <el-tab-pane label="用户充值记录"
                   name="user"></el-tab-pane>
    </el-tabs>

    <search>
      <div slot>
        <div class="glo-reset-form">
          <el-form inline
                   size="small">
            <searchDate placeholder="开始时间"
                        @getSelectVal="getSelectVal"
                        paramsName="costStartTime"></searchDate>
            <searchDate placeholder="开始时间"
                        @getSelectVal="getSelectVal"
                        paramsName="costEndTime"></searchDate>
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
        <el-table-column prop="transactionTime"
                         label="充值时间">
        </el-table-column>
        <el-table-column prop="transactionContent"
                         label="充值对象">
        </el-table-column>
        <el-table-column prop="transactionAmount"
                         label="充值金额/元">
        </el-table-column>
        <el-table-column label="充值后金额/元"
                         prop="transactionBalance">
        </el-table-column>
      </el-table>
    </div>

    <div class="glo-page">
      <div class="page-content">
        <page :pageProp="pageProp"
              @getPageData="getPageData"></page>
      </div>
    </div>

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
      </div>
    </inclusDialog>
  </div>
</template>

<script>
import search from '@/components/common/search'
import searchSelect from '@/components/common/searchSelect'
import searchDate from '@/components/common/searchDate'
import page from '@/components/common/page'
import tableImg from '@/components/common/tableImg'
import inclusDialog from '@/components/common/inclusDialog'
import textBtn from '@/components/textBtn'

export default {
  name: 'index',
  components: {
    inclusDialog,
    tableImg,
    searchDate,
    searchSelect,
    page,
    textBtn,
    search
  },
  data () {
    return {
      activeName: 'ent',
      detailRow: '',
      tableData: [],
      pageProp: {
        pageNo: 1,
        rows: 10,
        total: 0
      },
      searchData: {
        costEndTime: '',
        costStartTime: '',
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
      let resData
      if (this.activeName === 'ent') {
        resData = await this.api.cost.entRecordToAdmin(this.searchData)
      } else if (this.activeName === 'user') {
        resData = await this.api.cost.userRecordToAdmin(this.searchData)
      }
      let data = this.untils.filterData(resData)
      this.tableData = data.records
      this.pageProp.total = resData.total || 0
    },

    closeDeleteDialog () {
      this.$refs.deleteComp.dialogClose()
      this.$refs.deleteComp.handleClose()
    },
    deleteCompF () {
      console.log('确定删除')
      this.closeDeleteDialog()
    },
    handleClickTab () {
      this.searchData.page = 1
      this.searchData.rows = 10
      this.getList()
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
