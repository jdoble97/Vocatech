const bcrypt = require('bcrypt');
const { SALT_ROUNDS } = require('../config/config');
const createToken = require('../security/security');

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
    encryptPass: (pass,res, next)=>{
        bcrypt.hash(pass,SALT_ROUNDS)
            .then((hashedPassword)=>{
                console.log('Contraseña encriptada',hashedPassword);
                //createToken(res.locals.user);
                res.locals.token = createToken(res.locals.user);
                next();
            })
            .catch(e=>{
                console.log('No se pudo encriptar la contraseña',e)
                return res.status(403).send('Error en el servidor')
            })
    },
    decryptPass:  (res, pass, passHash)=>{
        bcrypt.compare(res, pass, passHash)
            .then(samePassword=>{
                if(!samePassword){
                    return res.status(403).send("Contraseña incorrecta.")
                }
                return res.status(200).send(
                    {
                        message: "Contraseña correcta",
                        token: createToken(res.locals.user)
                    }
                )
            })
            .catch(err=>{
                res.status(404).send("Se produjo un error en el servidor")
            })
    }
}