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

    insertDeck: (deck) => {
        return new Promise((resolve, reject) => {
            pool.getConnection()
                .then(conn => {
                    let miQuery = 'INSERT INTO deck (FK_Email, Name) VALUES (?, ?)'
                    conn.query(miQuery, [deck.email, deck.name])
                        .then(row => {
                            resolve({ status: true, idDeck: row.insertId });
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

                            resolve({ status:true, number: row[0]["COUNT(ID)"] });
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
    }
}