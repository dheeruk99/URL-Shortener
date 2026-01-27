const express = require('express');
const userRoute = express.Router();
const authController = require('../controller/authController')
const  urlController  = require('../controller/urlController');

userRoute.post('/signup',authController.signup);
userRoute.post('/login',authController.login);
userRoute.get('/shorturls',urlController.getAllShortenedUrls);
// userRoute.post('/logout',authController.logout);

module.exports = userRoute;