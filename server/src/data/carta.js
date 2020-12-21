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
    },
    insertCarta: (carta)=>{
        return new Promise((resolve,reject)=>{
            pool.getConnection()
                .then(conn=>{
                    let miQuery = `INSERT INTO cartas VALUES(null, ?, ?, ?, ?)`;
                    conn.query(miQuery,[carta.id_baraja, carta.nombreCastellano, carta.nombreIngles, carta.aprendido])
                        .then(row=>{
                            resolve({status: true, insertId: row.insertId})
                        })
                        .catch(err=>{
                            reject({status: false, message: 'Error de query'})
                        })
                    conn.release();
                })
                .catch(err=>{
                    reject({status: false, message: 'Error de conexion'})
                })
        })
    },

    updateCarta: (carta)=>{
        return new Promise((resolve, reject)=>{
            pool.getConnection()
                .then(conn=>{
                    let miQuery = 'UPDATE cartas SET id_baraja=?, nombreCastellano=?, nombreIngles=?, aprendido=? WHERE ID=?';
                    conn.query(miQuery, [carta.id_baraja, carta.nombreCastellano, carta.nombreIngles, carta.aprendido, carta.ID])
                        .then(row=>{
                            resolve({status: true, message: 'Carta actualizada'});
                        })
                        .catch(err=>{
                            reject({status: false, message: 'Error de query'})
                        })
                    conn.release();
                })
                .catch(err=>{
                    reject({status: false, message: 'Error de conexion'})
                })
        })
    },

    deleteCarta: (id)=>{
        return new Promise((resolve, reject)=>{
            pool.getConnection()
                .then(conn=>{
                    let miQuery = 'DELETE FROM cartas WHERE ID=?';
                    conn.query(miQuery, [id])
                        .then(row=>{
                            resolve({status: true, message: 'Carta eliminada'});
                        })
                        .catch(err=>{
                            reject({status: true, message: 'Error de query'});
                        })
                })
                .catch(err=>{
                    reject({status: false, message: 'Error de conexion'})
                })
        })
    }
}