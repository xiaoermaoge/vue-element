<template>
  <div class="select-container">
    <span v-if='text'
          style='line-height:33px;width:150px;text-align:right'>
      <span style="color: red"
            v-if='required'>*</span>
      {{text}}
    </span>
    <el-form-item :prop='validateText'>
      <el-select v-model="selectVal"
                 v-if="filterable"
                 filterable
                 @change="selectChange"
                 :clearable='clearable'
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
                 :clearable='clearable'
                 :placeholder="placeholder">
        <el-option v-for="(item,index) in dataArr"
                   :key="index"
                   :label="item.name"
                   :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>
  </div>
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
    clearable: {
      type: Boolean,
      default: Boolean(true)
    },
    validateText: {
      type: String
    },
    text: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: Boolean(false)
    },
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

<style lang='scss' scope>
.select-container {
  display: flex;
  .el-input {
    flex: 1;
    width: 200px;
  }
}
</style>
