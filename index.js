const express = require('express');
const userRouter = require('./routes/userRoutes');
const {authMiddleware} = require('./middleware/authMiddleware');
const urlRouter = require('./routes/urlRoutes');
require('dotenv/config');

const app = express();
const Port = process.env.PORT

app.use(express.json());
app.use(authMiddleware)


app.use('/user',userRouter);
app.use('/',urlRouter)

app.listen(Port,()=>{
    console.log(`Server is up and running on Port${Port}`)
})
