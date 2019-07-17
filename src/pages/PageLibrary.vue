<template>
  <div>
    <el-row>
      <el-button type="success" icon="el-icon-plus" size="small" @click="onAdd">新增图书</el-button>
    </el-row>

    <CardList
      v-loading="loading"
      :tableData="listData"
      @currRowAction="currRowAction"
    />

    <el-pagination
      v-show="listData.length>0"
      layout="total, sizes, prev, pager, next, jumper, ->"
      background
      :pager-count="5"
      :total="totalRecord"
      :current-page="currentPage"
      :page-sizes="[10, 25, 50, 100]"
      :page-size="pageSize"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />

    <DialogDetail
      :showDialog="dialogDetail"
      :id="bookId"
      @dismissDialog="dismissDialog"/>
  </div>
</template>

<script>
import CardList from "@/components/CardList";
import DialogDetail from "@/components/DialogDetail"

export default {
  data() {
    return {
      loading: false,
      dialogDetail: false,
      listData: [],
      bookId: "",
      totalRecord: 0,
      currentPage: 1,
      pageSize: 10
    };
  },
  components: {
    CardList,
    DialogDetail
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      this.loading = true;
      if (this.listData.length == 0) {
        this.$fetch.apiGetBooksList(
          this.currentPage,
          this.pageSize,
          (success, rsp) => {
            this.loading = false;
            if (success) {
              this.listData = rsp.list;
              this.totalRecord = rsp.totalRecord;
            } else {
              this.$message({
                message: rsp,
                type: "error"
              });
            }
          }
        );
      }
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList();
    },
    currRowAction(param) {
      switch (param[1]) {
        case "view":
          this.onView(param[0]);
          break;
        case "edit":
          this.onEdit(param[0]);
          break;
        case "delete":
          this.onDelete(param[0]);
          break;
      }
    },
    onView(id) {
      this.bookId = id;
      this.dialogDetail = true;
    },
    onEdit(id) {
      let bookData = this.listData.find(item => {
        return item._id === id;
      });
      this.$router.push({ name: "PageAdd", query: { id: id, m: "edit" } });
    },
    onDelete(id) {
      this.$confirm("您确认要删除该图书信息？", "提示", {
        type: "warning"
      })
      .then(() => {
        //
      })
      .catch(() => {});
    },
    onAdd() {
      this.$router.push({ name: "PageAdd", query: { id: "0", m: "add" } });
    },
    dismissDialog() {
      this.bookId = "";
      this.dialogDetail = false;
    }
  }
};
</script>

<style scoped>
</style>
