
let generate = (err,message,status,data) =>{
   let response={
       err : err,
       message : message,
       status : status,
       data : data
    } 
    return response
}


module.exports={
    generate : generate
}





