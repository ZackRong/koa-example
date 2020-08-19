import Mock from 'mockjs';
// 设置100ms后响应
Mock.setup({timeout: 100});

// 列表数据模拟
Mock.mock('/api/listBlog', {
  errorCode: 200,
  list: []
});
