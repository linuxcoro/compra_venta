const express = require('express')
const bodyParser = require('body-parser')
const http = require('http')

// create our connection
db = require('./config/connection')

// create our express app
let app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next()
  });
  

//import routing
let personRouting = require('./api/routes/personRouting')
let productsRouting = require('./api/routes/productsRouting')
let rutasRouting = require('./api/routes/rutasRouting')
let scrapingRouting = require('./api/routes/scrapingRouting')
let categoryRouting = require('./api/routes/categoryRouting')

app.use('/api/v1/person/', personRouting)
app.use('/api/v1/products/', productsRouting)
app.use('/api/v1/rutas/', rutasRouting)
app.use('/api/v1/scraping/', scrapingRouting)
app.use('/api/v1/categoria/',categoryRouting)

const port = process.env.PORT || 3000;
let server = http.createServer(app)
server.listen(port,function(){
    console.log('listening on 3000')
})