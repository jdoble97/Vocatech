const path = require('path');
const userDB = require('../data/user');
const barajaDB = require('../data/baraja');
const cartasDB = require('../data/carta');
const security = require('../security/security');
const baraja = require('../data/baraja');


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
    },
    //Baraja
    insertBarajaController: (req, res)=>{
        let baraja = req.body;
        barajaDB.insertBaraja(baraja)
            .then(resultado=>{
                return res.status(200).json(resultado);
            })
            .catch(err=>{
                return res.status(400).json(err)
            })
    },

    selectBarajasController: (req,res)=>{
        barajaDB.selectBarajas(res.locals.user)
            .then(r=>{
                return res.status(200).json(r)
            })
            .catch(err=>{
                return res.json(err)
            })
    },

    updateBarajaController: (req, res)=>{
        barajaDB.updateBaraja(req.body)
            .then(resultado=>{
                return res.status(200).json(resultado);
            })
            .catch(err=>{
                return res.status(400).json(err)
            })
    },

    deleteBarajaController: (req, res)=>{
        barajaDB.deleteBaraja(req.params.id)
            .then(resultado=>{
                return res.status(200).json(resultado);
            })
            .catch(err=>{
                return res.status(400).json(err);
            })
    },

    //Carta
    selectCartasController: (req,res)=>{
        //Name's parameter
        let  id = req.params.id
        cartasDB.selectCartas(id)
            .then(registros=>{
                return res.status(200).json(registros);
            })
            .catch(err=>{
                return res.json(err)
            })
    },

    insertCartaController: (req, res)=>{
        let carta = req.body;
        cartasDB.insertCarta(carta)
            .then(resultado=>{
                return res.status(200).json(resultado);
            })
            .catch(err=>{
                return res.status(400).json(err);
            })
    },
    
    updateCartaController: (req, res)=>{
        let carta = req.body;
        cartasDB.updateCarta(carta)
            .then(resultado=>{
                return res.status(200).json(resultado);
            })
            .catch(err=>{
                return res.status(400).json(err);
            })
    },
    
    deleteCartaController: (req,res)=>{
        cartasDB.deleteCarta(req.params.id)
            .then(resultado=>{
                return res.status(200).json(resultado);
            })
            .catch(err=>{
                return res.status(400).json(err);
            })
    }
}