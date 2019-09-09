<template>
  <div class="search-component">
    <el-row>
      <el-col :span="24"><div class="grid-content bg-purple-dark">
        <slot></slot>
      </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'index',
  components: {},
  data () {
    return {}
  },
  props: {},
  computed: {},
  watch: {},
  mounted () {
  },
  methods: {}

}
</script>

<style lang='scss' scoped>
  .search-component{
    padding: 10px 0;
  }
  .grid-content {
    padding: 0 10px;
    border-radius: 4px;
    min-height: 36px;
  }
  .bg-purple-dark {
    background: #F2F2F2;
  }
</style>
