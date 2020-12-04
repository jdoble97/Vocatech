
const {createToken} = require('../security/security');

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
    }
}