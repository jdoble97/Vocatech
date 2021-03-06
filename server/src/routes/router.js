const routes = require('express').Router();
const controllers = require('../controllers/controllers');
const middleware = require('../middlewares/index')
const path = require('path')
//routes.get('/', controllers.homeController);
//Enviar un json {username, email, pass}

//USER
routes.post('/api/signup', middleware.checkUserRegister, controllers.signUpController);
routes.post('/api/login', middleware.checkLogin, controllers.loginController)
routes.get('/api/check-token',middleware.checkToken);

////////////
//BARAJAS
////////////
routes.post('/api/baraja',middleware.isAuth, controllers.insertBarajaController);

routes.get('/api/barajas/:id', middleware.isAuth,controllers.selectBarajasController);
routes.get('/api/barajas-order/:id', middleware.isAuth, controllers.selectDecksOrderController);
routes.get('/api/barajas-last/:id', middleware.isAuth, controllers.selectDecksLastController);

routes.put('/api/baraja', middleware.isAuth, controllers.updateBarajaController);
routes.delete('/api/baraja/:id', middleware.isAuth, controllers.deleteBarajaController);
routes.get('/api/number-decks',middleware.isAuth, controllers.getNumberDecks);
routes.get('/api/list-decks/:id', middleware.isAuth, controllers.listDecks)
routes.get('/api/list-decks-before/:id', middleware.isAuth, controllers.listDecksBefore)
routes.get('/api/baraja/:id', middleware.isAuth, controllers.selectDeckController)

////////////
//CARTAS
////////////
//Envia una carta y se inserta. Si es true devuelve la id, si es false un mensaje
routes.post('/api/carta', middleware.isAuth, controllers.insertCartaController);
routes.get('/api/cartas/:id',middleware.isAuth, controllers.selectCartasController);
//Actualizar una carta de una baraja
routes.put('/api/carta', middleware.isAuth, controllers.updateCartaController);
routes.delete('/api/carta/:id',middleware.isAuth, controllers.deleteCartaController);
routes.get('*',(req,res)=>{
    let ruta = path.join(__dirname, "../../vocatech/index.html");
    res.sendFile(ruta);
})

module.exports = routes;