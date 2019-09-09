<template>
  <div class="shop-header-content">
    <div class="header-left">
      消费管理系统
    </div>
    <div class="header-right">
      <div class="shop-admin-container">
        <div>
          管理员，您好！
        </div>
        <div class="change-pass">
          <allHeader></allHeader>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import allHeader from '@/components/common/allHeader'
export default {
  name: 'index',
  components: {
    allHeader
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

<style lang='scss' scoped>
.shop-header-content {
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  .header-left {
    font-size: 26px;
  }
}
.shop-admin-container {
  text-align: center;
  .change-pass {
    cursor: pointer;
  }
}
</style>
