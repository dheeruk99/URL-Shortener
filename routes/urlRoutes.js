const express = require('express');
const  urlController  = require('../controller/urlController');
const { isUserAuthenticated } = require('../middleware/authMiddleware');

const urlRouter = express.Router();

urlRouter.post('/',isUserAuthenticated,urlController.shortenUrl)
urlRouter.get('/:url',urlController.redirectUrl)
urlRouter.delete('/:urlId',isUserAuthenticated,urlController.deleteShortenedUrl)


module.exports = urlRouter;

