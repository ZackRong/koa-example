const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const { generateModule } = require('./utils');
const rootRoute = path.join(__dirname, '../src/routes');
const homeChildRoute = path.join(__dirname, '../src/routes/Home/routes');

inquirer.prompt({
  type: 'list',
  message: '根路由还是首页下子路由？',
  choices: ['根路由', '首页下子路由'],
  name: 'result'
}).then(answer => {
  const isRootRoute = answer.result === '根路由';
  const filePath = isRootRoute ? rootRoute : homeChildRoute;
  //先检测当前有哪些模块
  fs.readdir(filePath, {withFileTypes: true}, (err, files) => {
    if (err) {
      console.log(err);
      return;
    }
    // 将是文件夹的过滤出来
    let dirList = [];
    files.forEach(file => {
      if (file.isDirectory()) {
        dirList.push(file.name);
      }
    });
    inquirer.prompt({
      type: 'input',
      message: '请输入文件夹名：',
      name: 'name',
      validate: answer => {
        if (!answer) {
          return '请输入文件夹名';
        }
        // 相同名字的文件夹是否已存在
        if (dirList.includes(answer)) {
          return '已存在相同名字的文件夹';
        }
        return true;
      }
    }).then(answer => {
      // 创建文件夹
      generateModule(filePath, answer.name, isRootRoute);
    });
  });
});