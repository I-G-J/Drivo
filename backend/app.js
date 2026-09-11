const dotenv=require('dotenv')
dotenv.config();
const express=require('express');
const cors=require('cors')
const cookieParser=require('cookie-parser')
const connectToDB=require('./db/db')
const captainRoutes=require('./routes/captainRoutes')
const app=express();
const userRoutes=require('./routes/userRoutes')
app.use(cookieParser());
app.use(express.json())
app.use(cors())
connectToDB();
// app.use(cors());
app.get("/",(req,res)=>{
    res.send("server Running")

})
app.use('/captains',captainRoutes);
app.use('/users',userRoutes);
module.exports=app