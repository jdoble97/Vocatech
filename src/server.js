const express = require('express');
const rutas = require('./routes/router')
const app = express();
const cors = require('cors')

//Estableciendo cors
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use('/',rutas)


module.exports = app;