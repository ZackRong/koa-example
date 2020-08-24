import Mock from 'mockjs';
const Random = Mock.Random;

// 设置100ms后响应
Mock.setup({ timeout: '100-600' });

// 列表数据模拟
// Mock.mock('/api/listBlog', {
//   errorCode: 200,
//   'list|1-10': [
//     {
//       'id|+1': 1,
//       'createTime': Mock.Random.datetime(),
//       'title': '@ctitle',
//       'content': '@cparagraph',
//       'creator': '@name',
//       'avator': '@image',
//       'creatorId': '@id',
//       'agreeCount|+1': Random.natural(0, 100)
//     }
//   ]
// });
let List = [], count = 40;
const blogMockTemplate = {
  // 'token': Random.guid(),
  // 'createTime': Mock.Random.datetime(),
  'title': '@ctitle',
  'content': '@cparagraph',
  'creator': '@name',
  'avator': '@image',
  'creatorId': '@id',
  'agreeCount|+1': Random.natural(0, 100)
};

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    'token': Random.guid(),
    'createTime': Mock.Random.datetime(),
    ...blogMockTemplate
  }));
}

Mock.mock('/api/listBlog', (options) => {
  let { body } = options || {};
  let result = [];
  if (body) {
    body = JSON.parse(body);
    const { pageSize = 10, page = 1 } = body;
    const totalPage = Math.ceil(List.length / pageSize);
    if (page <= totalPage) {
      result = List.slice(pageSize * (page - 1), pageSize * page);
    }
  }
  return {
    errorCode: 200,
    response: {
      list: result,
      total: List.length
    }
  };
});

Mock.mock('/api/deleteBlog', (options) => {
  let { body } = options || {};
  if (body) {
    body = JSON.parse(body);
    const { token } = body;
    List = List.filter(item => item.token !== token);
    return {
      errorCode: 200,
      errorMessage: 'success'
    };
  }
});

