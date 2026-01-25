const express = require('express');
const userRoutes = require('./routes/userRoutes');
require('dotenv/config');

const app = express();
const Port = process.env.PORT

app.use(express.json());

app.use('/',userRoutes);

app.listen(Port,()=>{
    console.log(`Server is up and running on Port${Port}`)
})
