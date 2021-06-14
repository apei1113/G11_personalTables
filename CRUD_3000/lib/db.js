const mysql = require('mysql2');

const pool = mysql.createPool({ 
  host:'localhost', 
  user: 'root', 
  password: '1113',
  // database: 'dbdemo'
  database: '0521'
})

module.exports = pool.promise();
