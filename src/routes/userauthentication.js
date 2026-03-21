const express = require('express');

const  authRouter = express.Router();

const {register,login,logout,adminRegister} = require('../Controllers/userAuthentication');

const userMiddleware = require('../middleware/userMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

authRouter.post('/register',register);
authRouter.post('/register/admin',adminMiddleware,adminRegister);
authRouter.post('/login',login);
authRouter.post('/logout',userMiddleware,logout);
// authRouter.post('/forgotPassword',forgotPassword);
// authRouter.get('/getProfile',getProfile);
module.exports = authRouter;

 