<template>
    <div class="com-aside-container">
      <el-menu :default-active="$route.path"
               class="el-menu-vertical-demo"
               router
               unique-opened>
        <el-submenu v-for="(item) in menuData"
                    :index="item.name"
                    :key="item.name">
          <template slot="title">
            <img :src="item.img"
                 alt=""/>
            <span style="font-size: 12px;">{{item.name}}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item v-for="subItem in item.subnav"
                          :key="subItem.name"
                          :index="subItem.link"
                          style="font-size: 12px;"
                          v-text="subItem.name"></el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </div>
</template>

<script>
export default {
  name: 'index',
  components: {},
  data () {
    return {

    }
  },
  props: {
    menuData: {
      type: Array
    }
  },
  computed: {},
  watch: {},
  mounted () {
  },
  methods: {}

}
</script>

<style lang='scss'>
.com-aside-container{

}
</style>
