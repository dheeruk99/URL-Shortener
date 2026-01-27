const {z} = require('zod');


const signupPostRequestBodySchema = z.object({
    firstname:z.string(),
    lastname:z.string().optional(),
    email:z.email(),
    password: z.string().min(3).max(18),
})

const loginPostRequestBodySchema = z.object({
    email:z.email(),
    password: z.string().min(3).max(18),
})

const shortenUrlPostRequestBodySchema = z.object({
    shortCode:z.string({length:50}).optional(),
    targetURL:z.url()
})


module.exports = {
    signupPostRequestBodySchema,
    loginPostRequestBodySchema,
    shortenUrlPostRequestBodySchema
};

