const security = require('./security/security');

const DB = require('./config/config')
const mariadb = require('mariadb');
const pool = mariadb.createPool({ host: DB.HOST, connectionLimit:5 ,user: DB.USER, database: DB.NAME });
pool.on('acquire', conn => {
    console.log('CONEXION', conn.threadId)
    console.log('DISPONIBILIDAD',pool.idleConnections())
});
function insertUserS(conn, user) {
    let miQuery = 'INSERT INTO usuarios VALUES(?, ?, ?)'
    return new Promise((resolve, reject) => {
        conn.query(miQuery, [user['email'], user['pass'], user['username']])
            .then(row => {
                conn.
    
                resolve({ status: true, message: 'Registrado exitosamente' });
            })
            .catch(err => {
                reject({ status: false, message: 'Email ya registrado' });
            })
    })
}
async function insertUserP() {
    pool.getConnection()
        .then(conn => {
            insertUserS(conn, userJ)
                .then(r => console.log(r))
                .catch(error => console.log(error))
        })
}


function wrapped() {
    console.log('A')
    let user = { email: 'jorge@gmail.com', pass: 'jorge123', username: 'jorge gonzalez' };

    pool.getConnection()
        .then(conn => {
            let miQuery = 'INSERT INTO usuarios VALUES(?, ?, ?)'
            conn.query(miQuery, [user['email'], user['pass'], user['username']])
                .then(row => {
                    conn.release();
                    console.log({ status: true, message: 'Registrado exitosamente' });
                })
                .catch(err => {
                    console.log({ status: false, message: 'Email ya registrado' });
                })
        })
        .catch(err => {
            console.log('Error de conexion')
        })
}

console.log('1')
wrapped()
console.log('2')
wrapped()
console.log('3')
wrapped()
console.log('4')
console.log('1')
wrapped()
console.log('2')
wrapped()
console.log('3')
wrapped()
console.log('4')
console.log('1')
wrapped()
console.log('2')
wrapped()
console.log('3')
wrapped()
console.log('4')