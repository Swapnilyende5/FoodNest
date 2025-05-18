import React, { useEffect, useState } from "react";
import axiosInstance from "../../../axiosInstance";
import Loader from "../../components/utils/Loader";

const CustomerFeedback = () => {
    const [allFeedbacks, setAllFeedbacks] = useState([]);
    const [isFeedbackLoading, setIsFeedbackLoading] = useState(false);

    useEffect(() => {
        const getAllFeedback = async () => {
            try {
                setIsFeedbackLoading(true);
                const RestaurantId = localStorage.getItem("RestaurantId");
                const feedbackRes = await axiosInstance.get("/feedback/getallfeedback");
                const filterByRestaurant = feedbackRes.data.feedbacks.filter(
                    (item) => item.restaurantId === RestaurantId
                );
                setAllFeedbacks(filterByRestaurant);
                setIsFeedbackLoading(false);
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

            {isFeedbackLoading ? <Loader /> :
                allFeedbacks?.length === 0 ? (
                    <div className="alert alert-info">No customer feedback available.</div>
                ) : (
                    <div className="row">
                        {allFeedbacks.map((feedback, index) => (
                            <div className="col-lg-4 col-md-6 mb-4" key={index}>
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
                    </div>
                )}
        </div>
    );
};

export default CustomerFeedback;
