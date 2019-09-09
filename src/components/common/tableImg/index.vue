<template>
  <div class="table-img-container">
    <div @click='showBigImg'
         class="img-content"
         v-if="imgId !== -1">
      <!-- <img :src="defaultImg"
           alt=""> -->
      查看图片
    </div>
    <div v-else>
      <span>暂无图片</span>
    </div>

    <inclusDialog title="图片详情"
                  width="800px"
                  ref="imgDialog"
                  :closeOnClickModal="Boolean(true)"
                  :showClose="Boolean(true)">
      <div slot='dialog-content'
           class="dialog-content">
        <img :src="defaultImg"
             alt="">
      </div>
    </inclusDialog>
  </div>
</template>

<script>
import inclusDialog from '@/components/common/inclusDialog'
export default {
  name: '',
  components: {
    inclusDialog
  },
  props: {
    imgId: {
      type: Number,
      default: -1
    }
  },
  data () {
    return {
      defaultImg: ''
    }
  },
  mounted () {
    console.log('imgId', this.imgId)
  },
  methods: {
    showBigImg () {
      this.$refs.imgDialog.dialogOpen()
      this.getImg()
    },
    async getImg () {
      if (this.imgId !== -1) {
        let resData = await this.api.attach.download({ id: this.imgId })
        console.log('resData', resData)
        if (resData.code === 200) {
          this.defaultImg = 'data:image/jpeg;base64,' + resData.data
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.table-img-container {
  margin: 0 auto;
  width: 80px;
  height: 30px;
  text-align: center;
  .img-content {
    cursor: pointer;
    height: 100%;
    width: 100%;
  }
  img {
    /*max-width: 100%;*/
    /*max-height: 100%;*/
    width: 100%;
    height: 100%;
  }
}
.table-img-dialog {
  .el-dialog__body {
    padding: 0;
  }
}
.dialog-content {
  width: 100%;
  height: 400px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    /*max-width: 100%;*/
    max-height: 100%;
  }
}
</style>
