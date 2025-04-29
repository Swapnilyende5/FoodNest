const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'username is required']
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'password is required'],
    },
    address: {
        type: Array
    },
    phone: {
        type: String,
        required: [true, 'phone is required'],
    },
    usertype: {
        type: String,
        required: [true, 'user type is required'],
        default: 'client',
        enum: ['client', 'admin', 'vendor', 'driver']
    },
    profile: {
        type: String,
        default: "https://www.shutterstock.com/image-vector/vector-icon-join-600nw-1171530520.jpg"
    },
    answer: {
        type: String,
        required: [true, 'Answer is required']
    }
}, { timestamps: true })

module.exports = mongoose.model("User", userSchema)