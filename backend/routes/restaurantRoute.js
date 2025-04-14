const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { createRestaurantController, getAllRestaurantsController, getRestaurantController, deleteRestaurantController } = require('../controllers/restaurantController');

const router = express.Router();

// Create Restaurant - POST
router.post('/create', authMiddleware, createRestaurantController);

// Get Restaurants - GET
router.get('/getall', getAllRestaurantsController);

// Get single restaurant - GET
router.get('/getrestaurant/:id', getRestaurantController);

// Delete restaurant - DELETE
router.delete('/deleterestaurant/:id', authMiddleware, deleteRestaurantController);

module.exports = router;
