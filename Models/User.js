const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstName: String,
    lastName: String,
})


module.exports = mongoose.model('User',userSchema);
