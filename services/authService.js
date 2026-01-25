const { eq } = require('drizzle-orm');
const db = require('../db/index')
const {usersTable} = require('../models');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const {signupPostRequestBodySchema} = require('../validations/request.validation')

const signupUser = async function(firstname, lastname, email, password){
    
    const existingUser = await getUserByEmail(email);
    if(existingUser.length==1){
        return {status:"failed",message:`${email} already exists`}
    }
    const hashedPassword = await hashPassword(password);
    try{
        const [user] = await db.insert(usersTable).values({
            firstname,
            lastname,
            email,
            password:hashedPassword
        }).returning({id:usersTable.id})
        
        return {status:`success`,message:` sign up successful`};

    }catch(err){
        throw err;
    }
}

const getUserByEmail = async function(email){

   try{

     const existingUser = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email,email));
   
    return existingUser;

   }catch(err){

        throw err;

   }
}

const hashPassword = async function(plainpassword){
    try{

        const hashedPassword = await bcrypt.hash(plainpassword, saltRounds);
        return hashedPassword;

    }catch(err){

        throw new Error(`Password hashing failed ${err}`);

    }
}

const comparePasswords = async function (plainPassword, hashedPassword) {
  try {

    const match = await bcrypt.compare(plainPassword, hashedPassword);
    return match;

  } catch (error) {

    throw new Error(`Password comparison failed ${err}`);

  }
}


module.exports = {
    signupUser,
    getUserByEmail
}
