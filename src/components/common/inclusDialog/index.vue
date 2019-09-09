<template>
  <div v-if="destroy">
    <el-dialog :title="title"
               :visible.sync="inclusLog"
               :close-on-click-modal="closeOnClickModal"
               :close-on-press-escape="false"
               :lock-scroll="true"
               :show-close="showClose"
               append-to-body
               :width="width"
               :before-close="handleClose"
               @open="dialogOpen()"
               @close="dialogClose()"
               class="reset-dialog">
      <div class="">
        <slot name="dialog-content"></slot>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'inclusDialog',
  components: {
  },
  props: {
    isDestroy: {
      type: Boolean,
      default: Boolean(false)
    },
    closeOnClickModal: {
      type: Boolean,
      default: Boolean(false)
    },
    showClose: {
      type: Boolean,
      default: Boolean(false)
    },
    width: {
      type: String,
      default: '900px'
    },
    title: {
      type: String
    },
    dialog: {
      type: Boolean
    }
  },
  watch: {
    isDestroy (newVal, oldVal) {
    },
    inclusLog (newVal, oldVal) {
    },
    dialog (newVal, oldVal) {

    }
  },
  data () {
    return {
      destroy: this.isDestroy,
      inclusLog: false,
      componentDialog: this.dialog
    }
  },
  mounted () {
    // this.destroyF()
  },
  methods: {
    getChildData (data) {

    },
    dialogClose () {
      this.inclusLog = false
    },
    dialogOpen () {
      this.destroy = true
      this.inclusLog = true
    },
    handleClose (done) {
      // done()
      this.destroy = false
      console.log('关闭按钮')
    }
  }
}
</script>

<style>
</style>
