const express = require ('express')
const appconfig = require ('./config/appconfig')
const fs = require('fs')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const globalLevelHandler = require('./middlewares/appErrorHandler')
const routerLoggerMiddleware = require('./middlewares/routeLogger')
const helmet = require('helmet')
const cors = require('cors')

//creating an new instance of application
const app = express()
//middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(cookieParser())
app.use(globalLevelHandler.globalErrorHandler)
app.use(routerLoggerMiddleware.logIp)
app.use(helmet())
app.use(cors())
//bootstarp models
let modelsPath = './models'
let routesPath = './routes'

fs.readdirSync(modelsPath).forEach(function(file) {
  console.log(file)
  if(~file.indexOf('.js')) require(modelsPath +'/'+ file);
  })

fs.readdirSync(routesPath).forEach(function(file) {
 if(~file.indexOf('.js')){
   console.log("including the following file");
   console.log(`${routesPath} / ${file}`);
   let route = require(routesPath +'/'+ file);
   route.setRouter(app);
 }
})

app.use(globalLevelHandler.globalNotFoundHandler)


app.listen(appconfig.port, () => {
  console.log('Example app listening at http://localhost:'+ appconfig.port);
  let db = mongoose.connect(appconfig.db.uri);
})



mongoose.connection.on('error',function(err){
  console.log('database connection error');
  console.log(err);
});


mongoose.connection.on('open',function(err){
  if(err){console.log('database error');
  console.log(err);
}else{
  console.log('database connection open success')
}
});






