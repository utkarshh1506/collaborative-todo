const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.register = async(req , res)=>{
    try {
        const {name, email, password} = req.body
        if(!name || !email || !password){
            return res.status(400).json({
                message: "Name, Email, Password are required"
            })
        }

        const userExists = await User.findOne({email})
        if(userExists){
            return res.status(400).json({
                message: "Email already exists"
            })
        }

        const hashed = await bcrypt.hash(password,10);
        const newUser = await User.create({
            name,
            email,
            password:hashed
        })
        const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET,{expiresIn:'1d'})
        return res.status(200).json({user:{name:newUser.name,email:newUser.email},token})
    } catch (error) {
        return res.status(500).json({
            message:"Registration Failed",
            error:error.message
        })
    }
}

exports.login = async(req , res)=>{
    try {
        const {email,password} = req.body
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message: "User Not Found"})
        }

        const match = await bcrypt.compare(password,user.password)
        if(!match){
            return res.status(400).json({
                message:"Invalid Credentials"
            })
        }

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'1d'})
        return res.json({user:{name:user.name,email:user.email},token})
    } catch (error) {
        return res.status(500).json({ message: "Login failed", error: error.message });
    }
}