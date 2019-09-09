<template>
  <div class="shop-container">
    <el-container direction="vertical" style="height: 100%">
      <el-header>
        <shopsHeader></shopsHeader>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <shopAside></shopAside>
        </el-aside>
        <el-container>
          <el-main>
            <router-view></router-view>
          </el-main>
          <!--<el-footer>-->
          <!--<comFooter></comFooter>-->
          <!--</el-footer>-->
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import shopsHeader from '@/views/shopsAdmin/header'
import shopAside from '@/views/shopsAdmin/aside'
export default {
  name: 'index',
  components: {
    shopAside,
    shopsHeader
  },
  data () {
    return {
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

<style lang='scss' scoped>
  .el-container,.shop-container{
    height: 100%;
    padding: 0;
    margin: 0;
  }
  .el-header, .el-footer {
    background-color: #20A0FF;
    color: #fff;
    /*text-align: center;*/
    /*line-height: 60px;*/
  }

  .el-aside {
    background-color: #EEF1F6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #fff;
    color: #333;
    /*text-align: center;*/
    /*padding: 0;*/
    /*line-height: 160px;*/
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
