import React, { useEffect, useState } from "react";
import axiosInstance from "../../../axiosInstance";

const CustomerFeedback = () => {
    const [allFeedbacks, setAllFeedbacks] = useState([]);

    useEffect(() => {
        const getAllFeedback = async () => {
            try {
                const RestaurantId = localStorage.getItem("RestaurantId");
                const feedbackRes = await axiosInstance.get("/feedback/getallfeedback");
                const filterByRestaurant = feedbackRes.data.feedbacks.filter(
                    (item) => item.restaurantId === RestaurantId
                );
                setAllFeedbacks(filterByRestaurant);
            } catch (error) {
                const errorMsg =
                    error.response?.data?.message ||
                    "Failed Fetching feedbacks. Please try again.";
                console.log("getAllFeedbackError", errorMsg);
            }
        };
        getAllFeedback();
    }, []);

    return (
        <div className="container my-5">
            <h2 className="text-center mb-4">What Our Customers Say</h2>
            {allFeedbacks?.length === 0 ? (
                <div className="alert alert-info">No customer feedback available.</div>
            ) : (
                <div className="row">
                    {allFeedbacks.map((feedback, index) => (
                        <div className="col-md-4 mb-4" key={index}>
                            <div className="card shadow-sm h-100">
                                <div className="card-body">
                                    <div className="d-flex mb-2 align-items-center justify-content-between">
                                        <h4 className="card-title">{feedback.username}</h4>
                                        <h6 className="card-subtitle text-muted">
                                            {feedback.date.slice(0, 10)}
                                        </h6>
                                    </div>
                                    <p className="card-text">"{feedback.comment}"</p>
                                    <div className="text-warning">
                                        {"★".repeat(feedback.rating)}
                                        {"☆".repeat(5 - feedback.rating)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>)}
        </div>
    );
};

export default CustomerFeedback;
