


//importing mongoose
const mongoose = require("mongoose");

//connect database
mongoose.connect("mongodb+srv://AswathyKiran:Pulser90@cluster0.aq7mdxr.mongodb.net/?retryWrites=true&w=majority");

//schema
const Schema = mongoose.Schema;

var courseSchema = new Schema({
    cname : String,
    cDesc : String,
    cDuration : Number,
    cStartdate : Date
})

var CourseInfo = mongoose.model("courses" ,courseSchema)

module.exports = CourseInfo;