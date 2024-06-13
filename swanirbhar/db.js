const mongoose=require('mongoose')
const dotenv = require('dotenv')
const MongoURL = dotenv.config().parsed.MongoURL
const connection=mongoose.connect(MongoURL)

module.exports=connection