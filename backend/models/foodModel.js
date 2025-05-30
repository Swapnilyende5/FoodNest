const mongoose = require("mongoose")

const foodSchema = new mongoose.Schema({
    restaurantName: String,
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant'
    },
    menu: [
        {
            title: {
                type: String,
                required: [true, 'Food title is required'],
                trim: true
            },
            description: {
                type: String,
            },
            price: {
                type: Number,
                required: [true, 'Food Price is required']
            },
            imageUrl: {
                type: String,
                default: "https://png.pngtree.com/png-vector/20191023/ourmid/pngtree-vector-fast-food-icon-png-image_1856930.jpg"
            },
            foodTags: {
                type: String
            },
            category: {
                type: String,
            },
            isVeg: {
                type: Boolean,
                default: true
            },
            isAvailable: {
                type: Boolean,
                default: true
            },
            rating: {
                type: Number,
                default: 5,
                min: 1,
                max: 5
            },
            ratingCount: {
                type: Number,
            }
        }]

}, { timestamps: true })

module.exports = mongoose.model("Foods", foodSchema)