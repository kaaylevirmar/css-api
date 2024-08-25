const User = require('../Models/User');


exports.allUsers = async (req,res) => {
    const user = await User.find();
    res.json(user);
}

exports.showUser = async (req,res) => {
    const id = req.params.id;
    const user = await User.findById(id);
    res.json(user)
}

exports.createUser = async (req,res) => {
    try{
        const {username,password, email, firstName, lastName, role} = req.body
    
        const userData = new User({
            username: username,
            password: password,
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