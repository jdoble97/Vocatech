const jwt = require('jwt-simple');
const bcrypt = require('bcrypt');
const moment = require('moment');
const { SECRET_TOKEN, SALT_ROUNDS } = require('../config/config')

module.exports = {
    createToken: (email) => {
        const payload = {
            sub: email,
            iat: moment().unix(),
            exp: moment().add(15, 'days').unix(),
        }
        return jwt.encode(payload, SECRET_TOKEN);
    },
    validateToken: (token) => {
        if (!token) {
            return false;
        }
        const myToken = token.split(" ")[1];
        try {
            const payload = jwt.decode(myToken, SECRET_TOKEN);
            if (payload.exp <= moment().unix()) {
                return { status: false, message: 'Token caducado'}
            }
            return payload.sub;
        } catch (err) {
            return {status: false, message: 'El token ha sido modificado'}
        }

    },

    //Contraseña
    encryptPass: (pass) => {
        return bcrypt.hash(pass, SALT_ROUNDS)
            .then(passHashed=>{
                return {status: true, hash: passHashed};
            })
            .catch(err=>{
                return {status: false, message: 'Error al encriptar la contraseña'}
            })
    },

    decryptPass: (passPlain, passHashed) => {
        return bcrypt.compare(passPlain, passHashed)
            .then(match => {
                if (match) {
                    return true;
                }
                return false;
            });
    }
}
