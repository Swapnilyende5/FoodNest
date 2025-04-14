const express = require('express');
const { getUserController, updateUserController, updatePasswordController, resetPasswordController, deleteUserController } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// get user data - GET
router.get('/getuser', authMiddleware, getUserController)

// Update user data - PUT
router.put('/updateuser', authMiddleware, updateUserController)

// Update user password - PUT
router.put('/updatepassword', authMiddleware, updatePasswordController)

// Reset user password - PUT
router.put('/resetpassword', authMiddleware, resetPasswordController)

// Delete User - DELETE
router.delete('/deleteuser/:id', authMiddleware, deleteUserController)

module.exports = router;