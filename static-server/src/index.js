const koa = require('koa');
const path = require('path');
const getContent = require('./utils/getContent');
const mines = require('./utils/mines');

const app = new koa();

const basePath = './static';

function parseMime(url) {
  let extName = path.extname(url)
  extName = extName ? extName.slice(1) : 'unknown'
  return mines[extName]
}

app.use(async (ctx, next) => {
  const content = await getContent(basePath, ctx);
  const mine = parseMime(ctx.url);
  if (mine) {
    ctx.response.type = mine;
  }
  ctx.response.body = content;
});

app.listen(3000);
