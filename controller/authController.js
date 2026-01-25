const {signupUser} = require('../services/authService')
const signupPostRequestBodySchema = require('../validations/request.validation')

const signup = async function(req,res){

    const validationResult = await signupPostRequestBodySchema.safeParseAsync(req.body);

    if(validationResult.error){
        return res.status(400).json({error:validationResult.error.format()});
    }
    const {firstname, lastname, email, password} = validationResult.data;

    const signedUpUser = await signupUser(firstname,lastname,email,password);

    if(signedUpUser.status==='success'){
        return res.status(201).json({message:signedUpUser.message});
    }
    
    return res.status(409).json({message:signedUpUser.message});

}

module.exports = {
    signup
};