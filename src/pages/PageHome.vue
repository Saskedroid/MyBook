<template>
  <div>
    <el-input v-model="searchWords" placeholder="请输入书名、作者、ISBN等关键词" prefix-icon="el-icon-search" @keyup.enter.native="searchAction">
      <el-button slot="append" icon="el-icon-search" @click="searchAction"></el-button>
    </el-input>
    <el-divider content-position="left">数据统计</el-divider>
    <el-row class="report">
      <el-col :span="8">
        <i class="el-icon-reading"></i>
        <span>图书总数：<span class="number">{{total}}</span> 本</span>
      </el-col>
      <el-col :span="8">
        <i class="el-icon-user"></i>
        <span>作者总数：<span class="number">{{total}}</span> 人</span>
      </el-col>
      <el-col :span="8">
        <i class="el-icon-bank-card"></i>
        <span>价格总数：<span class="number">{{total}}</span> 元</span>
      </el-col>
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
.report .number {
  font-size:28px;
}
</style>
