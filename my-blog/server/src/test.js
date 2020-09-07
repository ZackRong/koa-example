const Koa = require('koa2');
// const bodyParser = require('koa-bodyparser');
const render = require('koa-ejs');
const path = require('path');
const Router = require('koa-router');

const router = new Router();
const app = new Koa();

// app.use(bodyParser());

// 初始化ejs，设置后缀为ejs，文件目录为`views`
render(app, {
  root: path.join(__dirname, '../views'),
  layout: false,
  viewExt: 'ejs',
  cache: false,
  debug: false
});

router.get('/', async (ctx, next) => {
  await ctx.render('index',{
    title: '我是首页',
    body: '我是内容啊'
  });
});
app.use(router.routes());
app.use(router.allowedMethods());

// app.on('error', (err, ctx) => {
//   if (ctx) {
//     ctx.render('error', {
//       body: '出错了'
//     });
//   }
// });
// app.use(async ctx => {
//   await ctx.render('index', {
//     title: '我是标题',
//     body: '我是内容body'
//   })
//   // ctx.response.body = 'Hello Koa2'
// });

app.listen(3001);
