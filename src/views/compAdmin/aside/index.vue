<template>
  <div>
    <comAside :menuData="menuData"></comAside>
  </div>
</template>

<script>
import comAside from '@/components/common/comAside'
export default {
  name: 'index',
  components: {
    comAside
  },
  data () {
    return {
      menuData: [
        {
          name: '审批中心',
          subnav: [
            {
              name: '审批列表',
              link: '/compAdmin/approve'
            }
          ]
        },
        {
          name: '人员管理',
          subnav: [
            {
              name: '人员列表',
              link: '/compAdmin/user'
            }
          ]
        },
        {
          name: '企业中心',
          subnav: [
            {
              name: '企业信息',
              link: '/compAdmin/compCentre'
            }
          ]
        },
        {
          name: '交易记录',
          subnav: [
            {
              name: '交易列表',
              link: '/compAdmin/topUp'
            }
          ]
        }
      ]
    }
  },
  props: {},
  computed: {},
  watch: {},
  mounted () {
  },
  methods: {}

}
</script>

<style lang='scss'>
.el-menu {
  background-color: #eef1f6;
}
.el-submenu .el-menu {
  background-color: #e4e8f1;
}
.el-menu-item-group > div:nth-child(1) {
  padding: 0;
}
</style>
