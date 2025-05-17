const feedbackModel = require("../models/feedbackModel");

const addFeedbackController = async (req, res) => {
    try {
        const { restaurantId, username, useremail, rating, comment } = req.body;

        if (!restaurantId || !username || !useremail || !rating || !comment) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const feedback = await feedbackModel.create({
            restaurantId,
            username,
            useremail,
            rating,
            comment,
            date: new Date(),
        });

        res.status(201).json({
            success: true,
            message: "Feedback added successfully",
            feedback,
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error creating Feedback API',
            error
        })
    }
}

const getAllFeedbackController = async (req, res) => {
    try {
        const feedbacks = await feedbackModel.find({});
        if (!feedbacks) {
            return res.status(404).send({
                success: false,
                message: "No Feedbacks were found",
            });
        }
        res.status(201).send({
            success: true,
            totalFoods: feedbacks.length,
            feedbacks,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error getting all feedbacks API",
            error,
        });
    }
}

module.exports = { addFeedbackController, getAllFeedbackController }