const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const router = require('./server/routers/index');

const app = new Koa();

app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(8089, () => {
	console.log('Koa is listening in port 8089.');
});