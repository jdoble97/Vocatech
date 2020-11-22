const bcrypt = require('bcrypt');
const pool = require('../bbdd/conexion');

module.exports = {
    
    insertUser: (res, user)=>{
        pool.getConnection()
    }
    
}