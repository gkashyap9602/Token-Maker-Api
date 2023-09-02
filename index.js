const express = require('express')
// const connection = require('./connection/connection')
const middleware = require("./Utils/middleware")
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

///
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", 1);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept,authtoken"
  );
  next();
});
app.use(cors());
//  app.use(cors({origin:"https://tokenmaker.block-brew.com"}));
  app.use('/api/v1', route);
  
  app.use(middleware.errCreate)
  app.use(middleware.routeErr)