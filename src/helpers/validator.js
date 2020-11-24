const bcrypt = require('bcrypt');
const { SALT_ROUNDS } = require('../config/config');
const createToken = require('../services/security');

module.exports = {
    validateUsername: (username)=>{
        let pattern = /^[a-z]+(\s+[a-z]+){0,5}/ig;
        let matchUsername = username.match(pattern);
        console.log("matchUser:",matchUsername)
        if(!matchUsername){
            return {ok: false, message: "El usuario debe contener solo letras"};
        }
        matchUsername = matchUsername.toString();
        if(matchUsername==username){
            return {ok: true, message: 'Usuario correcto'};
        }else{
            return {ok: false, message: "El usuario debe contener solo letras"};
        }

    },
    validateEmail: (email)=>{
        let pattern = /^(\w+\.*)+@[a-z]+\.[a-z]+(\.[a-z]+)*/ig;
        let matchEmail = email.match(pattern);
        if(!matchEmail){
            return {ok: false, message: 'Email no valido',}
        }
        matchEmail = matchEmail.toString();
        if(matchEmail==email){
            return {ok:true, message: 'Email correcto'};
        }else{
            return {ok:false, message: 'Email no valido'};
        }
    },
    validatePass: (pass)=>{

    },
    encryptPass: (pass,res)=>{
        bcrypt.hash(pass,SALT_ROUNDS)
            .then((hashedPassword)=>{
                console.log('Contraseña encriptada',hashedPassword);
                createToken(res.locals.user);
                res.status(200).json({
                    token: createToken(res.locals.user),
                    message: 'El token caducará en 15 días'
                });
                //return hashedPassword;
            })
            .catch(e=>console.log('No se pudo encriptar la contraseña',e))
    },
    decryptPass: (res, pass)=>{
        res.send("Hola mundo")
    }
}