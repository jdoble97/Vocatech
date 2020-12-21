const validator = require('../helpers/validator')
const {validateToken} = require('../security/security');
module.exports = {
    validateData: async (req,res, next)=>{
        try{
            let user = res.locals.user;
            let validation = [];
            console.log("Validacion",res.locals.user);
            validation[0] = validator.validateUsername(user.username);
            validation[1]= validator.validateEmail(user.email);
            if(validation[0].ok && validation[1].ok){
                validator.encryptPass(user.pass,res,next);
            }
        }catch(error){
            console.log('Error',error)
        }
    },

    isAuth: (req,res,next)=>{
        //REVISAR TOKEN VALIDATION
        const token = validateToken(req.headers.authorization);
        if(!token){
            return res.status(403).json({status: false, message: 'No hay token'})
        }
        if(token.message){
            return res.status(401).json(token)
        }
        res.locals.user = token
        next();
    },
    checkToken: (req,res)=>{
        const token = validateToken(req.headers.authorization);
        console.log("Forma del token: ",token)
        if(!token){
            return res.status(403).json({status: false, message: 'No hay token'})
        }
        if(token.message){
            return res.status(401).json({status: false, message: 'Token caducado'});
        }
        res.status(200).json({status: true, message: 'Token válido'});
    },
    checkUserRegister: (req, res, next)=>{
        let user = {email: req.body.email, pass: req.body.pass, username: req.body.username};
        if(!user.email || !user.pass || !user.username){
            return res.status(400).json({status: false, message: 'Falta alguno de los campos'});
        }
        res.locals.user = user;
        next();
    },

    checkLogin: (req, res, next)=>{
        let user = { email: req.body.email, pass: req.body.pass }
        if (!user.email || !user.pass) {
            return res.status(400).json({ status: false, message: 'Falta alguno de los campos' })
        }
        res.locals.user = user;
        next();
    }

}