const Router = require('koa-router');
const userRouter = require('./user');

const router = new Router();

// 挂载路由
router.use(userRouter.routes())
      .use(userRouter.allowedMethods());


module.exports = router;
