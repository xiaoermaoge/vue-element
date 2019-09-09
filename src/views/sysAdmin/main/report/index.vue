<template>
  <div class="">
    <div>
      <strong>报表统计</strong>
    </div>
    <search>
      <div slot>
        <div class="glo-reset-form">
          <el-form inline
                   size="small">
            <searchDate placeholder="开始时间"
                        @getSelectVal="getSelectVal"
                        paramsName="startTime">
            </searchDate>
            <searchDate placeholder="结束时间"
                        @getSelectVal="getSelectVal"
                        paramsName="endTime">
            </searchDate>
            <searchSelect placeholder="导出类型"
                          :dataArr="dicData.sysAdmin.report.fieldName"
                          @getSelectVal="getSelectVal"
                          paramsName="fieldName">
            </searchSelect>
            <el-form-item>
              <priBtn text="导出"
                      @click.native='excelReport'></priBtn>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </search>
  </div>
</template>

<script>
import search from '@/components/common/search'
import searchSelect from '@/components/common/searchSelect'
import searchDate from '@/components/common/searchDate'
import selector from '@/components/common/form/selector'
export default {
  name: '',
  components: {
    search,
    searchSelect,
    selector,
    searchDate
  },
  data () {
    return {
      searchData: {
        endTime: '',
        startTime: '',
        fieldName: ''
      }
    }
  },
  methods: {
    getSelectVal (data) {
      this.searchData = this.untils.getComponentsVal(this.searchData, data)
    },
    async excelReport () {
      let state = true
      let data = this.searchData
      for (let i in data) {
        // console.log('i', i)
        // console.log('this.searchData', data[i])
        if (!data[i]) {
          if (state) {
            this.untils.message('请选择具体导出的时间段和导出的类型', 'warning')
          }
          state = false
        }
      }
      if (state) {
        let textName = ''
        let fielNameData = this.dicData.sysAdmin.report.fieldName
        fielNameData.forEach((item) => {
          if (item.id === this.searchData.fieldName) {
            textName = item.name
          }
        })
        this.untils.downExcel({
          url: '/admin/getReportForm',
          params: this.searchData,
          text: textName
        })
        // let resData = await this.api.common.getReportForm(this.searchData)
        // this.untils.changeMessage(resData.code, resData.message)
        // if (resData) {
        //   this.untils.downExcel({
        //     url: '/admin/getReportForm',
        //     params: this.searchData,
        //     text: this.searchData.fieldName
        //   })
        // }
      }
    }
  }
}
</script>

<style lang="" scoped>
. {
}
</style>
