const response = require('./../libs/responseLib')

let errorHandler = (err,req,res,next) => {
    console.log("application error handler called")
    console.log(err)
    let apiResponse = response.generate(true,'some error occurred at global level',500,null)
    res.send(apiResponse)
}

let notFoundHandler = (req,res,next) => {
    console.log("Global not found handler called")
    let apiResponse = response.generate(true,"route not found in the application",404,null)
    res.status(404).send(apiResponse)
}


module.exports = {
    globalErrorHandler : errorHandler,
    globalNotFoundHandler : notFoundHandler
}