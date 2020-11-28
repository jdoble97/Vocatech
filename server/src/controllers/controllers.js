const path = require('path');


module.exports = {
    homeController: (req,res)=>{
        res.sendFile(path.join(__dirname+'/../public/index.html'))
    },
    signUpController: (req,res,next)=>{
        let user = {username: req.body.username, email: req.body.email, pass: req.body.pass}
        console.log("Logup", user)
        if(!user.username || !user.email || !user.pass){
            return res.status(400).send("Falta alguno de los campos")
        }
        res.locals.user = user
        next();
    }    
}