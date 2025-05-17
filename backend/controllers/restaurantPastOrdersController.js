const restaurantPastOrdersModel = require("../models/restaurantPastOrdersModel");

const createRestaurantPastOrders = async (req, res) => {
    try {
        const { userId, items, totalAmount } = req.body;

        if (!userId || !items || !totalAmount) {
            return res.status(500).send({
                success: false,
                message: 'All fields are required!',
            })
        }
        const newOrder = new restaurantPastOrdersModel({
            userId,
            items,
            totalAmount,
        });

        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (err) {
        res.status(500).json({ message: "Failed to create past order", error: err.message });
    }
};

const getRestaurantPastOrders = async (req, res) => {
    try {
        const allPastOrders = await restaurantPastOrdersModel.find({})
        if (!allPastOrders) {
            res.status(404).send({
                success: false,
                message: 'No past orders found!',
            })
        }
        res.status(200).send({
            success: true,
            totalOrders: allPastOrders.length,
            allPastOrders
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error getting past orders API',
            error
        })
    }
};

module.exports = { createRestaurantPastOrders, getRestaurantPastOrders };