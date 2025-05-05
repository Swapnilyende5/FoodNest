const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const { createFoodController, getAllFoodsController, getFoodController, getFoodByRestaurantController, updateFoodController, deleteFoodController, placeOrderController, orderStatusController } = require('../controllers/foodController');

const router = express.Router();

// Create Food - POST
router.post('/create', createFoodController)

// Get all Food - GET
router.get('/getall', getAllFoodsController)

// Get single food item - GET
router.get('/getfood/:id', getFoodController)

// Get food items by restaurant - GET
router.get('/getbyrestaurant/:id', getFoodByRestaurantController)

// Update food items - PUT
router.put('/updatefood/:id', authMiddleware, updateFoodController)

// Delete food items - DELETE
router.delete('/deletefood/:id', authMiddleware, deleteFoodController)

// Place Order - POST
router.post('/placeorder', authMiddleware, placeOrderController)

// Change Order status - POST
router.post('/orderstatus/:id', authMiddleware, adminMiddleware, orderStatusController)

module.exports = router;