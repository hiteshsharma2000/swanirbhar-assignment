const express=require('express')
const {auth1}=require('../middleware/auth1')
const {auth2}=require('../middleware/auth2')
const {courseModel}=require("../Models/courseModel")

const courseRoute=express.Router()

courseRoute.get("/",auth1,async (req,res)=>{
    try {
        const data=await courseModel.find()
        res.send({"res":data})

   } catch (error) {
       res.send({"error":error})
   }
})
courseRoute.get("/:courseid",auth1,async (req,res)=>{
    const {courseid}=req.params
    try {
        const data=await courseModel.find({_id:courseid})
        res.send({"res":data})

   } catch (error) {
       res.send({"error":error})
   }
})
courseRoute.post("/add",auth1,auth2,async (req,res)=>{
    payload=req.body
    try {
          const newcourse=new courseModel(payload)
          await newcourse.save()
          res.send({"res":"new course has been added"})

   } catch (error) {
       console.log(error)
       res.send({"error":error})
   }
})

courseRoute.put("/update/:courseid",auth1,auth2,async (req,res)=>{
    const {courseid}=req.params
    try {
        const data=await courseModel.findByIdAndUpdate({_id:courseid},req.body)
        res.send({"res":"cousrse has been updated"})

   } catch (error) {
       res.send({"error":error})
   }
})
courseRoute.delete("/delete/:courseid",auth1,auth2,async (req,res)=>{
    const {courseid}=req.params
    try {
        const data=await courseModel.findByIdAndDelete({_id:courseid})
        res.send({"res":"cousrse has been deleted"})

   } catch (error) {
       res.send({"error":error})
   }
})
courseRoute.get("/:courseid/progress",auth1,async (req,res)=>{
    const {courseid}=req.params
    try {
        const data=await courseModel.findOne({_id:courseid})
        console.log(data)
        res.send({"res":data.progress})

   } catch (error) {
       res.send({"error":error})
   }
})
courseRoute.post("/:courseid/progress",auth1,auth2,async (req,res)=>{
    const {courseid}=req.params
    try {
        const data=await courseModel.findByIdAndUpdate({_id:courseid},req.body)
        console.log(data)
        res.send({"res":"progress has been updated"})

   } catch (error) {
       res.send({"error":error})
   }
})
module.exports={courseRoute}