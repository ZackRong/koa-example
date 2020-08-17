const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const pathRoute = path.join(__dirname, '../src/routes');

// 创建路由模块
const generateModule = (dirName) => {
  fs.mkdir(`${pathRoute}/${dirName}`, (err) => {
    if (err) {
      return;
    }
    fs.mkdir(`${pathRoute}/${dirName}/components`, (err) => {
      if (err) {
        console.log(chalk.green('文件夹 ' + chalk.red.underline.bold('components') + ' 创建失败!'));
        return;
      }
      console.log(chalk.green('文件夹 ' + chalk.blue.underline.bold('components') + ' 创建成功!'));
    });
    fs.writeFile(`${pathRoute}/${dirName}/config.js`, '//config.js', (err) => {
      if (err) {
        console.log(chalk.green('文件 ' + chalk.red.underline.bold('config.js') + ' 创建失败!'));
        return;
      }
      console.log(chalk.green('文件 ' + chalk.blue.underline.bold('config.js') + ' 创建成功!'));
    });
    fs.writeFile(`${pathRoute}/${dirName}/index.js`, '//index.js', (err) => {
      if (err) {
        console.log(chalk.green('文件 ' + chalk.red.underline.bold('index.js') + ' 创建失败!'));
        return;
      }
      console.log(chalk.green('文件 ' + chalk.blue.underline.bold('index.js') + ' 创建成功!'));
    });
    fs.writeFile(`${pathRoute}/${dirName}/index.less`, '//index.less', (err) => {
      if (err) {
        console.log(chalk.green('文件 ' + chalk.red.underline.bold('index.less') + ' 创建失败!'));
        return;
      }
      console.log(chalk.green('文件 ' + chalk.blue.underline.bold('index.less') + ' 创建成功!'));
    });
  });
};

module.exports = {
  generateModule
};
