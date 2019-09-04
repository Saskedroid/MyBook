<template>
  <el-row>
    <el-col :span="6" :offset="2" class="logo">
      <svg-icon icon-class="book" className="icon"></svg-icon>
      <h1>图书管理系统</h1>
    </el-col>
    <el-col :span="2" :offset="12" class="button" v-show="showClose">
      <el-button type="text" @click="close">
        <i class="el-icon-error"></i>&nbsp;关闭
      </el-button>
    </el-col>
  </el-row>
</template>

<script>
export default {
  methods: {
    close() {
      // window.opener = null;
      // window.open('', '_self');
      // window.close();
      self.close();
    }
  },
  props: ["showClose"]
};
</script>

<style scoped>
  .icon {
    width: 2em !important;
    height: 2em !important;
  }
.el-row {
  background-color: #545c64;
  color: #fff;
}
.el-row .logo {
  display: flex;
  align-items: center;
  padding: 8px;
}
.el-row .logo h1 {
  font-size: 18px;
  font-weight: bold;
  margin-left: 15px;
}
.el-row .button {
  text-align: right;
  line-height: 58px;
}
.el-row .button .el-button {
  color: #fff;
}
.el-row .button .el-button :hover {
  color: #f5f5f5;
}
</style>
