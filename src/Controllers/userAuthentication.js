const User = require('../models/users');
const validate = require('../utils/validator');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const redisClient = require('../config/redis');

const register = async (req,res)=>{
     try{
        // check or validate the body;
        validate(req.body);

        const{firstName,emailId,password} = req.body;
        req.body.password = await bcrypt.hash(password,10);

         const user = await User.create(req.body);

        const token = jwt.sign({_id:user._id,emailId:emailId},process.env.JWT_KEY,{expiresIn: 60*60}); 

        res.cookie('token',token,{maxAge: 60*60*1000});
        res.status(201).send("User created Succesfully");
     }
     catch(err){
            res.status(400).send("Error" + err);
     }
}


const  login = async(req,res)=>{
         try{
         const {emailId,password} = req.body;
         if(!emailId)
            throw new Error("Invalid Credentials");
         if(!password)
            throw new Error("Invalid Credentials");
         const user = await User.findOne({emailId});
         if(!user)
            throw new Error("Invalid credentials");
         const match = await bcrypt.compare(password,user.password);
         if(!match)
            throw new Error("Invalid credentials");
         const token = jwt.sign({_id:user._id,emailId:emailId},process.env.JWT_KEY,{expiresIn: 60*60}); 

         res.cookie('token',token,{maxAge: 60*60*1000});
         res.status(200).send("Logged in succesffuly");
        }
        
        catch(err){
            res.status(401).send("Error" + err);
        }

}

const logout = async(req,res)=>{
         try{
              const {token} = req.cookies;

              if(!token){
                   throw new Error("No token provided");
              }

              const payload = jwt.decode(token);

              if(!payload || !payload.exp){
                   throw new Error("Invalid token");
              }

              await redisClient.set(`token: ${token}`,'blocked');
              await redisClient.expireAt(`token: ${token}`,payload.exp);
              res.cookie("token",null,{expires:new Date(Date.now())});
              res.send("Logged out Successfully"); 
         }
         catch(err){
               res.status(401).send("Error: " + err); 
         }

}

module.exports = {register,login,logout};