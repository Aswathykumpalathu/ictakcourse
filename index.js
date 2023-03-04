// Basic Server Structure
// 1.Import Express


const express = require("express");
const CourseInfo = require('./model/courseDb');

// 2. Initialising Express
const app = new express();


const path = require('path'); 
app.use(express.static(path.join(__dirname,'/build')));
// parsing body parameter

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// CORS Policy

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type ");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
})
// 3. API Creation
app.get('/',(req,res)=>{
      res.send("Congratulations!!!!!,Server is Up");
})

app.get('/about',(req,res)=>{
    res.send("Hai Aswathy Kiran");
})

app.post('/facebook/signup', (req, res) => {
    res.send(`Hi ${req.body.name}, your account is successfully created`);
})
//create
app.post('/api/create',(req,res)=>
{
    try{
        // console.log('Data Added');
    let course = new CourseInfo(req.body);  // passing data to db
    course.save(); // saving to db
    // console.log(req.body)
    res.send("Data Added")
    }
    catch (error) {
        res.status(500).send(error);
    }
})
//list
app.get('/api/view',async (req,res)=>{
    try{ 
      let result = await CourseInfo.find();
      res.json(result);
    }
    catch (error) {
        res.status(500).send(error);
    }
})

//update

app.post('/api/update',async (req,res)=>{
    try{
    let result = await CourseInfo.findByIdAndUpdate(req.body._id,req.body);
    res.send("Data Updated")
    }
    catch (error) {
        res.status(500).send(error);
    }
})

app.post('/api/delete',async (req,res)=>{
   try{
    let result = await CourseInfo.findByIdAndDelete(req.body._id);
    res.send("Data Deleted");
   }
   catch (error) {
    res.status(500).send(error);
}
})

app.post('/api/search',async (req,res) => {
    try{
        // let result = await CourseInfo.find(req.body);
        let result = await CourseInfo.find({ "c_name": { $regex: '.' + req.body.c_name + '.' } });
        res.json(result);
       }
       catch (error) {
        res.status(500).send(error);
    }
})
app.post('/api/get/',async (req,res) => {
    console.log(req.body)
    try{
    
        let result = await CourseInfo.findById(req.body._id);
        res.json(result);
        console.log(result)
       }
       catch (error) {
        res.status(500).send(error);
    }
})
app.get('/api',(req,res)=> {
    res.json([{
        "name":"mera",
        "place":"TVM"
    },
    {
        "name":"Tiya",
        "place":"TVM" 
    }]
    );
})
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname,'/build/index.html'));
 });
//4. Setting PORT Number
app.listen(5000,()=>
{
    console.log("Server is running in port 5000");
})