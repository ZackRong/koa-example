// 创建Sequelize对象
const Sequelize = require('sequelize');
const { MySQLConfig } = require('../config');
const sequelize = new Sequelize(MySQLConfig.DATABASE, MySQLConfig.USERNAME, MySQLConfig.PASSWORD, {
  host: MySQLConfig.HOST,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 30000
  }
});

// 是否连接成功
sequelize.authenticate()
  .then(() => {
    console.log('数据库连接成功');
  }).catch((err) => {
    console.log('数据库连接失败', err);
  })

module.exports.sequelize = sequelize;
