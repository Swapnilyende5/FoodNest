const userModel = require("../models/userModel");
const restaurantModel = require("../models/restaurantModel");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

// Register
const registerController = async (req, res) => {
    try {
        // check all fields are filled.
        const { userName, email, password, address, phone, answer } = req.body;
        if (!userName || !email || !password || !address || !phone || !answer) {
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
            userName, email, password: hashedPassord, address, phone, answer
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

// Login for User and Restaurant
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(500).send({
                success: false,
                message: "All fields are required!",
            })
        }

        let user = await userModel.findOne({ email });
        let userType = "client";

        if (!user) {
            user = await restaurantModel.findOne({ email });
            userType = "vendor";
        }

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User or Restaurant not found. Please register.",
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        const token = jwt.sign({ id: user._id, userType }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });

        user.password = undefined;
        return res.status(200).json({
            success: true,
            message: `${userType === "client" ? "User" : "Restaurant"} login successful!`,
            token,
            user: {
                id: user._id,
                userType,
                userName: user.userName,
                email: user.email,
            },
        });
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