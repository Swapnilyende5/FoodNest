const mongoose = require("mongoose");

const restaurantPastOrdersModel = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    items: [{
        title: String,
        description: String,
        price: Number,
        imageUrl: String,
        category: String,
        isVeg: Boolean,
        rating: Number,
        cartItemId: Number,
        restaurantId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Restaurant",
        },
    }],
    totalAmount: Number,
    status: String,
    orderedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("RestaurantPastOrders", restaurantPastOrdersModel);
