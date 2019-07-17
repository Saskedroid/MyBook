<template>
  <el-dialog
    title="书籍详情"
    width="70%"
    :visible.sync="openDialog"
    :close-on-click-modal="false"
    @open="open"
    @close="dismiss"
    class="expert-dialog-inner">
    <p>{{JSON.stringify(bookData)}}</p>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dismiss">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      bookId: this.bookId,
      openDialog: this.showDialog,
      bookData: {}
    }
  },
  methods: {
    open() {
      if (!!this.bookId) {
        this.$fetch.apiGetBookDetail(this.bookId, (success, rsp) => {
          if (success) {
            this.bookData = rsp;
          } else {
            this.$message({
              message: rsp,
              type: "error"
            });
          }
        });
      }
    },
    dismiss() {
      this.$emit("dismissDialog");
      this.bookData = {};
    }
  },
  props: ["showDialog", "id"],
  watch: {
    showDialog(val) {
      this.openDialog = val
    },
    id(val) {
      this.bookId = val;
    }
  }
}
</script>

<style scoped>
</style>
