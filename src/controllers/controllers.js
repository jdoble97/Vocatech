const {body, validationResult} = require('express-validator');//Eliminarlo
const path = require('path');
const validator = require('../helpers/validator');

module.exports = {
    homeController: (req,res)=>{
        res.sendFile(path.join(__dirname+'/../public/index.html'))
    },
    signUpController: (req,res,next)=>{
        let user = {username: req.body.username, email: req.body.email, pass: req.body.pass}
        console.log("Logup", user)
        if(!user.username || !user.email || !user.pass){
            res.status(400).send("Falta alguno de los campos")
        }else{
            res.locals.user = user
            next();
        }
    },
    //Validadores
    validateData: async (req,res)=>{
        try{
            let user = res.locals.user;
            let validation = [];
            console.log("Validacion",res.locals.user);
            validation[0] = validator.validateUsername(user.username);
            validation[1]= validator.validateEmail(user.email);
            if(validation[0].ok && validation[1].ok){
                validator.encryptPass(user.pass,res);
            }
        }catch(error){
            console.log('Error',error)
        }
    }
}