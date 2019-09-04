<template>
  <div class="screen">
    <el-row>
      <el-col :xs="11" :sm="14" :md="16" :lg="16" :xl="17"></el-col>
      <el-col :xs="10" :sm="8" :md="6" :lg="6" :xl="5">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>欢迎登录</span>
          </div>
          <el-form :model="form" :rules="rules" ref="form">
            <el-form-item prop="username">
              <el-input
								v-model="form.username"
                placeholder="请输入用户名"
                prefix-icon="el-icon-user"
                clearable
                maxlength="20"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
								v-model="form.password"
                placeholder="请输入密码"
                prefix-icon="el-icon-lock"
                show-password
                maxlength="20"
                @keyup.enter.native="login"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" :loading="logging" @click="login">登录</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      logging: false,
      form: {
        username: "",
        password: ""
			},
			rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
		login() {
      this.$refs.form.validate(valid => {
        if (!valid) {
          return false;
        }
        this.logging = true;
        this.$fetch.apiLogin(
          this.form.username,
          this.form.password,
          (success, rsp) => {
            this.logging = false;
            if (success) {
              this.$message({
                showClose: true,
                message: rsp,
                type: "success"
              });
              this.$router.push("/home");
            } else{
              this.$message({
                message: rsp,
                type: "error"
              });
            }
          });
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.screen {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url("/static/images/loginbody_bg.jpg");
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
}
.el-row {
  display: flex;
  align-items: center;
  height: 100%;
}
.el-button {
  width: 100%;
}
</style>
