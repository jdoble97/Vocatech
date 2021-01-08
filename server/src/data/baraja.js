const pool = require('../config/conexion');

module.exports = {
    selectDecks: (reqClient) => {
        return new Promise((resolve, reject) => {
            pool.getConnection()
                .then(conn => {
                    let miQuery = 'SELECT * FROM deck WHERE FK_Email=? AND ID>? LIMIT 9';
                    conn.query(miQuery, [reqClient.email, reqClient.id])
                        .then(row => {
                            resolve({ status: true, data: row });
                        })
                        .catch(err => {
                            reject({ status: false, message: 'Error de query' });
                        })
                    conn.release();
                })
                .catch(err => {
                    reject({ status: false, message: 'Error de conexion' });
                })
        })
    },
    selectDeck: (id) => {
        return new Promise((resolve, reject) => {
            pool.getConnection()
                .then(conn => {
                    let myQuery = `SELECT * FROM deck WHERE ID=?`;
                    conn.query(myQuery, [id])
                        .then(row => {
                            resolve({status: true, row: row})
                        })
                        .catch(err=>{
                            reject({status: false, message: 'Error de query'})
                        });
                    conn.release();
                })
                .catch(err => {
                    reject({ status: true, message: 'Error de conexión' })
                })
        });
    },

    insertDeck: (deck) => {
        return new Promise((resolve, reject) => {
            pool.getConnection()
                .then(conn => {
                    let miQuery = 'INSERT INTO deck (FK_Email, Name) VALUES (?, ?)'
                    conn.query(miQuery, [deck.FK_Email, deck.Name])
                        .then(row => {
                            resolve({ status: true, idDeck: row.insertId, message: 'Baraja insertada correctamente' });
                        })
                        .catch(err => {
                            reject({ status: false, message: 'Error de query' });
                        })
                    conn.release();
                })
                .catch(err => {
                    reject({ status: false, message: 'Error de conexion' });
                })
        })
    },

    updateDeck: (deck) => {
        return new Promise((resolve, reject) => {
            pool.getConnection()
                .then(conn => {
                    let miQuery = 'UPDATE deck SET N=? WHERE ID=?';
                    conn.query(miQuery, [deck.name, deck.ID])
                        .then(row => {
                            resolve({ status: true, data: row })
                        })
                        .catch(err => {
                            reject({ status: false, message: 'Error de query' });
                        })
                    conn.release();
                })
                .catch(err => {
                    reject({ status: false, message: 'Error de conexion' });
                })
        })
    },

    deleteDeck: (idDeck) => {
        return new Promise((resolve, reject) => {
            pool.getConnection()
                .then(conn => {
                    let miQuery = 'DELETE FROM deck WHERE ID=?';
                    conn.query(miQuery, [idDeck])
                        .then(row => {
                            console.log('BORRADO', row)
                            resolve({ status: true, data: row });
                        })
                        .catch(err => {
                            reject({ status: false, message: 'Error de query' })
                        })
                })
                .catch(err => {
                    reject({ status: false, message: 'Error de conexion' });
                });
        })
    },

    getNumberDecks: (email) => {
        return new Promise((resolve, reject) => {
            pool.getConnection()
                .then(conn => {
                    let miQuery = 'SELECT COUNT(ID) FROM deck WHERE FK_Email=?';
                    conn.query(miQuery, [email])
                        .then(row => {

                            resolve({ status: true, number: row[0]["COUNT(ID)"] });
                        })
                        .catch(err => {
                            reject({ status: false, message: 'Error de query' })
                        });
                    conn.release();
                })
                .catch(err => {
                    reject({ status: false, message: 'Error de conexion' });
                });

        })
    },

    listDecks: (params) => {
        return new Promise((resolve, reject) => {
            pool.getConnection()
                .then(conn => {
                    let myQuery = 'SELECT ID, Name from deck WHERE FK_Email=? AND ID>? LIMIT 10';
                    conn.query(myQuery, [params['email'], params['id']])
                        .then(rows => {
                            resolve({ status: true, data: rows });
                        })
                        .catch(err => {
                            reject({ status: false, message: 'Error de query' });
                        })
                    conn.release();
                })
                .catch(err => {
                    reject({ status: false, message: 'Error de conexión' })
                })
        })
    },
    listDecksBefore: (params) => {
        return new Promise((resolve, reject) => {
            pool.getConnection()
                .then(conn => {
                    let myQuery = 'SELECT ID, Name from deck WHERE FK_Email=? AND ID<? ORDER BY ID DESC LIMIT 10';
                    conn.query(myQuery, [params['email'], params['id']])
                        .then(rows => {
                            resolve({ status: true, data: rows });
                        })
                        .catch(err => {
                            reject({ status: false, message: 'Error de query' });
                        })
                    conn.release();
                })
                .catch(err => {
                    reject({ status: false, message: 'Error de conexión' })
                })
        })
    }
}