<template>
  <el-form-item>
    <!--  value-format="yyyy-MM-dd HH:mm:SS"  -->
    <el-date-picker v-if="type==='daterange'"
                    @change="getDate"
                    :style='styleName'
                    v-model="date"
                    align="right"
                    unlink-panels
                    range-separator="至"
                    :start-placeholder="startPlace"
                    :end-placeholder="endPlace"
                    :picker-options="pickerOptions"
                    :type='type'
                    value-format="yyyy-MM-dd"
                    :placeholder="placeholder">
    </el-date-picker>
    <el-date-picker v-else
                    @change="getDate"
                    v-model="date"
                    align="right"
                    :type='type'
                    value-format="yyyy-MM-dd"
                    :placeholder="placeholder"
                    :picker-options="pickerOptions1">
    </el-date-picker>

  </el-form-item>
</template>

<script>
export default {
  name: 'formDate',
  components: {},
  data () {
    return {
      date: '',
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      pickerOptions1: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [{
          text: '今天',
          onClick (picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      }
    }
  },
  props: {
    styleName: {
      type: String,
      default: ''
    },
    startPlace: {
      type: String,
      default: '开始时间'
    },
    endPlace: {
      type: String,
      default: '结束时间'
    },
    type: {
      type: String,
      default: 'date'
    },
    paramsName: {
      type: String
    },
    placeholder: {
      type: String,
      default: '请选择时间'
    }
  },
  computed: {},
  watch: {},
  mounted () {
  },
  methods: {
    getDate (data) {
      console.log('data', data)
      let obj = {
        paramsName: this.paramsName,
        data: data || ''
      }
      this.$emit('getSelectVal', obj)
    }
  }

}
</script>

<style lang='scss'>
.el-range-editor--small .el-range__close-icon,
.el-range-editor--small .el-range__icon {
  line-height: 30px;
}
.el-range-editor--small .el-range-separator {
  font-size: 12px;
  line-height: 30px;
}
</style>
