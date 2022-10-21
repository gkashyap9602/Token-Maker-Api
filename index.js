const express = require('express')
// const connection = require('./connection/connection')
const middleware = require("./middleware")
const config = require('./config/config')
const route = require('./MainRoutes')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()
const cors = require('cors')

app.listen(config.port,()=>{
    console.log(`Server is running on ${config.port}`);
})

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('views'));
// app.use('/static', express.static(path.join(__dirname, './views')));
//app.use(multer().array())
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
 });
 
 app.use(cors({origin:["http://localhost:3000","https://tokenmaker.block-brew.com"]}));
  app.use('/api/v1', route);
  
  app.use(middleware.errCreate)
  app.use(middleware.routeErr)