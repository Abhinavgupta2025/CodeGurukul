
const { json } = require("express");
const jwt = require("jsonwebtoken");
const Users = require("../models/users");
const redisClient = require("../config/redis");

const adminMiddleware = async(req,res,next)=>{
        try{
            const {tokesn} = req.cookies;
            if(!token)
                throw new Error("Token is invald");

            const payload = await jwt.verify(token,process.env.JWT_KEY);

            const {_id} = payload;

            if(payload.role!='admin')
                throw new error("invalid token"); 
            
            if(!_id)
                throw new Error("Id Not found");

            const result = await User.findById(_id);

            if(!result)
                throw new Error("User not found");

            const isBlocked = await redisClient.exists(`token: ${token}`);

            if(isBlocked)
                throw new Error("Invalid Token");
            req.result = result;
            next(); 
        }
        catch(err){
              console.log("error" + err);
              return res.status(401).json({error: err.message});
        }
}
module.exports = adminMiddleware;