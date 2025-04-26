const mongoose = require('mongoose');
// const foodModel = require('../models/foodModel');
// const foodsItems = require("../data/foodsItems")

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        // await foodModel.deleteMany();
        // await foodModel.insertMany(foodsItems);
        console.log(`connected to database ${mongoose.connection.host}`)
    } catch (error) {
        console.log("Db Error", error)
    }
}

module.exports = connectDb