const foodModel = require("../models/foodModel");
const orderModel = require("../models/orderModel");

const createFoodController = async (req, res) => {
    try {
        const {
            title,
            description,
            price,
            imageUrl,
            foodTags,
            category,
            code,
            isAvailable,
            restaurant,
            rating, ratingCount
        } = req.body;

        if (!title || !description || !price || !restaurant) {
            return res.status(500).send({
                success: false,
                message: "Please Provide required fields",
            });
        }
        const newFood = new foodModel({
            title,
            description,
            price,
            imageUrl,
            foodTags,
            category,
            code,
            isAvailable,
            restaurant,
            rating, ratingCount
        })
        await newFood.save();
        res.status(201).send({
            success: true,
            message: "New Food Item Created",
            newFood,
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error creating food API',
            error
        })
    }
}

const getAllFoodsController = async (req, res) => {
    try {
        const foods = await foodModel.find({})
        if (!foods) {
            return res.status(404).send({
                success: false,
                message: "No food items was found",
            });
        }
        res.status(201).send({
            success: true,
            totalFoods: foods.length,
            foods,
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error getting all food API',
            error
        })
    }
}

const getFoodController = async (req, res) => {
    try {
        const foodId = req.params.id;
        if (!foodId) {
            return res.status(404).send({
                success: false,
                message: "Please provide food id",
            });
        }
        const food = await foodModel.findById(foodId)
        if (!food) {
            return res.status(404).send({
                success: false,
                message: "No food item found with this food ID",
            });
        }
        res.status(200).send({
            success: true,
            food
        });

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error getting food item API',
            error
        })
    }
}

// GET food by restaurant
const getFoodByRestaurantController = async (req, res) => {
    try {
        const restaurantId = req.params.id;
        if (!restaurantId) {
            return res.status(404).send({
                success: false,
                message: "Please provide restaurant id",
            });
        }
        const food = await foodModel.find({ restaurant: restaurantId })
        if (!food) {
            return res.status(404).send({
                success: false,
                message: "No food item found with this food ID",
            });
        }
        res.status(200).send({
            success: true,
            message: "Food based on restaurant",
            food
        });

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error getting food item API',
            error
        })
    }
}

// Update Food Item
const updateFoodController = async (req, res) => {
    try {
        const foodID = req.params.id;
        if (!foodID) {
            return res.status(404).send({
                success: false,
                message: "no food id was found",
            });
        }
        const food = await foodModel.findById(foodID);
        if (!food) {
            return res.status(404).send({
                success: false,
                message: "No Food Found",
            });
        }
        const {
            title,
            description,
            price,
            imageUrl,
            foodTags,
            category,
            code,
            isAvailable,
            restaurant,
            rating, ratingCount
        } = req.body;
        await foodModel.findByIdAndUpdate(
            foodID,
            {
                title,
                description,
                price,
                imageUrl,
                foodTags,
                category,
                code,
                isAvailable,
                restaurant,
                rating, ratingCount
            },
            { new: true }
        );
        res.status(200).send({
            success: true,
            message: "Food Item Was Updated",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error updating food API",
            error,
        });
    }
};

const deleteFoodController = async (req, res) => {
    try {
        const foodId = req.params.id;
        if (!foodId) {
            return res.status(404).send({
                success: false,
                message: "provide food id",
            });
        }
        const food = await foodModel.findById(foodId);
        if (!food) {
            return res.status(404).send({
                success: false,
                message: "No Food Found with id",
            });
        }
        await foodModel.findByIdAndDelete(foodId);
        res.status(200).send({
            success: true,
            message: "Food Item Dleeted ",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error deleting food API",
            error,
        });
    }
}

const placeOrderController = async (req, res) => {
    try {
        const { cart } = req.body;
        if (!cart) {
            return res.status(500).send({
                success: false,
                message: "please food cart or payemnt method",
            });
        }
        let total = 0;
        cart.map((i) => {
            total += i.price;
        });

        const newOrder = new orderModel({
            foods: cart,
            payment: total,
            buyer: req.userId,
        });

        await newOrder.save();
        res.status(201).send({
            success: true,
            message: "Order Placed successfully",
            newOrder,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Erorr In Place Order API",
            error,
        });
    }
}

const orderStatusController = async (req, res) => {
    try {
        const orderId = req.params.id;
        if (!orderId) {
            return res.status(404).send({
                success: false,
                message: "Please Provide valid order id",
            });
        }
        const { status } = req.body;
        const order = await orderModel.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        );
        res.status(200).send({
            success: true,
            message: "Order Status Updated",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error In Order Status API",
            error,
        });
    }
};

module.exports = { createFoodController, getAllFoodsController, getFoodController, getFoodByRestaurantController, updateFoodController, deleteFoodController, placeOrderController, orderStatusController }