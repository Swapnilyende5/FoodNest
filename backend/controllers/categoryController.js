const categoryModel = require("../models/categoryModel");

const createCatController = async (req, res) => {
    try {
        const { title, imageUrl } = req.body;
        if (!title) {
            return res.status(500).send({
                success: false,
                message: 'Please provide all fields',
            })
        }
        const newCategory = new categoryModel({ title, imageUrl })
        await newCategory.save();
        res.status(200).send({
            success: true,
            message: 'Category created',
            newCategory
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error creating Cat API',
            error
        })
    }
}

const getAllCategoriesController = async (req, res) => {
    try {
        const categories = await categoryModel.find({})
        if (!categories) {
            return res.status(404).send({
                success: false,
                message: "Categories not found!"
            })
        }
        res.status(200).send({
            success: false,
            categoriesCount: categories.length,
            categories
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error getting all Categories API',
            error
        })
    }
}

const updateCategoryController = async (req, res) => {
    try {
        const { title, imageUrl } = req.body;
        const { id } = req.params
        const updatedCategory = await categoryModel.findByIdAndUpdate(id, { title, imageUrl }, { new: true })

        if (!updatedCategory) {
            return res.status(404).send({
                success: false,
                message: "Category not found OR please provide category id"
            })
        }

        res.status(200).send({
            success: true,
            message: 'Category updated successfully',
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error updating Category API',
            error
        })
    }
}

const deleteCategoryController = async (req, res) => {
    try {
        const categoryId = req.params.id
        if (!categoryId) {
            return res.status(404).send({
                success: false,
                message: "Category not found OR please provide category id"
            })
        }
        await categoryModel.findByIdAndDelete(categoryId)
        res.status(200).send({
            success: true,
            message: 'Category deleted successfully',
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error deleting Category API',
            error
        })
    }
}

module.exports = { createCatController, getAllCategoriesController, updateCategoryController, deleteCategoryController }