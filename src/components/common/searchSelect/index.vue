<template>
  <el-form-item>
    <el-select v-model="selectVal"
               v-if="filterable"
               filterable
               @change="selectChange"
               clearable
               :placeholder="placeholder">
      <el-option v-for="(item,index) in dataArr"
                 :key="index"
                 :label="item.name"
                 :value="item.id">
      </el-option>
    </el-select>
    <el-select v-model="selectVal"
               v-else
               @change="selectChange"
               clearable
               :placeholder="placeholder">
      <el-option v-for="(item,index) in dataArr"
                 :key="index"
                 :label="item.name"
                 :value="item.id">
      </el-option>
    </el-select>
  </el-form-item>
</template>

<script>
export default {
  name: 'formSelect',
  components: {},
  data () {
    return {
      selectVal: this.deFaultVal,
      selectArr: this.dataArr
    }
  },
  props: {
    filterable: {
      type: String
    },
    paramsName: {
      type: String
    },
    clearable: {
      type: Boolean,
      default: true
    },
    dataArr: {
      type: Array
    },
    deFaultVal: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String
    }
  },
  computed: {},
  watch: {},
  mounted () {
    console.log('selectArr', this.selectArr)
    console.log('deFaultVal 111', this.deFaultVal)
  },
  methods: {
    selectChange (data) {
      let obj = {
        paramsName: this.paramsName,
        data: data
      }
      this.$emit('getSelectVal', obj)
    }
  }

}
</script>

<style lang='scss'>
</style>
