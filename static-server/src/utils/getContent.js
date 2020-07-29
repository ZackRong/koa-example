const fs = require('fs');
const path = require('path');

const getDirContent = (path, realPath) => {
  let list = fs.readdirSync(realPath, {withFileTypes: true}), content = '', dirList = [], fileList = [];
  list = list.filter(item => item.name[0] !== '.');
  list.forEach(item => {
    if (item.isDirectory()) {
      dirList.push(item);
    } else if (item.isFile()) {
      fileList.push(item);
    }
  });
  if (dirList.length) {
    content += '<h3>文件夹</h3><ul>';
    dirList.map(dir => {
      content += `<li><a href='${path === '/' ? '' : path}/${dir.name}'>${dir.name}</a></li>`;
    });
    content += '</ul>';
  }
  if (fileList.length) {
    content += '<h3>文件</h3><ul>';
    fileList.map(file => {
      content += `<li><a href='${path === '/' ? '' : path}/${file.name}'>${file.name}</a></li>`;
    });
    content += '</ul>';
  }
  return content;
}

const getFileContent = (path) => {
  return fs.readFileSync(path);
}

const getContent = async (staticPath, ctx) => {
  // ctx.path是相对于根目录的，所以文件的实际路径是：目录+ctx.path
  const realPath = path.join(staticPath, ctx.path);
  const stat = fs.statSync(realPath);
  if (stat.isDirectory()) {
    return getDirContent(ctx.path, realPath);
  } else if (stat.isFile()) {
    return getFileContent(realPath);
  }
};

module.exports = getContent;
