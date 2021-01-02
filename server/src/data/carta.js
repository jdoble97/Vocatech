const pool = require('../config/conexion');

module.exports = {
    selectCards: (idBaraja)=>{
        return new Promise((resolve, reject)=>{
            pool.getConnection()
                .then(conn=>{
                    let miQuery = `SELECT * FROM card WHERE FK_DeckID=?`;
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
                    let miQuery = `INSERT INTO card VALUES(null, ?, ?, ?, ?)`;
                    conn.query(miQuery,[carta.FK_DeckID, carta.nombreCastellano, carta.nombreIngles, carta.aprendido])
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
                    let miQuery = 'UPDATE card SET FK_DeckID=?, nombreCastellano=?, nombreIngles=?, aprendido=? WHERE ID=?';
                    conn.query(miQuery, [carta.FK_DeckID, carta.nombreCastellano, carta.nombreIngles, carta.aprendido, carta.ID])
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
                    let miQuery = 'DELETE FROM card WHERE ID=?';
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