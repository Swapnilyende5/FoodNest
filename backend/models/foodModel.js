const mongoose = require("mongoose")

const foodSchema = new mongoose.Schema({
    restaurantName: String,
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
            imageId: {
                type: String,
                default: "https://png.pngtree.com/png-vector/20220623/ourmid/pngtree-food-logo-png-image_5297921.png"
            },
            foodTags: {
                type: String
            },
            category: {
                type: String,
            },
            code: {
                type: String,
            },
            isAvailable: {
                type: Boolean,
                default: true
            },
            restaurant: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Restaurant'
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