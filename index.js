const express = require('express');
require('dotenv/config');

const app = express();
const Port = process.env.PORT

app.use('/',(req,res)=>{
    return res.status(200).json({status:`Success`,message:`Server is running`})
})

app.listen(Port,()=>{
    console.log(`Server is up and running on Port${Port}`)
})
