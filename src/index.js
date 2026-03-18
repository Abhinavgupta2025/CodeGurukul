const express = require('express');
const app = express();
require('dotenv').config();
const main = require('./config/db');
const authRouter = require('../src/routes/userauthentication');
const cookieParser = require('cookie-parser');
const redisClient = require('./config/redis');


app.use(express.json());


app.use(cookieParser());


app.use('/user',authRouter);

const initializeConnection = async()=>{
    
    try{
            await Promise.all([main(),redisClient.connect()]);
            console.log("connected to db");
            app.listen(process.env.PORT,()=>{
            console.log("Server Listening at Port Number: " + process.env.PORT)
            })
    }
    catch(err){
            console.log("Error" + err);
    }
}
initializeConnection();

