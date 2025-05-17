const mongoose = require("mongoose");

const recentOrderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    orders: [
        {
            orderId: Number,
            items: [
                {
                    title: String,
                    description: String,
                    price: Number,
                    imageUrl: String,
                    foodTags: String,
                    category: String,
                    isAvailable: Boolean,
                    isVeg: Boolean,
                    rating: Number,
                    restaurantId: String,
                    foodId: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "Food",
                    },
                    cartItemId: Number,
                }
            ],
            total: Number,
            date: String
        }
    ],
}, { timestamps: true });

module.exports = mongoose.model("RecentOrder", recentOrderSchema);
