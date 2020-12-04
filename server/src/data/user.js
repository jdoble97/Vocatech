const pool = require('../config/conexion');

module.exports = {
    
    insertUser: (user)=>{
        return pool.getConnection()
            .then(conn=>{
                let miQuery = 'INSERT INTO usuarios VALUES(?, ?, ?)'
                return conn.query(miQuery,[user['email'],user['pass'],user['username']])
                    .then(row=>{
                        return {status: true, message: 'Registrado exitosamente'}
                    })
                    .catch(err=>{
                        return {status: false, message: 'Email ya registrado'}
                    })
            })
            .catch(err=>{
                return {status: false, message: 'Error de conexion'}
            })
    },
    makeLogin: (user)=>{
        return pool.getConnection()
            .then(conn=>{
                let myQuery = "SELECT email, pass FROM usuarios WHERE email=?";
                return conn.query(myQuery,[user.email])
                    .then(row=>{
                        conn.release();
                        return row[0];
                    })
                    .catch(err=>{
                        return {status:false, message:'Error en el usuario'}
                    })

            })
            .catch(err=>{
                return {status: false, message: 'Error de conexion'}
            })

    }
}