<template>
  <div class="page-content"
       v-if="pageProp">
    <el-pagination v-if="pageProp.size"
                   background
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="pageProp.pageNo"
                   :page-size="pageProp.rows"
                   :total="pageProp.total"
                   layout="total, sizes, prev, pager, next, jumper"
                   :page-sizes="pageProp.size">
    </el-pagination>
    <el-pagination v-else
                   background
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="pageProp.pageNo"
                   :page-size="pageProp.rows"
                   :total="pageProp.total"
                   layout="total, prev, pager, next, jumper">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'page',
  props: {
    pageProp: {
      type: Object
    }
  },
  computed: {

  },
  watch: {

  },
  mounted () {
    this.getData()
  },
  data () {
    return {
      getProp: this.pageProp,
      searchData: {
      }
    }
  },
  methods: {
    //  每页下拉显示数据
    handleSizeChange: function (rows) {
      console.log('this.getProp', this.getProp)
      this.getProp.rows = rows
      this.$emit('getPageData', this.getProp)
    },
    // 点击第几页
    handleCurrentChange: function (pageNo) {
      console.log('this.getProp', this.getProp)
      this.getProp.pageNo = pageNo
      this.$emit('getPageData', this.getProp)
    },
    getData () {
      console.log('this.pageProp', this.pageProp)
    }

  }
}
</script>

<style lang="scss">
</style>
