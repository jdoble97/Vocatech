const path = require('path');
const userDB = require('../data/user');
const security = require('../security/security');


module.exports = {
    homeController: (req, res) => {
        res.sendFile(path.join(__dirname + '/../public/index.html'))
    },

    signUpController: async (req, res) => {
        let user = res.locals.user;
        let hash = await security.encryptPass(user.pass);
        if(!hash.status){
            return res.status(500).json({status: false, message: 'Error al encriptar la contraseña'})
        }
        user.pass = hash.hash;
        userDB.insertUser(user)
            .then(respuesta=>{
                res.status(200).json({status: true, token:security.createToken(user.email), email: user.email});
            })
            .catch(err=>{
                res.json(err);
            })
    },

    loginController: async (req, res) => {
        let userFromDB = await userDB.makeLogin(res.locals.user);
        if (!userFromDB) {
            return res.status(200).json({ status: false, message: 'Email incorrecto' })
        }
        console.log('DB->', userFromDB);
        let matchPass = await security.decryptPass(res.locals.user.pass, userFromDB.pass);
        if(!matchPass){
            return res.status(200).json({status: false, message: 'Contraseña incorrecta'});
        }
        return res.status(200).json({status: true, token: security.createToken(userFromDB.email), email: userFromDB.email})
    }
}