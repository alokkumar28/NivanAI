import express from 'express'
import dotenv from 'dotenv'
import connectDb from './config/db.js';

dotenv.config();
const port = process.env.PORT || 8001

const app = express();

app.use(express.json());


app.get("/" ,(req , res)=>{
    res.json({message:"Agent Service is running"})
})

app.listen(port ,()=>{
    console.log(`Agent Service Started at port ${port}`);
    connectDb();
})