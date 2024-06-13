const express=require('express')
const dotenv = require('dotenv')
const Port = dotenv.config().parsed.PORT
console.log(Port)
const app=express()

const connection=require('./db')
const {userRoute}=require('./Routes/userRoute')
const {courseRoute}=require('./Routes/courseRoute')
const cookieParser=require('cookie-parser');
app.use(express.json())
app.use(cookieParser());
app.use('/user',userRoute)
app.use('/courses',courseRoute)

app.get("/",async(req,res)=>{
    try {
        res.status(200).send({"msg":"welcome To Home Page"})
    } catch (error) {
        res.status(404).send({"error":error})
    }
})

app.listen(Port,async(req,res)=>{
    try {
        console.log(Port)
        await connection
        console.log({"msg":`server is running on ${Port} port`})
    } catch (error) {
        console.log({"msg":error})
    }
})