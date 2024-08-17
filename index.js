// imports
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./Routes/userRoutes');
const session = require('express-session');
const flash = require('connect-flash');
require('dotenv').config();

app.use(session({
    secret: 'secretKey',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(flash());

app.use(cors({
    origin: `${process.env.APP_URL}`,
    credentials: true
}))

app.use(express.json());

//Routes
app.use(userRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running in ${process.env.PORT}`);
    mongoose.connect('mongodb://mongo:27017/my-app')
        .then((res) => {
            console.log('Connected to mongodb database');
        })
        .catch((e) => {
            console.log(e);
        })
})