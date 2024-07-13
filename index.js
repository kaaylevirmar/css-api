const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3001;



app.get('/',(req,res)=>{
        res.send('hello asdsadsad');
})



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