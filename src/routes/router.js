const routes = require('express').Router();
const controllers = require('../controllers/controllers');

routes.get('/', controllers.homeController);
routes.post('/api/signup',controllers.signUpController, controllers.validateData);
routes.get('')

module.exports = routes;