<template>
  <el-dialog
    title="书籍详情"
    width="70%"
    :visible.sync="openDialog"
    :close-on-click-modal="false"
    @open="open"
    @close="dismiss"
    class="expert-dialog-inner">
    <h2>{{bookData.title}}</h2>
    <el-row>
      <el-col :span="6">
        <el-image :src="bookData.image" fit="contain" style="width: 140px;height: 200px;">
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline"></i>
          </div>
        </el-image>
      </el-col>
      <el-col :span="12" class="info">
        <div v-if="!!bookData.origin_title">原标题：{{bookData.origin_title}}</div>
        <div>作者：<span v-for="item in bookData.author" :key="item">{{item}}&nbsp;&nbsp;</span></div>
        <div v-if="bookData.translator.length>0">译者：<span v-for="item in bookData.translator" :key="item">{{item}}&nbsp;&nbsp;</span></div>
        <div>出版社：{{bookData.publisher}}</div>
        <div>出版年：{{bookData.pubdate}}</div>
        <div>页数：{{bookData.pages}}</div>
        <div>装帧：{{bookData.binding}}</div>
        <div>定价：{{bookData.price}}元</div>
        <div v-if="!!bookData.series.title">丛书：{{bookData.series.title}}</div>
        <div>ISBN：{{bookData.isbn}}</div>
      </el-col>
    </el-row>
    <el-row>
      <h4>内容简介</h4>
      <p v-if="!!bookData.summary">{{bookData.summary}}</p>
      <p v-else>暂无简介~</p>
    </el-row>
    <el-row>
      <h4>标签</h4>
      <p>
        <el-tag v-if="!!bookData.category" size="medium" type="info" effect="plain">{{bookData.category}}</el-tag>
        <el-tag v-for="item in bookData.tags" :key="item.id" size="medium" effect="plain">{{item.name}}</el-tag>
      </p>
    </el-row>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dismiss">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      bookId: this.bookId,
      openDialog: this.showDialog,
      bookData: {
        "author":[],
        "translator":[],
        "tags":[],
        "isbn":"",
        "title":"",
        "origin_title":"",
        "image":"",
        "category":"",
        "publisher":"",
        "pubdate":"",
        "binding":"",
        "price":"",
        "series":{"id":"","title":""},
        "pages":"",
        "memo":"",
        "summary":""
       }
    }
  },
  methods: {
    open() {
      if (!!this.bookId) {
        this.$fetch.apiGetBookDetail(this.bookId, (success, rsp) => {
          if (success) {
            this.bookData = rsp;
          } else {
            this.$message({
              message: rsp,
              type: "error"
            });
          }
        });
      }
    },
    dismiss() {
      this.$emit("dismissDialog");
      this.bookData = {
        "author":[],
        "translator":[],
        "tags":[],
        "isbn":"",
        "title":"",
        "origin_title":"",
        "image":"",
        "category":"",
        "publisher":"",
        "pubdate":"",
        "binding":"",
        "price":"",
        "series":{"id":"","title":""},
        "pages":"",
        "memo":"",
        "summary":""
       };
    }
  },
  props: ["showDialog", "id"],
  watch: {
    showDialog(val) {
      this.openDialog = val
    },
    id(val) {
      this.bookId = val;
    }
  }
}
</script>

<style scoped>
.info div {
  margin-bottom: 5px;
}
.el-tag {
  margin-right: 5px;
}
</style>
