const Koa = require('koa2');

const app = new Koa();

app.use(async ctx => {
  ctx.response.body = 'Hello Koa2'
});

app.listen(3001);
