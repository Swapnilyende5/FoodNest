const restaurantModel = require("../models/restaurantModel");

const createRestaurantController = async (req, res) => {
    try {
        const { title, imageUrl, foods, time, pickup, delivery, isOpen, logoUrl, rating, ratingCount, code, coords } = req.body;

        if (!title || !coords) {
            return res.status(500).send({
                success: false,
                message: 'Title and Cords are required!',
            })
        }
        const newRestaurant = new restaurantModel({
            title, imageUrl, foods, time, pickup, delivery, isOpen, logoUrl, rating, ratingCount, code, coords
        })
        await newRestaurant.save()
        res.status(201).send({
            success: true,
            message: 'New Restaurant created successfully',
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



module.exports = { createRestaurantController, getRestaurantController, getAllRestaurantsController, deleteRestaurantController }