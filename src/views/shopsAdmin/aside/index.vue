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
          name: '流水明细',
          subnav: [
            {
              name: '明细列表',
              link: '/shopsAdmin/expense'
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
  .el-menu{
    background-color: #EEF1F6;
  }
  .el-submenu .el-menu{
    background-color: #e4e8f1;
  }
  .el-menu-item-group>div:nth-child(1){
    padding: 0;
  }
</style>
