let response = require('./../libs/responseLib')
let check = require('./../libs/checkLib')


let isAuthenticated = (req,res,next)=>{
if(req.params.authToken || req.query.authToken || req.header('authToken')){
  if(req.params.authToken =='ADMIN' || req.query.authToken=='ADMIN' || req.header('authToken')=='ADMIN'){
     req.user = {fullname:'Admin',userId:'Admin'}
     next();
  }else{
    console.log("Incorrect Authentication Token")
    let apiResponse = response.generate(true,"Incorrect Authentication Token",403,null)
    res.send(apiResponse)
   }
}else{
  console.log("Authentication Token Missing")
  let apiResponse = response.generate(true,"Authentication Token Missing in Request",403,null)
  res.send(apiResponse)
}
}



module.exports = {
  isAuthenticated : isAuthenticated
}

