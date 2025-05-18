import React, { useContext, useEffect, useState } from "react";
import axiosInstance from "../../../axiosInstance";
import Loader from "../../components/utils/Loader";
import { RestaurantContext } from "../../context/restaurantContext";

const MyOrders = () => {
    const { userDetails } = useContext(RestaurantContext)
    const [orders, setOrders] = useState([]);
    const [deliveryStatus, setDeliveryStatus] = useState("Preparing");

    useEffect(() => {
        const getRecentOrders = async () => {
            try {
                const res = await axiosInstance.get("/order/getRecentOrders");
                setOrders(res.data.recentOrders);
            } catch (error) {
                const errorMsg =
                    error.response?.data?.message ||
                    "Failed getting user data. Please try again.";
                console.log("getRecentOrdersError", errorMsg);
            }
        };
        getRecentOrders();

    }, []);

    setTimeout(() => {
        setDeliveryStatus("Delivered");
    }, 60000);

    const ordersByCurrentUser = orders.find((item) => item.userId === userDetails._id)

    const recentOrderCard = (item, index) => {
        const { items, orderId, total, date } = item;
        return (
            <div key={orderId} className="card mb-4 shadow-sm">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <div>
                        <strong>Order ID:</strong> #ORDER{orderId} <br />
                        <strong>Placed On:</strong> {date}
                    </div>
                    {index === 0 ? (
                        <span
                            className={`badge ${deliveryStatus === "Delivered" ? "bg-success" : "bg-warning"
                                }`}
                        >
                            {deliveryStatus}
                        </span>
                    ) : (
                        <span className="badge bg-success">Delivered</span>
                    )}
                </div>
                <div className="card-body">
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <ul className="list-group list-group-flush">
                                {items?.map((item) => {
                                    return (
                                        <li
                                            key={item.cartItemId}
                                            className="list-group-item d-flex justify-content-between"
                                        >
                                            <span>{item.title}</span>
                                            <span>{item.price}.00</span>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>

                        <div className="col-md-6">
                            <p className="mb-1">
                                <strong>Delivery To:</strong>
                            </p>
                            <p className="mb-0">{userDetails.userName && userDetails?.userName}</p>
                            <p className="mb-0">{userDetails.address && userDetails?.address[0]}</p>
                            <p className="mb-0">
                                <i className="bi bi-telephone" /> {userDetails.phone && userDetails.phone}
                            </p>
                        </div>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between">
                        <strong>Total Paid:</strong>
                        <strong>₹{total}</strong>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="container my-5">
            <h2 className="mb-4">Recent Orders</h2>
            {!ordersByCurrentUser ? <Loader /> : ordersByCurrentUser?.orders?.map((item, index) => {
                return recentOrderCard(item, index);
            })}
        </div>
    );
};

export default MyOrders;
