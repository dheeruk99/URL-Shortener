const { z, string, email } = require('zod');

const tokenvalidation = z.object({
    id:string(),
    email:z.email()
});

module.exports = tokenvalidation;