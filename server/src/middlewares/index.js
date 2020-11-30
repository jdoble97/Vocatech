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
    prueba: (req, res)=>{
        res.send('Tu token--> '+res.locals.token)
    },
    isAuth: (req,res,next)=>{
        const token = validateToken(req.headers.authorization);
        console.log(token)
        if(!token){
            return res.status(403).send({message: 'No hay token'})
        }
        if(token.message){
            return res.status(401).send(token);
        }
        res.locals.user = token
        next();

    }
}