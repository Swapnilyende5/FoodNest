import React, { useContext, useEffect, useState } from "react";
import axiosInstance from "../../../axiosInstance";
import { RestaurantContext } from "../../context/restaurantContext";
import Loader from "../../components/utils/Loader";

const PastOrders = () => {
    const { addedItem, subTotal } = useContext(RestaurantContext);
    const [resPastOrders, setResPastOrders] = useState();
    const [isPastOrdersLoading, setIsPastOrdersLoading] = useState(false);
    const RestaurantId = localStorage.getItem("RestaurantId");

    useEffect(() => {
        const getPastOrders = async () => {
            try {
                setIsPastOrdersLoading(true)
                const restaurantPastOrders = await axiosInstance.get(
                    "/past-orders/getAll"
                );
                setIsPastOrdersLoading(false)
                setResPastOrders(restaurantPastOrders.data.allPastOrders);
            } catch (error) {
                const errorMsg =
                    error.response?.data?.message ||
                    "Failed getting past orders. Please try again.";
                console.log("getPastOrders", errorMsg);
            }
        };
        getPastOrders();
    }, [addedItem, subTotal]);

    const pastOrderByRestaurant = resPastOrders?.flatMap(
        (order) =>
            order.items?.filter((item) => item.restaurantId === RestaurantId) || []
    );
    const total = pastOrderByRestaurant?.reduce((sum, item) => sum + item.price, 0);

    return (
        <div className="container mt-4">
            <h2 className="my-5">Past Orders</h2>
            {pastOrderByRestaurant?.length === 0 ? (
                <div className="alert alert-info">No past orders available.</div>
            ) : (
                isPastOrdersLoading ? <Loader /> :
                    <div className="row">
                        {pastOrderByRestaurant?.map((order) => (
                            <div className="col-md-6 mb-4" key={order?.cartItemId}>
                                <div className="d-flex p-3 shadow-sm">
                                    <div className="me-3">
                                        <img src={order?.imageUrl} width="100px" alt="" />
                                    </div>
                                    <div>
                                        <p>
                                            <strong>Title:</strong> {order?.title}
                                        </p>
                                        <p>
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
                        <h4 className="text-end mb-5">Subtotal: ₹{total}</h4>
                    </div>
            )}
        </div>
    );
};

export default PastOrders;
