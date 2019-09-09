<template>
  <el-form inline
           :ref='elRef'
           :rules="formRules"
           :model="formData"
           size="small">
    <slot></slot>
  </el-form>
</template>

<script>
export default {
  name: '',
  props: {
    elRef: {
      type: String,
      default: ''
    },
    formRules: {
      type: Object
    },
    formData: {
      type: Object
    }
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="" scoped>
. {
}
</style>
