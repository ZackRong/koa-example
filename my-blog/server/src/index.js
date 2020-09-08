const Koa = require('koa2');
const { port } = require('../config');
const router = require('./routes');

const app = new Koa();

app.use(router.routes()).use(router.allowedMethods());

app.use(async (ctx) => {
  ctx.set('Content-Type', 'text/html');
  ctx.body = '<a>Hello</a>';
});

app.listen(port);
