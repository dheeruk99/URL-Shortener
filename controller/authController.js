const {createUser,authenticateUser} = require('../services/authService')
const { z } = require('zod');
const { signupPostRequestBodySchema,loginPostRequestBodySchema } = require('../validations/request.validation')
const { getUserByEmail } = require('../services/authService');
const { createUserToken } = require('../utils/token')

const signup = async function(req,res){

    const validationResult = await signupPostRequestBodySchema.safeParseAsync(req.body);

    if(validationResult.error){
        return res.status(400).json({error:validationResult.error.format()});
    }
    const {firstname, lastname, email, password} = validationResult.data;

    const createUserResponse = await createUser(firstname,lastname,email,password);

    if(createUserResponse.status==='success'){
        return res.status(201).json({message:createUserResponse.message});
    }

    return res.status(409).json({message:createUserResponse.message});
}

const login = async function(req,res){

    const validationResult = await loginPostRequestBodySchema.safeParseAsync(req.body);
    const {email,password} = validationResult.data;
    const existingUser = await getUserByEmail(email);

    if(validationResult.error){
        return res.status(400).json({error:z.treeifyError(validationResult.error)});
    }
    
    if(existingUser.length==0){
        return res.status(400).json({message:`User email not found`});
    }
    const passwordMatch = await authenticateUser(password,existingUser[0].password);
    
    if(passwordMatch){
        const token = await createUserToken({
            id:existingUser[0].id,
            email:existingUser[0].email});
            
        return res.status(200).json(token);
    }
    
    return res.status(400).json({
        error:`Incorrect password`
    })
}

module.exports = {
    login,
    signup
};
