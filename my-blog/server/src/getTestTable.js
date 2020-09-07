const Koa = require('koa2');
const mySQL = require('../mysql/test');
const { port } = require('../config');

const app = new Koa();

app.use(async ctx => {
  let data = await mySQL.query();

  ctx.body = {
    'errorCode': 200,
    'data': data
  };
});

app.listen(port);
