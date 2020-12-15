const express = require('express');
const rutas = require('./routes/router')
const app = express();
const cors = require('cors')

//Estableciendo cors para permitir peticiones desde angular
app.use(interceptorLog)
app.use(interceptorCORS)
//app.use(cors())
app.use(express.static('vocatech'));
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use('/',rutas)
app.listen(7777, ()=>{
    console.log('LISTEN 7777...')
})

module.exports = app;

function interceptorLog(request, response, next){
    console.log("Peticion recibida:"+request.method+" "+request.url)
    next()
}
function interceptorCORS(request, response, next){
    console.log("CORS")
    //Incluye configuración para BASIC AUTHENTICATION
    response.header("Access-Control-Allow-Origin", "*")
    response.header('Access-Control-Allow-Methods', 
                    'GET,PUT,POST,DELETE,PATCH,OPTIONS')
    response.header("Access-Control-Allow-Headers", 
                    "Origin, X-Requested-With, Content-Type, Accept, Authorization")
    
    if (request.method.toUpperCase() == 'OPTIONS'){
        response.end()
        return
    }       
    next()
}