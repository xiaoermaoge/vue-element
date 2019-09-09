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
            <searchInput placeholder="消费人"
                         @getSelectVal="getSelectVal"
                         paramsName="costUser">
            </searchInput>
            <!--
              <searchSelect placeholder="消费类型"
                          :dataArr='dicData.shopsAdmin.billList.type'
                          @getSelectVal="getSelectVal"
                          paramsName="entLegal">
            </searchSelect>
            -->
            <searchDate placeholder="消费开始时间"
                        @getSelectVal="getSelectVal"
                        paramsName="costStartTime"></searchDate>
            <searchDate placeholder="消费结束时间"
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
        <el-table-column label="消费时间"
                         prop='transactionTime'>
        </el-table-column>
        <el-table-column prop="transactionNumber"
                         label="交易单号">
        </el-table-column>
        <el-table-column prop="transactionAmount"
                         label="消费金额">
        </el-table-column>
        <el-table-column prop="transactionUser"
                         label="消费人">
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
import searchInput from '@/components/common/searchInput'
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
    searchInput,
    page,
    textBtn,
    search
  },
  data () {
    return {
      detailRow: '',
      tableData: [],
      pageProp: {
        pageNo: 1,
        rows: 10,
        total: 0
      },
      searchData: {
        costStartTime: '', // 消费开始时间
        costEndTime: '', // 消费结束时间
        costUser: '', // 消费人
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
      let roles = this.dicData.userInfo.roles
      let resData
      if (roles === 3) { // 餐饮
        resData = await this.api.cost.listToEat(this.searchData)
      } else if (roles === 4) { // 超市
        resData = await this.api.cost.listToMarket(this.searchData)
      }

      let data = this.untils.filterData(resData)
      this.tableData = data.records
      this.pageProp.total = data.total
    },

    closeDeleteDialog () {
      this.$refs.deleteComp.dialogClose()
      this.$refs.deleteComp.handleClose()
    },
    deleteCompF () {
      console.log('确定删除')
      this.closeDeleteDialog()
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
