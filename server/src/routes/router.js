const routes = require('express').Router();
const controllers = require('../controllers/controllers');
const middleware = require('../middlewares/index')
routes.get('/', controllers.homeController);
//Enviar un json {username, email, pass}
routes.post('/api/signup',controllers.signUpController, middleware.validateData, middleware.prueba  );
routes.get('/api/insertword',middleware.isAuth,(req,res)=>{
    res.send('Contraseña correcta '+res.locals.token)
});

module.exports = routes;