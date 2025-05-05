const restaurantModel = require("../models/restaurantModel");
const bcrypt = require('bcryptjs')

// Register Auth Restaurant
const createRestaurantController = async (req, res) => {
    try {
        const { restaurantName, email, phone, password, address, latitude, longitude, openingHours, pickup, delivery, logoUrl, imageUrl, fssaiNumber, gstNumber, rating, ratingCount } = req.body;

        if (!restaurantName || !email || !password) {
            return res.status(500).send({
                success: false,
                message: 'Restaurant Name, Email and Password are required!',
            })
        }

        const existingRestaurant = await restaurantModel.findOne({ email })
        if (existingRestaurant) {
            return res.status(409).send({
                success: false,
                message: "Restaurant already exists!",
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassord = await bcrypt.hash(password, salt);

        const newRestaurant = await restaurantModel.create({
            restaurantName, email, phone, password: hashedPassord, address, latitude, longitude, openingHours, pickup, delivery, logoUrl, imageUrl, fssaiNumber, gstNumber, rating, ratingCount
        })

        res.status(201).send({
            success: true,
            message: 'New Restaurant created successfully',
            newRestaurant
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error creating restaurant API',
            error
        })
    }
}

const getAllRestaurantsController = async (req, res) => {
    try {
        const allRestaurants = await restaurantModel.find({})
        if (!allRestaurants) {
            res.status(404).send({
                success: false,
                message: 'Restaurant not found!',
            })
        }
        res.status(200).send({
            success: true,
            totalCount: allRestaurants.length,
            allRestaurants
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error getting all restaurants API',
            error
        })
    }
}
const getRestaurantController = async (req, res) => {
    try {
        const restaurantId = req.params.id
        const restaurant = await restaurantModel.findById(restaurantId)
        if (!restaurantId) {
            res.status(404).send({
                success: false,
                message: "Please provide restaurant id",
            })
        }
        if (!restaurant) {
            res.status(404).send({
                success: false,
                message: "No restaurant found!",
            })
        }
        res.status(200).send({
            success: true,
            restaurant
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error getting restaurant API',
            error
        })
    }
}


const deleteRestaurantController = async (req, res) => {
    try {
        const restaurantId = req.params.id
        if (!restaurantId) {
            return res.status(404).send({
                success: false,
                message: 'No Restaurant Found OR Provide Restaurant ID',
            })
        }
        await restaurantModel.findByIdAndDelete(restaurantId)
        res.status(200).send({
            success: true,
            message: 'Restaurant deleted successfully',
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error deleting restaurant API',
            error
        })
    }
}



module.exports = { createRestaurantController, getAllRestaurantsController, getRestaurantController, deleteRestaurantController }