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
    role: {
        type: String,
        required: true,
    },
}, 
{
    timestamps: true,
},);


module.exports = mongoose.model('User',userSchema);
