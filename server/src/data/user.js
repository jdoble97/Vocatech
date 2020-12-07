const pool = require('../config/conexion');

module.exports = {
    insertUser: (user) => {
        return new Promise((resolve, reject) => {
            pool.getConnection()
                .then(conn => {
        
                    console.log('DENTRO', conn.threadId, " CONEXIONES ACTIVAS", pool.activeConnections())
                    let miQuery = 'INSERT INTO usuarios VALUES(?, ?, ?)'
                    conn.query(miQuery, [user['email'], user['pass'], user['username']])
                    .then(row => {
                        resolve ({ status: true, message: 'Registrado exitosamente' });
                    })
                    .catch(err => {
                        reject ({ status: false, message: 'Email ya registrado' });
                    })
                    conn.release();
                })
                .catch(err => {
                    console.log('Error por no cerrar conexion')
                    reject ({ status: false, message: 'Erronmr de conexion' })
                })
        })
    },
    makeLogin: (user) => {
        return new Promise((resolve, reject) => {
            pool.getConnection()
                .then(conn => {
                    let myQuery = "SELECT email, pass FROM usuarios WHERE email=?";

                    conn.query(myQuery, [user.email])
                        .then(row => {
                            resolve(row[0])
                        })
                        .catch(err => {
                            reject({ status: false, message: 'Error en el usuario' });
                        })
                    conn.release();
                })
                .catch(err => {
                    reject({ status: false, message: 'Error de conexion' });
                })
        })
    },
}