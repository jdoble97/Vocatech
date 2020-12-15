const con = require('./user');

let usuario = {
    email: 'sergio@gmail.com',
    pass: '123456',
    nombre: 'Jorge Gonzalez'
}

con.insertUser(usuario)
    .then(r=>{
        console.log("Fuera de la funcion",r)
    })
    .catch(err=>{
        console.log('Error fuera de la funcion')
    })