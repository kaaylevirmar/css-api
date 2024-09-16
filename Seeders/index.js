const User = require('../Models/User');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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

        const hashedUsers = await Promise.all(users.map(async (user) => {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(user.password, saltRounds);
            return { ...user, password: hashedPassword }; 
        }));

        await User.insertMany(hashedUsers);
        console.log('New users with hashed passwords added to the database');
        
    } catch (error) {
        console.error('Error during seeding:', error);
    }

}


DBseed().then(()=>{
    mongoose.connection.close();
});





