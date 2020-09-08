const Router = require('koa-router');
const getSubRoute = require('../../../utils/getSubRoute');

const router = new Router();

// 子路由
const routes = getSubRoute(__dirname);

router.prefix('/user');

routes.forEach(route => {
  router.get(`/${route.name}`, route.content);
});
// router.get('/login', login);

// router.get('/logout', logout);


module.exports = router;
