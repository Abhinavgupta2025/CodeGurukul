const express = require('express');

const  authRouter = express.Router();

const {register,login,logout} = require('../Controllers/userAuthentication');

const userMiddleware = require('../middleware/userMiddleware');

authRouter.post('/register',register);
authRouter.post('/login',login);
authRouter.post('/logout',userMiddleware,logout);
// authRouter.post('/forgotPassword',forgotPassword);
// authRouter.get('/getProfile',getProfile);

module.exports = authRouter;

 