const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { createCatController, getAllCategoriesController, updateCategoryController, deleteCategoryController } = require('../controllers/categoryController');

const router = express.Router();

// Create Category - POST
router.post('/create', authMiddleware, createCatController)

// Get all categories - GET
router.get('/getall', authMiddleware, getAllCategoriesController)

// Update category - PUT
router.put('/update/:id', authMiddleware, updateCategoryController)

// Delete category - DELETE
router.delete('/delete/:id', authMiddleware, deleteCategoryController)


module.exports = router;