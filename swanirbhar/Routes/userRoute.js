const {userModel}=require('../Models/userModel')
const express=require('express')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const userRoute=express.Router()

const cookieParser=require('cookie-parser');

userRoute.get('/getuser',async (req,res)=>{
    try {
         const data=await userModel.find()
         res.send({"res":data})

    } catch (error) {
        res.send({"error":error})
    }
})
userRoute.post('/register',async (req,res)=>{
    const {Username,Email,Password,Category}=req.body;
    try {
        bcrypt.hash(Password, 5, function(err, hash) {
           if(hash){
            const newuser=new userModel({"Username":Username,"Email":Email,"Password":hash,"Category":Category})
            newuser.save()
             res.send({"res":"new user has been register"})
           }else{
            res.send({"res":err})
           }
        });
    } catch (error) {
        res.send({"error":error}) 
    }
})
userRoute.post('/login',async (req,res)=>{
    const {Email,Password}=req.body;
    
    try {
        const finduser=await userModel.findOne({Email})
        if(finduser){
            bcrypt.compare(Password,finduser.Password, function(err, result) {
                if(result){
                    var token = jwt.sign({ "userid":finduser._id,"Username":finduser.Username},"swanirbhar", {expiresIn:"1h"});
                    res.cookie("token",token)
                    res.cookie("Category",finduser.Category)
                    res.send({"token":token,"res":"login succesfully"})
                   
                }else{
                    res.send({"msg":"invalid password"})
                }
            });
        }else{
            res.send({"res":"email not found"})
        }

         } catch (error) {
        res.send({"error":error})
    }
})


module.exports={userRoute}