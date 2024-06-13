const jwt=require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const auth1=(req,res,next)=>{
    const token=req.cookies.token
    try {

        jwt.verify(token, 'swanirbhar', function(err, decoded) {
            if(decoded){

                console.log(decoded) 
                next()
            }else{
                res.send({"msg":"session expired login again"})
            }

          });
        
    } catch (error) {
        res.send({"msg":error})
    }
}

module.exports={auth1}