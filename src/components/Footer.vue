<template>
  <div class="footer">
    <el-row>
      <el-col :span="20" :offset="2">
        <span>友情链接：</span>
        <el-link v-for="item in links" :key="item.text" type="info" :underline="false" :href="item.url" target="_blank">{{item.text}}</el-link>
        <el-divider><i class="el-icon-eleme"></i></el-divider>
      </el-col>
    </el-row>
    <el-row class="copyright">
      <p>Powered by Node.js</p>
      <p>Copyright © 2015-{{currentYear}} CCP. All rights reserved.</p>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      currentYear: this.$util.getDateFormat(new Date(), 'yyyy'),
      links: [
        {
          "url": "https://cn.vuejs.org/v2/guide/",
          "text": "Vue"
        },
        {
          "url": "https://element.eleme.cn/2.9/#/zh-CN/component/installation",
          "text": "Element"
        },
        {
          "url": "http://www.axios-js.com/zh-cn/docs/",
          "text": "axios"
        },
        {
          "url": "https://koa.bootcss.com/",
          "text": "Koa"
        },
        {
          "url": "http://mongoosejs.net/docs/guide.html",
          "text": "mongoose"
        }
      ]
    }
  }
};
</script>

<style scoped land="less">
.footer {
  background-color: #545c64;
  color: #fff;
  font-size: 14px;
  padding-top: 20px;
}
.el-link {
  color: #fff;
  margin-right: 10px;
}
.el-divider__text {
  background: #545c64;
  color: #fff;
  font-size: 20px;
}
.copyright {
  text-align: center;
}
</style>
