const express = require('express');
const { addFeedbackController, getAllFeedbackController } = require('../controllers/feedbackController');

const router = express.Router();

// Create Category - POST
router.post('/addfeedback', addFeedbackController)

// Create Category - GET
router.get('/getallfeedback', getAllFeedbackController)


module.exports = router;