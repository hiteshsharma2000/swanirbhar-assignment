const mongoose=require('mongoose')

const courseSchema=mongoose.Schema({
    title:String,
    duration:String,
    description:String
},{
    versionKey:false
})

const courseModel=mongoose.model("course",courseSchema)


module.exports={courseModel}
