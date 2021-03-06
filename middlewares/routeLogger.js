let config = require("./../config/appconfig")
const timeLib = require('./../libs/timeLib')


const today = timeLib.now()

let requestIpLogger = (res,req,next) =>{

    let remoteIp = req.connection.remoteAddress + '://'+ req.connection.remotePort;
    //let realIp = req.headers['x-real-ip'];
    console.log(req.method+" request Made from"+ remoteIp+" for route "+req.originalUrl+ today);

    if(req.method === 'OPTIONS'){
        console.log("!OPTIONS");
        var headers = {};
        // headers["Access-Control-Allow-Origin"]=req.headers.origin;
        headers["Access-Control-Allow-Origin"]="*";
        headers["Access-Control-Allow-Methods"]="POST,GET,PUT,DELETE,OPTIONS";
        headers["Access-Control-Allow-Credantials"]= false;
        headers["Access-Control-Max-Age"]="86400";//24 Hours
        headers["Access-Control-Allow-Headers"]="X-Requested-With,X-HTTP-Method-Override,Content-Type,Accept";
        res.writeHead(200, headers);
        res.end();

    }else{
        //enable or disable cors here
     res.header("Access-Control-Allow-Origin",config.allowedCorsOrigin);
     res.header("Access-Control-Allow-Methods","GET,POST,PUT,DELETE,OPTIONS");
     res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept");
     //console.log(res.header)
     //end cors config

     next();
    }
   }//end request ip logger function

   
 module.exports = {
    logIp : requestIpLogger 
 }







