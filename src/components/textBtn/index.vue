<template>
  <el-button type="text">{{text}}</el-button>
</template>

<script>
export default {
  name: 'index',
  components: {},
  data () {
    return {}
  },
  props: {
    text: {
      type: String,
      default: ''
    }
  },
  computed: {},
  watch: {},
  mounted () {
  },
  methods: {}

}
</script>

<style lang='scss' scope>
</style>
