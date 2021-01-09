const pool = require('../config/conexion');

module.exports = {
    insertUser: (user) => {
        return new Promise((resolve, reject) => {
            pool.getConnection()
                .then(conn => {
                    let miQuery = 'INSERT INTO user (EMAIL, Name, Pass) VALUES(?, ?, ?)'
                    conn.query(miQuery, [user['email'], user['name'], user['pass']])
                        .then(row => {
                            resolve({ status: true, message: 'Registrado exitosamente' });
                        })
                        .catch(err => {
                            reject({ status: false, message: 'Correo ya registrado' });
                        })
                    conn.release();
                })
                .catch(err => {
                    console.log('Error por no cerrar conexion')
                    reject({ status: false, message: 'Erronmr de conexion' })
                })
        })
    },
    makeLogin: (user) => {
        return new Promise((resolve, reject) => {
            pool.getConnection()
                .then(conn => {
                    let myQuery = "SELECT EMAIL, Pass FROM user WHERE EMAIL=?";
                    conn.query(myQuery, [user.email])
                    .then(row => {
                            resolve({ status: true, data: row[0] })
                        })
                        .catch(err => {
                            reject({ status: false, message: 'Error query' });
                        })
                    conn.release();
                })
                .catch(err => {
                    reject({ status: false, message: 'Error de conexion' });
                })
        })
    },
}