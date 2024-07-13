const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRoutes = require('./Routes/userRoutes');
const PORT = 3001;

app.use(express.json());

app.use(userRoutes);



app.listen(PORT,()=>{
    console.log(`Server is running in ${PORT}`);
    mongoose.connect('mongodb://mongo:27017/my-app')
    .then((res)=>{
        console.log('Connected to mongodb database');
    })
    .catch((e)=>{
        console.log(e);
    })
})