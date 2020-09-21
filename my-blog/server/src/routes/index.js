const Router = require('koa-router');
const fs = require('fs');
const { resolve } = require('path');

const router = new Router();

const dirs = fs.readdirSync(__dirname, {withFileTypes: true}).filter(file => file.isDirectory());
dirs.forEach(dir => {
  const dirRouter = require(resolve(__dirname, './', dir.name));
  router.use(dirRouter.routes()).use(dirRouter.allowedMethods());
});

// 挂载路由
// router.use(userRouter.routes())
//       .use(userRouter.allowedMethods());


module.exports = router;
