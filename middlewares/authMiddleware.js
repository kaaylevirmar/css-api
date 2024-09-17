const jwt = require('jsonwebtoken');
const User = require('../Models/User');


exports.isLoggedIn = async (req, res, next) => {
    try {
        
        const token = req.headers.authorization;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(decoded && User.findOne(decoded.id)){
            next()
        } else {
            res.status(401).json({message: 'Not Authenticated'});
        }
    } catch (error) {
        console.log(error);
    }
}

exports.adminRoute = async(req,res, next) => {
    try {
        const token = req.headers.authentication;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { role } = await User.findById(decoded.id);
        if(decoded && role === "admin"){
            next();
        }
    } catch (error) {
        console.log(error);
    }
}


exports.isAdmin = async (req,res, next) => {}