const routes = require('express').Router();
const controllers = require('../controllers/controllers');
const middleWare = require('../middlewares/index')

routes.get('/', controllers.homeController);
routes.post('/api/signup',controllers.signUpController, middleWare.validateData, middleWare.prueba  );
routes.get('')

module.exports = routes;