const mongoose=require('mongoose')
const userSchema=mongoose.Schema({
    
    Username:String,
    Email:String,
    Password:String,
    Category:String
},{
    versionKey:false
})

const userModel=mongoose.model("user",userSchema)
module.exports={userModel}