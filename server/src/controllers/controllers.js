const path = require('path');
const userDB = require('../data/user');
const barajaDB = require('../data/baraja');
const cartasDB = require('../data/carta');
const security = require('../security/security');


module.exports = {
    homeController: (req, res) => {
        res.sendFile(path.join(__dirname + '/../public/index.html'))
    },

    signUpController: async (req, res) => {
        let user = res.locals.user;
        security.encryptPass(user.pass)
            .then(response=>{
                user.pass = response.hash;
                console.log(user.pass)
                userDB.insertUser(user)
                    .then(result=>{
                        return res.status(200).json({status: true, token: security.createToken(user.email), email: user.email});
                    })
                    .catch(err=>{
                        return res.status(400).json(err)
                    });
            })
            .catch(err=>{
                return res.status(400).json(err);
            });
    },

    loginController: (req, res) => {
        userDB.makeLogin(res.locals.user)
            .then(user=>{
                if(!user.data){
                    return res.status(200).json({status: false, message: "Email no registrado"});
                }
                security.decryptPass(res.locals.user.pass, user.data.Pass)
                    .then(match=>{
                        if(match){
                            return res.status(200).json({status: true, token: security.createToken(res.locals.user.email), email: res.locals.user.email})
                        }
                        return res.status(200).json({status: false, message: "Contraseña incorrecta"})
                    })
            })
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
        barajaDB.selectDecks({email: res.locals.user, id: req.params.id})
            .then(responses=>{
                return res.status(200).json(responses)
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

    getNumberDecks: (req, res)=>{
        barajaDB.getNumberDecks(res.locals.user)
            .then(result=>{
                return res.status(200).json(result)
            })
            .catch(err=>{
                return res.status(200).json(err)
            });
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