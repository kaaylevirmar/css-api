const User = require('../Models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { use } = require('../Routes/userRoutes');


exports.allUsers = async (req,res) => {
    try {
        const {name, role} = req.query;

        let filter = {};

        if (name) {
            const nameRegex = new RegExp(name, 'i');
            filter.$or = [
                { firstName: nameRegex },
                { lastName: nameRegex }
            ];
        }
        if (role) {
            filter.role = role;
        }
        const user = await User.find(filter);
        res.json(user);
        
    } catch (error) {
        res.status(201).json({message:'No data Found!', type: 'danger'});
    }
}

exports.showUser = async (req,res) => {
    const id = req.params.id;
    const user = await User.findById(id).select('-password');
    res.json(user);
}

exports.createUser = async (req,res) => {

    try{
        const {username, password, email, firstName, lastName, role} = req.body
        
        const hashedPassword = await bcrypt.hash(password, 10);

        const userData = new User({
            username: username,
            password: hashedPassword,
            email: email,
            firstName: firstName,
            lastName: lastName,
            role: role
        })
    
        const data = await  userData.save();
    
        res.status(201).json({message:'User created succesfully!', type: 'success'});
        }catch(error){
            console.log(error);
        };
}

exports.userLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username: username });

        if (user && (await bcrypt.compare(password, user.password))) {
            return res.status(200).json({
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,  
                role: user.role,
                token: generateToken(user._id),
                isAuthenticated: true,
                message: 'You have successfully logged in!',
                type: "success"
            });
        } else {
            return res.status(401).json({
                message: 'Invalid credentials',
                type: 'danger'
            });
        }
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Server error',
            type: 'error'
        });
    }
};


exports.updateUser = async (req,res) => {
    const id = req.params.id;
    const {username,password, email, firstName, lastName} = req.body

    const data = {
        username: username,
        password: password,
        email: email,
        firstName: firstName,
        lastName: lastName
    }
    const user = await User.findByIdAndUpdate(id,data,{new:true})

    const updatedUser = await user.save();
    res.send(`${updatedUser._id} has been updated`);
}

exports.deleteUser = async (req,res) => {
    const id = req.params.id
    const deletedUser = await User.findByIdAndDelete(id);
    res.json({ deletedUser });
}


const generateToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
}