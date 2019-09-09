<template>
  <div class="comp-detail-container">
    <el-row>
      <el-col :span='12'>
        企业名称： {{detail.entName}}
      </el-col>
      <el-col :span='12'>
        当前余额： {{detail.entBalance || 0.00}}元
      </el-col>
      <el-col :span='12'>
        企业法人： {{detail.entLegal}}
      </el-col>
      <el-col :span='12'>
        统一社会信用代码： {{detail.entSocialCode}}
      </el-col>
      <el-col :span='24'>
        营业执照：
        <div style='width: 100%; height: 300px;display:flex;justify-content: center;'>
          <img :src="imgUrl"
               style='max-width: 100%;max-height: 100%;'
               alt="">
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    row: {
      type: Object
    }
  },
  data () {
    return {
      detail: this.row,
      imgUrl: ''
    }
  },
  mounted () {
    this.getDetailImg()
  },
  methods: {
    async getDetailImg () {
      let imgBase = await this.untils.getImg(this.row.entLicenseId)
      this.imgUrl = 'data:image/jpeg;base64,' + imgBase
    }
  }
}
</script>

<style lang="scss" scoped>
.comp-detail-container {
  .el-col-12 {
    padding: 10px 0;
  }
}
</style>
