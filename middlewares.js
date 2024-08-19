const { userSchemaValidation } = require('./validation');
const User = require('./Models/User')

module.exports.validateUser = async (req,res,next) =>{
    const { email, username } = req.body;
    const { error } = userSchemaValidation.validate(req.body, { abortEarly: false });
    const userExisting = await User.find({ $or: [{email: email},{username: username}]});
    const errors = [];

    
    if (userExisting.length > 0 || error) {

        if (userExisting.some(user => user.email === email)) {
            errors.push({ message: 'Email already exists', path: ['email'], type: 'duplicate', context: { key: 'email', value: email } });
        }

        if (userExisting.some(user => user.username === username)) {
            errors.push({ message: 'Username already exists', path: ['username'], type: 'duplicate', context: { key: 'username', value: username } });
        }

        if (error) {
            errors.push(...error.details);
        }
        console.log(errors);
        return res.status(400).json({ errors });
    }
    next();
}