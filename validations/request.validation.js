const {z, email} = require('zod');

const signupPostRequestBodySchema = z.object({
    firstname:z.string(),
    lastname:z.string().optional(),
    email:z.email(),
    password: z.string().min(3).max(18),
})

module.exports = signupPostRequestBodySchema;