<template>
  <div>
    <el-input v-model="searchWords" placeholder="请输入书名、作者、ISBN等关键词" @keyup.enter.native="searchAction">
      <el-button slot="append" icon="el-icon-search" @click="searchAction"></el-button>
    </el-input>
    <el-divider content-position="left">数据统计</el-divider>
    <el-row class="report">
      <i class="el-icon-reading"></i>
      <span>图书总数：<span style="font-size:28px;">{{total}}</span> 本</span>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchWords: "",
      total: ""
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      this.$fetch.apiReportTotal((success, rsp) => {
        if (success) {
          this.total = rsp.value;
        } else {
          this.$message({
            showClose: true,
            message: rsp,
            type: "error"
          });
        }
      });
    },
    searchAction() {
      this.searchWords = this.searchWords.trim();
      if (this.searchWords == "") {
        return;
      }
    }
  }
};
</script>

<style scoped>
.report {
  margin-left: 20px;
}
.report i {
  float: left;
  font-size: 90px;
  color: #67c23a;
  margin-right: 10px;
}
.report span {
  line-height: 300%;
}
</style>
