const User = require("../model/userModel");
const bcrypt = require('bcrypt');
const createToken = require('../utils/secretToken');

// get alluser data from the database
async function getUsers(req, res){
    const users = await User.find();
    res.send(users);
};

// create user function
async function createUser(req, res){
    try {
        // hash the password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = {username: req.body.username, email: req.body.email, password: hashedPassword, createdAt: Date.now()};
        const createdUser = await User.create(user);
        const token = createToken(user.username);
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: false,
            secure: true
        });
        res.json({ message: "User created successfully"});
        // next();
    } catch (error) {
        res.json(error.message);
    }
}

// login the user function
async function loginUser(req, res){
    const user = await User.findOne({ username: req.body.username });
    try {
        if(await bcrypt.compare(req.body.password, user.password)){
            const token = createToken(user._id);
            res.cookie("token", token, {
                withCredentials: true,
                httpOnly: false,
                secure: true
            })
            // res.json({ message: "Login successfully"});
            res.redirect("home.html");
        }else{
            res.json({ message: "Not allowed" });
        }
    } catch (error) {
        res.json({ message: "Something went wrong Please try again" });
    }
}

// delete user data
async function deleteUser(req, res){
    const id = req.params.id;
    if (!id){
        return res.json({ message: "No ID FOUND"});
    }
    try{
        const user =  await User.findByIdAndDelete(id);
        res.json({ message: `${id} delete from the database`});
    } catch (error){
        res.json(error.message);
    }
}

// update user details
async function updateUser(req, res){
    const id = req.params.id;
    if(!id){
        return res.json({ message: "No ID FOUND"});
    }
    try {
        const user = await User.findByIdAndUpdate(id, req.body);
        res.json({ message: `${id} is updated Successfully`});
    } catch (error) {
        req.json(error.message);
    }
}

module.exports = {getUsers, createUser, loginUser, deleteUser, updateUser};