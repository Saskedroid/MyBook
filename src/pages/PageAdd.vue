<template>
  <el-container>
    <el-header height="60px">
      <Navbar :showClose="false"/>
    </el-header>
    <el-main>
      <el-row>
        <el-col :span="20" :offset="2">
          <el-page-header @back="goBack" title="书库" content="新增图书" v-if="mode=='add'"></el-page-header>
          <el-page-header @back="goBack" title="书库" content="编辑图书" v-else-if="mode=='edit'"></el-page-header>
          <el-page-header @back="goBack" title="书库" content="查看图书" v-else></el-page-header>
          <el-card :body-style="{ padding: '20px' }">
            <el-form :model="form" ref="form" :rules="rules" label-width="70px">
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="书名：">
                    <el-input v-model="form.title"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="原作名：">
                    <el-input v-model="form.origin_title"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="ISBN：">
                    <el-input v-model="form.isbn"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="作者：">
                    <el-tooltip effect="dark" content="多个作者请用空格分隔" placement="right">
                      <el-input v-model="form.author" suffix-icon="el-icon-warning-outline"></el-input>
                    </el-tooltip>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="译者：">
                    <el-tooltip effect="dark" content="多个译者请用空格分隔" placement="right">
                      <el-input v-model="form.translator" suffix-icon="el-icon-warning-outline"></el-input>
                    </el-tooltip>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="分类：">
                    <el-input v-model="form.category"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="出版社：">
                    <el-input v-model="form.publisher"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="出版年：">
                    <el-date-picker v-model="form.pubdate" type="month" placeholder="选择日期"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="装帧：">
                    <el-radio-group v-model="form.binding">
                      <el-radio label="平装">平装</el-radio>
                      <el-radio label="精装">精装</el-radio>
                      <el-radio label="其它">其它</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="标签：">
                    <el-select v-model="form.tags" multiple filterable placeholder="请选择" @visible-change="tagSelect">
                      <el-option
                        v-for="item in tagList"
                        :key="item.value"
                        :label="item.text"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="丛书：">
                    <el-select v-model="form.series" placeholder="请选择">
                      <el-option
                        v-for="item in seriesList"
                        :key="item.id"
                        :label="item.title"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="页数：">
                    <el-input-number v-model="form.pages" :min="0" controls-position="right"></el-input-number>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="定价：">
                    <el-input v-model="form.price"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="16">
                  <el-form-item label="备注：">
                    <el-input v-model="form.memo"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="简介：">
                    <el-input v-model="form.summary" type="textarea" rows="5"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item>
                    <el-button type="primary" @click="save">保存</el-button>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
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
      id: "0",
      mode: "add",
      form: {
        title: "",
        origin_title: "",
        isbn: "",
        author: "",
        translator: "",
        publisher: "",
        pubdate: "",
        category: "",
        tags: "",
        series: "",
        binding: "",
        pages: "",
        price: "",
        memo: "",
        summary: ""
      },
      rules: {},
      tagList: [],
      seriesList: [
        {
          id: "1726",
          title: "古典名著普及文库"
        }
      ]
    };
  },
  components: {
    Navbar,
    Footer
  },
  mounted() {
    this.id = this.$route.query.id;
    this.mode = this.$route.query.m;
  },
  methods: {
    tagSelect(visible) {
      if (visible && this.tagList.length == 0) {
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
      }
    },
    save() {
      if (this.mode == "add") {
        this.$fetch.apiAddBook(
          this.form.title,
          this.form.origin_title,
          this.form.isbn,
          this.form.author,
          this.form.translator,
          this.form.publisher,
          this.form.pubdate,
          this.form.category,
          this.form.tags,
          this.form.series,
          this.form.binding,
          this.form.pages,
          this.form.price,
          this.form.memo,
          this.form.summary,
          (success, rsp) => {
            if (success) {
              this.$message({
                message: "保存成功",
                type: "success"
              });
              this.goBack();
            } else{
              this.$message({
                message: rsp,
                type: "error"
              });
            }
          });
      } else {
        
      }
    },
    goBack() {
      this.$router.back();
    }
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
.el-page-header {
  padding-bottom: 15px;
}
.el-date-editor,
.el-select,
.el-input-number {
  width: 100%;
}
.el-button {
  width: 100px;
}
</style>
