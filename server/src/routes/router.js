const routes = require('express').Router();
const controllers = require('../controllers/controllers');
const middleware = require('../middlewares/index')
routes.get('/', controllers.homeController);
//Enviar un json {username, email, pass}
routes.post('/api/signup', middleware.checkUserRegister, controllers.signUpController);
routes.post('/api/login', middleware.checkLogin, controllers.loginController)
routes.get('/api/insertword',middleware.isAuth,(req,res)=>{
    res.send('Contraseña correcta '+res.locals.token)
});
routes.get('/api/check-token',middleware.checkToken)

module.exports = routes;