const userModel = require("../models/userModel")
const bcrypt = require("bcryptjs")

// GET USER INFO
const getUserController = async (req, res) => {
    try {
        // find user with id in database
        // req.userId coming from client, comparing it with databse id
        const user = await userModel.findById({ _id: req.userId })
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found!"
            })
        }
        // hide password
        user.password = undefined
        res.status(200).send({
            success: true,
            message: "User get successfully",
            user
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Failed fetching user data!"
        })
    }
}

// UPDATE USER
const updateUserController = async (req, res) => {
    try {
        const user = await userModel.findById({ _id: req.userId })
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found!"
            })
        }

        // update data
        const { userName, address, phone } = req.body;
        if (userName) user.userName = userName;
        if (address) user.address = address;
        if (phone) user.phone = phone;

        await user.save();
        res.status(200).send({
            success: true,
            message: "User updated successfully!",
            user
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error updating user!"
        })
    }
}

const updatePasswordController = async (req, res) => {
    try {
        const user = await userModel.findById({ _id: req.userId })
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found!"
            })
        }

        const { oldPassword, newPassword } = req.body;
        if (!oldPassword || !newPassword) {
            return res.status(500).send({
                success: false,
                message: "Please provide old or new password!"
            })
        }
        const isPasswordMatch = await bcrypt.compare(oldPassword, user.password)
        if (!isPasswordMatch) {
            return res.status(500).send({
                success: false,
                message: "Invalid old password!",
            })
        }

        // hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassord = await bcrypt.hash(newPassword, salt);

        // updating password
        user.password = hashedPassord
        await user.save();

        res.status(200).send({
            success: true,
            message: "Password updated successfully!",
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error updating password!",
            error
        })
    }
}

const resetPasswordController = async (req, res) => {
    try {
        const { email, newPassword, answer } = req.body;
        if (!email || !newPassword || !answer) {
            return res.status(500).send({
                success: false,
                message: "Please provide all fields!"
            })
        }

        const user = await userModel.findOne({ email, answer })
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found or Invalid answer!"
            })
        }

        // hashing reset newPassword
        const salt = await bcrypt.genSalt(10);
        const hashedPassord = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassord
        await user.save()
        res.status(200).send({
            success: true,
            message: "Password reset successfully!",
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error reseting password!",
            error
        })
    }
}

const deleteUserController = async (req, res) => {
    try {
        await userModel.findByIdAndDelete(req.params.id);
        return res.status(200).send({
            success: true,
            message: "Your account has been deleted!",
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error deleting user!",
            error
        })
    }
}

module.exports = { getUserController, updateUserController, updatePasswordController, resetPasswordController, deleteUserController };