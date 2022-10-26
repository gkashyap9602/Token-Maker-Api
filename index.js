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
// var allowedOrigins = ['http://localhost:3000',
//                       'https://tokenmaker.block-brew.com'];
// app.use(cors({
//   origin: function(origin, callback){
//     // allow requests with no origin 
//     // (like mobile apps or curl requests)
//     if(!origin) return callback(null, true);
//     if(allowedOrigins.indexOf(origin) === -1){
//       var msg = 'The CORS policy for this site does not ' +
//                 'allow access from the specified Origin.';
//       return callback(new Error(msg), false);
//     }
//     return callback(null, true);
//   }
// }));
// app.use('/static', express.static(path.join(__dirname, './views')));
//app.use(multer().array())
// app.use(function(req, res, next) {
// 	res.header("Access-Control-Allow-Origin", "*");
// 	res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
// 	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
// 	next();
//  });
 
//  app.use(cors({origin:"https://tokenmaker.block-brew.com"}));
  app.use('/api/v1', route);
  
  app.use(middleware.errCreate)
  app.use(middleware.routeErr)