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
    },

    insertBaraja: (baraja)=>{
        return new Promise((resolve, reject)=>{
            pool.getConnection()
                .then(conn=>{
                    let miQuery = 'INSERT INTO barajas VALUES (null, ?, ?, ?, ?)'
                    conn.query(miQuery,[baraja.id_baraja, baraja.nombreCastellano, baraja.nombreIngles, false])
                        .then(row=>{
                            resolve({status: true, idBaraja: row.insertId});
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
    },
    
    updateBaraja: (baraja)=>{
        return new Promise((resolve, reject)=>{
            pool.getConnection()
                .then(conn=>{
                    let miQuery = 'UPDATE barajas SET nombre=? WHERE ID=?';
                    conn.query(miQuery, [baraja.nombre, baraja.ID])
                        .then(row=>{
                            resolve({status: true, data: row})
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
    },

    deleteBaraja: (idBaraja)=>{
        return new Promise((resolve, reject)=>{
            pool.getConnection()
                .then(conn=>{
                    let miQuery = 'DELETE FROM barajas WHERE ID=?';
                    conn.query(miQuery, [idBaraja])
                        .then(row=>{
                            resolve({status: true, data: row});
                        })
                        .catch(err=>{
                            reject({status: false, message: 'Error de query'})
                        })
                })
                .catch(err=>{
                    reject({status: false, message: 'Error de conexion'});
                })
        })
    }    
}