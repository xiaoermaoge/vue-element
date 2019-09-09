<template>
  <div class="text-input-container">
    <span style='line-height:33px;width:150px;text-align:right'>
      <span style="color: red"
            v-if='required'>*</span>
      {{text}}
    </span>
    <el-form-item :prop='validateText'>
      <!-- <div style="display:flex;align-items:center;justify-content: center"> -->
      <div class=''>
        <el-input v-model.trim="getValinputVal"
                  :type='inputType'
                  :readonly='readonly'
                  @change="changeVal"
                  :placeholder="placeholder"></el-input>

      </div>
    </el-form-item>
  </div>

</template>

<script>
export default {
  name: 'formInput',
  components: {},
  data () {
    return {
      getValinputVal: this.inputVal
    }
  },
  props: {
    readonly: {
      type: Boolean,
      default: Boolean(false)
    },
    inputType: {
      type: String,
      default: 'text'
    },
    quaType: {
      type: String,
      default: 'text'
    },
    validateText: {
      type: String,
      default: ''
    },
    inputVal: {
      type: String
    },
    required: {
      type: Boolean,
      default: Boolean(false)
    },
    text: {
      type: String,
      default: ''
    },
    paramsName: {
      type: String
    },
    placeholder: {
      type: String
    }
  },
  computed: {},
  watch: {},
  mounted () {
  },
  methods: {
    changeVal (data) {
      let obj = {
        paramsName: this.paramsName,
        data: data
      }
      this.$emit('getFormData', obj)
    }
  }

}
</script>

<style lang='scss' scope>
.text-input-container {
  display: flex;
  .el-input {
    flex: 1;
    width: 200px;
  }
}
</style>
