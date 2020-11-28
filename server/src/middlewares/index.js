const validator = require('../helpers/validator')
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
        res.send('Gracias por insertar los datos'+res.locals.token)
    }
}