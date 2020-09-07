const mysql = require('mysql');
const { MySQLConfig } = require('../config');

// 新建连接池
var pool  = mysql.createPool({
  host     : MySQLConfig.HOST,
  user     : MySQLConfig.USERNAME,
  password : MySQLConfig.PASSWORD,
  database : MySQLConfig.DATABASE
});

class Mysql {
  constructor () {

  }
  query () {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * from test', function (error, results, fields) {
          if (error) {
              throw error
          };
          resolve(results)
          // console.log('The solution is: ', results[0].solution);
      });
    })
     
  }
}

module.exports = new Mysql()
