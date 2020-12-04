const DB = require('./config')
const mariadb = require('mariadb');
const pool = mariadb.createPool({ host: DB.HOST, user: DB.USER, connectionLimit: 5, database:DB.NAME });
module.exports = pool;