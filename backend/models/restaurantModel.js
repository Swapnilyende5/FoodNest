const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
    restaurantName: {
        type: String,
        required: [true, "Restaurant name is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    phone: {
        type: String,
        required: [true, "Phone number is required"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    address: {
        type: String,
        required: [true, "Address is required"],
    },
    latitude: {
        type: Number,
        required: [true, "Latitude is required"],
    },
    longitude: {
        type: Number,
        required: [true, "Longitude is required"],
    },
    openingHours: {
        type: String,
        required: [true, "Opening hours are required"],
    },
    pickup: {
        type: Boolean,
        default: true,
    },
    delivery: {
        type: Boolean,
        default: true,
    },
    logoUrl: {
        type: String,
    },
    imageUrl: {
        type: String,
    },
    fssaiNumber: {
        type: String,
    },
    gstNumber: {
        type: String,
    },
    rating: {
        type: Number,
        default: 1,
        min: 1,
        max: 5,
    },
    ratingCount: {
        type: String,
        default: "0",
    },
}, { timestamps: true });

module.exports = mongoose.model("Restaurant", restaurantSchema);
