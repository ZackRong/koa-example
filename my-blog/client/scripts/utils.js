const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

// config.js默认内容
const configJS = 
`const api = {};
const config = {};
  
export { api, config };
`;

// index.js默认内容
const IndexJS = (firstUpper, firstLower) => 
`import React, { Component, PureComponent } from 'react';
import './index.less';

const prefixCls = 'my-blog-${firstLower}';

class ${firstUpper} extends (PureComponent || Component) {
  render () {
    return (
      <div className={prefixCls}>
        ${firstUpper}
      </div>
    );
  }
}

export default ${firstUpper};
`;

// index.less默认内容
const indexLess = (name) => 
`.my-blog-${name} {
  
}
`;

// 创建路由模块
const generateModule = (filePath, dirName, isRootRoute = 0) => {
  const firstUpper = dirName.charAt(0).toUpperCase() + dirName.substring(1);
  const firstLower = dirName.charAt(0).toLowerCase() + dirName.substring(1);
  fs.mkdir(`${filePath}/${firstUpper}`, (err) => {
    if (err) {
      return;
    }
    fs.mkdir(`${filePath}/${firstUpper}/components`, (err) => {
      if (err) {
        console.log(chalk.green('文件夹 ' + chalk.red.underline.bold('components') + ' 创建失败!'));
        return;
      }
      console.log(chalk.green('文件夹 ' + chalk.blue.underline.bold('components') + ' 创建成功!'));
    });
    fs.writeFile(`${filePath}/${firstUpper}/config.js`, configJS, (err) => {
      if (err) {
        console.log(chalk.green('文件 ' + chalk.red.underline.bold('config.js') + ' 创建失败!'));
        return;
      }
      console.log(chalk.green('文件 ' + chalk.blue.underline.bold('config.js') + ' 创建成功!'));
    });
    fs.writeFile(`${filePath}/${firstUpper}/index.js`, IndexJS(firstUpper, firstLower), (err) => {
      if (err) {
        console.log(chalk.green('文件 ' + chalk.red.underline.bold('index.js') + ' 创建失败!'));
        return;
      }
      console.log(chalk.green('文件 ' + chalk.blue.underline.bold('index.js') + ' 创建成功!'));
    });
    fs.writeFile(`${filePath}/${firstUpper}/index.less`, indexLess(firstLower), (err) => {
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
