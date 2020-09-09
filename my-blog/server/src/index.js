const Koa = require('koa2');
const { port } = require('../config');
const router = require('./routes');

const app = new Koa();
app.silent = true;

app.use(router.routes()).use(router.allowedMethods());

app.use(async (ctx) => {
  const status = ctx.status;
  let text = '出错了';
  if (status === 404) {
    text = '请求地址没找到，请确认地址是否正确。';
  }
  ctx.set('Content-Type', 'text/html; charset=utf8');
  ctx.body = `<div style='color: red; font-size: 14px'>${text}</div>`;
});


app.listen(port);
