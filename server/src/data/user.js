const bcrypt = require('bcrypt');
const pool = require('../config/conexion');

module.exports = {
    
    insertUser: (res, user)=>{
        console.log("Dentro")
        pool.getConnection()
            .then(conn=>{
                conn.sql
            })
            .catch(e=>{
                console.log('Error en la conexion')
            })
    }
    
}