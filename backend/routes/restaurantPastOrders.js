const express = require("express");
const { getRestaurantPastOrders, createRestaurantPastOrders } = require("../controllers/restaurantPastOrdersController");

const router = express.Router();

router.post("/create", createRestaurantPastOrders)

router.get("/getAll", getRestaurantPastOrders)

module.exports = router;