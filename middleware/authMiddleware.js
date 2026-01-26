/** 
 *@param {import("express").Request} req
 *@param {import("express").nextFunction} res
 *@param {import("express").NextFunction} nextFunction
*/

const {validateUserToken} = require('../utils/token')

function authMiddleware(req,res,next){
    const authHeader = req.headers['authorization'];

    if(!authHeader){
        return next();
    }
    if(!authHeader.startsWith('Bearer ')){
        return res.status(401).json({error:`Authorization header must start with Bearer`})
    }
    const [_,token] = authHeader.split(' ');

    const payload = validateUserToken(token);
    req.user = payload;
    next();
}

module.exports = authMiddleware;
