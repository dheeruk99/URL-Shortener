const express = require('express');
const userRoutes = require('./routes/userRoutes');
const authMiddleware = require('./middleware/authMiddleware')
require('dotenv/config');

const app = express();
const Port = process.env.PORT

app.use(express.json());
app.use(authMiddleware)

app.use('/',userRoutes);

app.listen(Port,()=>{
    console.log(`Server is up and running on Port${Port}`)
})
