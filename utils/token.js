const jwt = require('jsonwebtoken');
const tokenvalidation = require('../validations/token.validation');


const JWT_SECRET = process.env.JWT_SECRET;

const createUserToken = async function(payload){
        const validationResult = await tokenvalidation.safeParseAsync(payload);

        if(validationResult.error){
            throw new error(validationResult.error.message);
        }
        const payloadValidatedData = validationResult.data;
        const token = jwt.sign(payloadValidatedData,JWT_SECRET,{expiresIn:'1h'});
        
        return token;
    }

const validateUserToken = async function(token){
        try{
            const payload = jwt.verify(token,JWT_SECRET);
            return payload;
        }catch(error){
            throw error;
        }
}

module.exports = {
    createUserToken,
    validateUserToken
};