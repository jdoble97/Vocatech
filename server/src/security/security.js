const jwt = require('jwt-simple');
const moment = require('moment');
const { SECRET_TOKEN } = require('../config/config')

module.exports = {
    createToken: (user) => {
        const payload = {
            sub: user.email,
            iat: moment().unix(),
            exp: moment().add(15, 'days').unix(),
        }
        return jwt.encode(payload, SECRET_TOKEN);
    },
    validateToken: (token)=>{
        if(!token){
            return false;
        }
        const myToken = token.split(" ")[1];
        const payload = jwt.decode(myToken, SECRET_TOKEN, true);
        if(payload.exp <= moment().unix()){
            return {message: 'Token caducado'}
        }
        return payload.sub;
    }
}
