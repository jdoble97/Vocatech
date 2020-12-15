const pool = require('../config/conexion');

module.exports = {
    selectCartas: (idBaraja)=>{
        return new Promise((resolve, reject)=>{
            pool.getConnection()
                .then(conn=>{
                    let miQuery = `SELECT * FROM cartas WHERE id_baraja=?`;
                    conn.query(miQuery,[idBaraja])
                        .then(row=>{
                            resolve({status: true, data: row})
                        })
                        .catch(err=>{
                            reject({status: false, message: 'Error en la query'})
                        })
                    conn.release();
                })
                .catch(err=>{
                    reject({status: false, message: 'Error de conexion'});
                })
        })
    }
}