// imports
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./Routes/userRoutes');
require('dotenv').config();
//tempo
app.use(express.json());
app.use(cors({
    origin: `${process.env.APP_URL}`
}))

//Routes
app.use(userRoutes);    



app.listen(process.env.PORT,()=>{
    console.log(`Server is running in ${process.env.PORT}`);
    mongoose.connect('mongodb://mongo:27017/my-app')
    .then((res)=>{
        console.log('Connected to mongodb database');
    })
    .catch((e)=>{
        console.log(e);
    })
})