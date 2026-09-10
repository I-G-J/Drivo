const dotenv=require('dotenv')
dotenv.config();
const express=require('express');
const app=express();
// app.use(cors());
app.get("/",(req,res)=>{
    res.send("server Running")

})
module.exports=app