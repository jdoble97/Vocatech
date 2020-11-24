const express = require('express');
const rutas = require('./routes/router')
const app = express();
const cors = require('cors')

//Estableciendo cors
//app.use(cors())
app.use(express.urlencoded({extended:false}))
//app.use(express.json())
app.use('/',rutas)


module.exports = app;