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
let List = [];
const blogMockTemplate = {
  // 'token': Random.guid(),
  'createTime': Mock.Random.datetime(),
  'title': '@ctitle',
  'content': '@cparagraph',
  'creator': '@name',
  'avator': '@image',
  'creatorId': '@id',
  'agreeCount|+1': Random.natural(0, 100)
};

Mock.mock('/api/listBlog', function (options) {
  let { body } = options || {};
  if (body) {
    body = JSON.parse(body);
    const { count = 0 } = body;
    console.log(count)
    for (let i = 0; i < count; i++) {
      List.push(Mock.mock({
        'token': Random.guid(),
        ...blogMockTemplate
      }));
    }
  }
  return {
    errorCode: 200,
    response: List
  };
});
