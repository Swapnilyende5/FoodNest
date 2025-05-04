const recentOrdersModel = require("../models/recentOrdersModel");

const recentOrder = async (req, res) => {
    const { userId, newOrder } = req.body; // newOrder has id, items[], total, date
    try {
        let userRecent = await recentOrdersModel.findOne({ userId });

        if (!userRecent) {
            userRecent = await recentOrdersModel.create({
                userId,
                orders: [newOrder]
            });
        } else {
            userRecent.orders.unshift(newOrder);
            if (userRecent.orders.length > 10) {
                userRecent.orders.pop(); // keep recent 10
            }
            await userRecent.save();
        }

        res.status(200).send({ success: true, message: "Order saved!", userRecent });
    } catch (error) {
        console.error("Failed saving order:", error);
        res.status(500).send({ success: false, message: "Server Error" });
    }
};

const getRecentOrders = async (req, res) => {
    try {
        const recentOrders = await recentOrdersModel.find({});
        if (!recentOrders) {
            return res.status(404).send({
                success: false,
                message: "No recent orders found!",
            });
        }
        res.status(201).send({
            success: true,
            totalOrders: recentOrders.length,
            recentOrders,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error getting recent orders API",
            error,
        });
    }
}

module.exports = { recentOrder, getRecentOrders }