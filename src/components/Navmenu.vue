<template>
  <el-row>
    <el-col :span="8" :offset="2" class="logo">
      <svg-icon icon-class="book" className="icon"></svg-icon>
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
      <el-dropdown trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">
          菜单<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-warning-outline" command="a">修改资料</el-dropdown-item>
          <el-dropdown-item icon="el-icon-circle-check" command="b">修改密码</el-dropdown-item>
          <el-dropdown-item icon="el-icon-circle-close" command="c" divided>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      
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
    handleCommand(command) {
      switch (command) {
        case 'c':
          this.logout();
          break;
      }
    },
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
.el-dropdown-link {
  cursor: pointer;
  color: whitesmoke;
}
</style>
