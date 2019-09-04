<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane name="first">
      <span slot="label"><i class="el-icon-price-tag"></i> 标签管理</span>
      标签管理
    </el-tab-pane>
    <el-tab-pane name="second">
      <span slot="label"><i class="el-icon-notebook-2"></i> 丛书管理</span>
      丛书管理
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data() {
    return {
      activeName: "first"
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  },
};
</script>

<style scoped>
</style>
