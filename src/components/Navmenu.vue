<template>
  <el-row>
    <el-col :span="8" :offset="2" class="logo">
      <img src="/static/images/logo.png">
      <h1>图书管理系统</h1>
    </el-col>
    <el-col :span="10">
      <el-menu class="el-menu-demo" mode="horizontal" :default-active="$route.name" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
        <router-link class="menu-link" replace :to="{ name: page.PageHome }">
          <el-menu-item :index="page.PageHome">首页</el-menu-item>
        </router-link>
        <router-link class="menu-link" replace :to="{ name: page.PageLibrary }">
          <el-menu-item :index="page.PageLibrary">书库</el-menu-item>
        </router-link>
        <router-link class="menu-link" replace :to="{ name: page.PageManager }">
          <el-menu-item :index="page.PageManager">信息维护</el-menu-item>
        </router-link>
      </el-menu>
    </el-col>
    <el-col :span="2" class="button">
      <el-button type="text" @click="logout">
        <i class="el-icon-error"></i>&nbsp;退出
      </el-button>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      page: {
        PageHome: "PageHome",
        PageLibrary: "PageLibrary",
        PageManager: "PageManager"
      }
    };
  },
  methods: {
    logout() {
      this.$confirm("是否退回登录页面？", "提示", {
        type: "warning"
      })
      .then(() => {
        this.$router.replace({ name: "Login" });
      })
      .catch(() => {});
    }
  }
};
</script>

<style scoped>
.el-row {
  background-color: #545c64;
  color: #fff;
}
.el-row .logo {
  display: flex;
  align-items: center;
  padding: 8px;
}
.el-row .logo img {
  height: 42px;
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
.menu-link {
  float: left;
}
.menu-link > .el-menu-item {
  float: left;
  height: 60px;
  line-height: 60px;
  margin: 0;
  border-bottom: 2px solid transparent;
  color: #909399;
}
</style>
