<template>
  <el-form-item>
    <el-input v-model="inputVal"
              @change="changeVal"
              :placeholder="placeholder"></el-input>
  </el-form-item>
</template>

<script>
export default {
  name: 'formInput',
  components: {},
  data () {
    return {
      inputVal: ''
    }
  },
  props: {
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
      this.$emit('getSelectVal', obj)
    }
  }

}
</script>

<style lang='scss'>
</style>
