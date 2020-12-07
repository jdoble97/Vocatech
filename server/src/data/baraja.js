const pool = require('../config/conexion');

module.exports = {
    selectBarajas: (email)=>{
        return new Promise((resolve, reject)=>{
            pool.getConnection()
                .then(conn=>{
                    let miQuery = 'SELECT * FROM barajas WHERE email=?';
                    conn.query(miQuery,[email])
                        .then(row=>{
                            resolve({status: true, data: row});
                        })
                        .catch(err=>{
                            reject({status: false, message: 'Error de query'});
                        })
                    conn.release();
                })
                .catch(err=>{
                    reject({status: false, message: 'Error de conexion'});
                })
        })
    }
    
}