const jwt=require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const auth2=(req,res,next)=>{
    const Category=req.cookies.Category
    try {
       if(Category=="teacher" || Category=="Teacher"){
        next()
       }else{
        res.send({"msg":"you don't have the permission"})
       }
        
    } catch (error) {
        res.send({"msg":error})
    }
}

module.exports={auth2}