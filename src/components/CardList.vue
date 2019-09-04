<template>
  <el-table :data="tableData" stripe>
    <el-table-column label="封面" width="90">
      <template slot-scope="scope">
        <el-image :src="scope.row.image" fit="contain">
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline"></i>
          </div>
        </el-image>
      </template>
    </el-table-column>
    <el-table-column prop="title" label="书名" sortable>
      <template slot-scope="scope">
        <h2 @click="handleClick(scope.row._id, 'view')">{{scope.row.title}}</h2>
      </template>
    </el-table-column>
    <el-table-column prop="author" label="作者">
      <template slot-scope="scope">
        <span v-for="(item, index) in scope.row.author" :key="item" size="medium">{{item}}<span v-show="index<scope.row.author.length-1">、</span></span>
      </template>
    </el-table-column>
    <el-table-column prop="isbn" label="书号"></el-table-column>
    <el-table-column prop="tags" label="标签" :filters="tagList" :filter-method="filterTag">
      <template slot-scope="scope">
        <el-tag v-for="item in scope.row.tags" :key="item.id" size="medium" type="info" effect="plain">{{item.name}}</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="publisher" label="出版社" sortable>
      <template slot-scope="scope">
        <p>{{scope.row.publisher}}</p>
        <p>{{scope.row.pubdate}}</p>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="100">
      <template slot-scope="scope">
        <el-button type="text" size="small" @click="handleClick(scope.row._id, 'edit')">编辑</el-button>
        <el-button type="text" size="small" @click="handleClick(scope.row._id, 'delete')">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

  <script>
export default {
  data() {
    return {
      tagList: []
    };
  },
  mounted() {
    this.getTagsList();
  },
  methods: {
    getTagsList() {
      this.$fetch.apiGetTagsList((success, rsp) => {
        if (success) {
          this.tagList = rsp;
        } else {
          this.$message({
            message: rsp,
            type: "error"
          });
        }
      });
    },
    handleClick(id, action) {
      this.$emit("currRowAction", [id, action]);
    },
    filterTag(value, row, column) {
      for (var i = 0; i < row.tags.length; i++) {
        if (row.tags[i].id == value) {
          return true;
        }
      }
      return false;
    }
  },
  props: ["tableData"]
};
</script>

<style scoped>
.el-table {
  width: 100%;
  margin-bottom: 15px;
}
.el-table h2 {
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
}
.el-table .el-tag {
  margin-right: 5px;
}
.el-image {
  width: 70px;
  height: 100px;
  text-align: center;
}
</style>
