const routes = require('express').Router();
const controllers = require('../controllers/controllers');
const middleware = require('../middlewares/index')
//routes.get('/', controllers.homeController);
//Enviar un json {username, email, pass}

//USER
routes.post('/api/signup', middleware.checkUserRegister, controllers.signUpController);
routes.post('/api/login', middleware.checkLogin, controllers.loginController)

routes.get('/api/check-token',middleware.checkToken);

////////////
//BARAJAS
////////////
routes.get('/api/barajas', middleware.isAuth,controllers.barajasController);
routes.get('/api/barajas/:id',middleware.isAuth, controllers.selectCartasController);

////////////
//CARTAS
////////////
//Envia una carta y se inserta. Si es true devuelve la id, si es false un mensaje
routes.post('/api/carta', middleware.isAuth, controllers.insertCartaController);
//Devuelve true y mensaje
routes.put('/api/carta', middleware.isAuth, controllers.updateCartaController);
//
routes.delete('/api/carta/:id',middleware.isAuth, controllers.deleteCartaController);

module.exports = routes;