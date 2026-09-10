const dotenv=require('dotenv')
dotenv.config();
const express=require('express');
const cors=require('cors')
const connectToDB=require('./db/db')
const app=express();
const userRoutes=require('./routes/userRoutes')

app.use(express.json())
app.use(cors())
connectToDB();
// app.use(cors());
app.get("/",(req,res)=>{
    res.send("server Running")

})
app.use('/users',userRoutes);
module.exports=app