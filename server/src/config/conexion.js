const DB = require('./config')
const mariadb = require('mariadb');
const pool = mariadb.createPool({ host: DB.HOST, user: DB.USER, database:DB.NAME, connectionLimit:15 });
module.exports = pool;
