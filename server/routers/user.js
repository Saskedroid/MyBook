const Cors = require('koa-cors');

exports.login = async (ctx) => {
  await Cors();
  var username = ctx.request.body.username || '',
    password = ctx.request.body.password || '';
  if (username === '10000' && password === '123456') {
    ctx.response.body = {
      success: true,
      result: "登录成功"
    }
  } else {
    ctx.response.body = {
      success: false,
      result: {
        errorCode: "ER_01",
        errorMessage: "用户名或密码错误"
      }
    }
  }
};