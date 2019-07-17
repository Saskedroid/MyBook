<template>
  <el-container>
    <el-header height="60px">
      <Navmenu/>
    </el-header>
    <el-main>
      <el-row>
        <el-col :span="20" :offset="2">
          <el-card :body-style="{ padding: '20px', minHeight: '530px' }">
            <!--子路由容器-->
            <router-view/>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
    <el-footer>
      <Footer/>
    </el-footer>
  </el-container>
</template>

<script>
import Navmenu from "@/components/Navmenu";
import Footer from "@/components/Footer";

export default {
  components: {
    Navmenu,
    Footer
  }
};
</script>

<style scoped>
.el-container {
  background: #f2f2f2;
  height: 100%;
}
.el-header,
.el-aside,
.el-main,
.el-footer {
  padding: 0;
}
.el-main {
  margin-top: 15px;
  margin-bottom: 15px;
}
</style>
