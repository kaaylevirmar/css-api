const { userSchemaValidation } = require('./validation');
const User = require('./Models/User')

module.exports.validateUser = async (req,res,next) =>{
    const { email, username } = req.body;
    const { error } = userSchemaValidation.validate(req.body);
    const userExisting = await User.find({ $or: [{email: email},{username: username}]});

    if (userExisting.length > 0 || error) {

        if (userExisting.some(user => user.email === email) && userExisting.some(user => user.username === username)) {
            return res.status(400).json({ message: 'User already exists' ,type: 'danger' });
        }
        
        if (error) {
            return res.status(400).json({ message: 'Required field must blank! try again' ,type: 'danger' });
        }
    }
    next();
}