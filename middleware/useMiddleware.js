const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../model/userModel');
dotenv.config();

function verification (req, res){
    const token = req.cookies.token;
    if(!token){
        return res.json({ message: "No token found"});
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_KEY, async (err, data)=>{
        if (err) {
            return res.json({ message: err.message});
        }else{
            const user = await User.findById(data.id);
            if (user) return res.json({ user: user.username, email: user.email })
            else return res.json({ message: "No user find by that id" })
        }
    })
}

module.exports = verification;