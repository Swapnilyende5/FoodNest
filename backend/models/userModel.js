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
    profile: {
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIf4R5qPKHPNMyAqV-FjS_OTBB8pfUV29Phg&s"
    },
    answer: {
        type: String,
        required: [true, 'Answer is required']
    }
}, { timestamps: true })

module.exports = mongoose.model("User", userSchema)