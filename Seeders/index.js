const User = require('../Models/User');
const mongoose = require('mongoose');
const {users} = require('./data');

mongoose.connect('mongodb://mongo:27017/css-db')
.then((res)=>{
    console.log('Connected to mongodb database');
})
.catch((e)=>{
    console.log(e);
})


const DBseed = async () => {
    try {
        await User.deleteMany({});
        console.log('Old users removed');

        await User.insertMany(users);
        console.log('New users added to the database');
        
    } catch (error) {
        console.error('Error during seeding:', error);
    }

}


DBseed().then(()=>{
    mongoose.connection.close();
});





