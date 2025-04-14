const userModel = require("../models/userModel");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// Register
const registerController = async (req, res) => {
    try {
        // check all fields are filled.
        const { userName, email, password, address, phone, usertype, answer } = req.body;
        if (!userName || !email || !password || !address || !phone || !usertype || !answer) {
            return res.status(500).send({
                success: false,
                message: "All fields are required!",
            })
        }

        // check existing user
        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.status(409).send({
                success: false,
                message: "User already exists!",
            })
        }

        // hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassord = await bcrypt.hash(password, salt);

        // create new user
        const newUser = await userModel.create({
            userName, email, password: hashedPassord, address, phone, usertype, answer
        })
        res.status(201).send({
            success: true,
            message: "User registered successfully!",
            newUser
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in register API",
            error
        })
    }
};

// Login
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(500).send({
                success: false,
                message: "All fields are required!",
            })
        }
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(401).send({
                success: false,
                message: "User not found, Please create an account",
                user
            })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(500).send({
                success: false,
                message: "Invalid credentials",
            })
        }

        // token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        })
        user.password = undefined
        res.status(201).json({
            token,
            user: {
                id: user._id,
                userType: user.usertype,
                userName: user.userName,
                email: user.email
            },
            success: true,
            message: "User Login successfully!",
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Login API",
            error
        })
    }
}

module.exports = { registerController, loginController };