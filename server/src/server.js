const express = require('express');
const rutas = require('./routes/router')
const app = express();
const cors = require('cors')

app.use(cors())
app.options('**',cors())
app.use(express.json())
//Para texto plano xxx-rrr-url-enconded...
app.use(express.urlencoded({extended:false}))
app.use(express.static('vocatech'));
app.use('/',rutas)

module.exports = app;
