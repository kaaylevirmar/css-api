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
    const {username,password, email, firstName, lastName} = req.body

    const userData = new User({
        username: username,
        password: password,
        email: email,
        firstName: firstName,
        lastName: lastName
    })

    const data = await  userData.save();

    res.send('added new user');
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
    res.send(`${deletedUser.firstName} has been deleted`);
}