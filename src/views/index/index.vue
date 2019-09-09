<template>
  <!-- 三个系统的的入口 -->
  <div class="all-index-container">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'index',
  components: {
  },
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

<style lang='scss' >
.all-index-container {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}
</style>
