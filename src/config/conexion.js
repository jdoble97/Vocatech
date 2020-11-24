const DB = require('./config')
const mariadb = require('mariadb');
const pool = mariadb.createPool({ host: DB.HOST, user: DB.USER, connectionLimit: 5 });
module.exports = pool;