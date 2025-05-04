const express = require('express');
const { recentOrder, getRecentOrders } = require('../controllers/recentOrdersController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/recentOrder', authMiddleware, recentOrder);

router.get('/getRecentOrders', getRecentOrders);

module.exports = router;
