import React, { useContext, useEffect, useState } from "react";
import axiosInstance from "../../../axiosInstance";
import { RestaurantContext } from "../../context/restaurantContext";

const PastOrders = () => {
    const { addedItem, subTotal } = useContext(RestaurantContext);
    const [resPastOrders, setResPastOrders] = useState();
    const RestaurantId = localStorage.getItem("RestaurantId");

    useEffect(() => {
        const getUser = async () => {
            try {
                const restaurantPastOrders = await axiosInstance.get(
                    "/past-orders/getAll"
                );
                console.log(
                    "restaurantPastOrdersResponse",
                    restaurantPastOrders.data.allPastOrders
                );
                setResPastOrders(restaurantPastOrders.data.allPastOrders);
            } catch (error) {
                const errorMsg =
                    error.response?.data?.message ||
                    "Failed getting user. Please try again.";
                console.log("getUserError", errorMsg);
            }
        };
        getUser();
    }, [addedItem, subTotal]);

    const pastOrderByRestaurant = resPastOrders?.flatMap(
        (order) =>
            order.items?.filter((item) => item.restaurantId === RestaurantId) || []
    );

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Past Orders</h2>

            {pastOrderByRestaurant?.length === 0 ? (
                <div className="alert alert-info">No past orders available.</div>
            ) : (
                <div className="row">
                    {pastOrderByRestaurant?.map((order) => (
                        <div className="col-md-6 mb-4" key={order?.cartItemId}>
                            <div className="d-flex p-3 shadow-sm">
                                <div className="me-3">
                                    <img src={order?.imageUrl} width="100px" alt="" />
                                </div>
                                <div>
                                    <p className="m-0">
                                        <strong>Title:</strong> {order?.title}
                                    </p>
                                    <p className="m-0">
                                        <strong>Description:</strong> {order?.description}
                                    </p>
                                    <p className="m-0">
                                        <strong>Price:</strong> ₹{order?.price}
                                    </p>
                                    <p className="m-0">
                                        <strong>Date:</strong>{" "}
                                        {new Date(resPastOrders[0].orderedAt).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PastOrders;
