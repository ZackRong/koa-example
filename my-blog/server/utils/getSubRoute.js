const fs = require('fs');
const { resolve } = require('path');

const getSubRoute = (dirname) => {
  // 获取当前目录所有文件夹
  const dirents = fs.readdirSync(resolve(dirname), {withFileTypes: true});
  let routes = [];
  dirents.forEach(r => {
    if (r.isDirectory()) {
      const name = r.name;
      const mainJS = resolve(dirname, './' + name, 'main.js');
      const content = require(mainJS);
      routes.push({name, content});
    }
  });
  return routes;
};

module.exports = getSubRoute;
