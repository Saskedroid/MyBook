<template>
  <el-container>
    <el-header height="60px">
      <Navbar :showClose="true"/>
    </el-header>
    <el-main>
      <el-row>
        <el-col :span="20" :offset="2">
          <el-card :body-style="{ padding: '20px', minHeight: '530px' }">
            <el-row>
              <el-col :span="12">
                <span>书名：</span>
                {{form.title}}
              </el-col>
            </el-row>
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
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default {
  data() {
    return {
      bookId: "",
      form: {
        title: "钢铁是怎样炼成的"
      }
    };
  },
  components: {
    Navbar,
    Footer
  },
  mounted() {
    this.bookId = this.$route.query.id;
  }
};
</script>

<style scoped>
.el-container {
  background: #f2f2f2;
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
