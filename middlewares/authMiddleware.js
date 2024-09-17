const jwt = require('jsonwebtoken');
const User = require('../Models/User');


exports.isLoggedIn = async (req, res, next) => {
    const token = req.headers.authentication;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if(decoded && User.findOne(decoded.id)){
        next()
    } else {
        res.status(401).json({message: 'Not Authenticated'});
    }


    // let token;

    // if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    //     try {
    //         token = req.headers.authorization.split('=')[1];
    //         const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //         const user = await User.findById(decoded.id).select('-password');
    //         if(user){

    //         } else {
    //             res.status(401).json({message: 'Not Authenticated'})
    //         } 
            
    //     } catch (error) {
    //         res.status(401);
    //         throw new Error('Not Authorized');
    //     }
    // }

    // if(!token){
    //     res.status(401);
    //     throw new Error('No token');
    // }

}


exports.isAdmin = async (req,res, next) => {}