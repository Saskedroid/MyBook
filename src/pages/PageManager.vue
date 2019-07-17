<template></template>

<script>
export default {
  mounted() {
    this.$notify.info({
      title: "提示",
      message: "功能开发中",
      position: "bottom-right"
    });
  }
};
</script>

<style scoped>
</style>
