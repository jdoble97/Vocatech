const routes = require('express').Router();
const controllers = require('../controllers/controllers');
const middleware = require('../middlewares/index')
//routes.get('/', controllers.homeController);
//Enviar un json {username, email, pass}
//USER
routes.get('/hola',(req,res)=>{
    res.send('HOLA MUNDO')
})
routes.post('/api/signup', middleware.checkUserRegister, controllers.signUpController);
routes.post('/api/login', middleware.checkLogin, controllers.loginController)

routes.get('/api/check-token',middleware.checkToken)

////////////
//BARAJAS
////////////
routes.get('/api/barajas', middleware.isAuth,controllers.barajasController)
routes.get('/api/barajas/:id',middleware.isAuth, controllers.cartasController)

module.exports = routes;