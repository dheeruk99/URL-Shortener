const express = require('express');
const userRoute = express.Router();
const authController = require('../controller/authController')

userRoute.post('/signup',authController.signup);
userRoute.post('/login',authController.login);

module.exports = userRoute;