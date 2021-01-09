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
app.use((req, resp, next)=>{
    console.log(req.method,'->', req.originalUrl, req.url);
    next()
})
app.use('/',rutas)

module.exports = app;
