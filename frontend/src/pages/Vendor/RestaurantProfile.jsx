import React, { useEffect, useState } from "react";
import axiosInstance from "../../../axiosInstance";
import { Link } from "react-router-dom";

const RestaurantProfile = () => {
    const [restaurantProfile, setRestaurantProfile] = useState({});

    useEffect(() => {
        const getRestaurant = async () => {
            try {
                const RestaurantId = localStorage.getItem("RestaurantId");
                const restaurantResponse = await axiosInstance.get(
                    `/restaurant/getrestaurant/${RestaurantId}`
                );
                setRestaurantProfile(restaurantResponse.data.restaurant);
            } catch (error) {
                const errorMsg =
                    error.response?.data?.message ||
                    "Failed getting Restaurant. Please try again.";
                console.log("errorMsg", errorMsg);
            }
        };
        getRestaurant();
    }, []);
    const {
        restaurantName,
        address,
        openingHours,
        imageUrl,
        logoUrl,
        pickup,
        delivery,
        rating,
        ratingCount,
        fssaiNumber,
        gstNumber,
        latitude,
        longitude,
    } = restaurantProfile || {};
    return (
        <div className="container mt-5">
            <h2 className="mb-4">Restaurant Profile</h2>
            {imageUrl && (
                <div className="mb-4">
                    <img
                        src={imageUrl}
                        alt="Restaurant Cover"
                        className="img-fluid w-100 rounded"
                        style={{ maxHeight: "300px", objectFit: "cover" }}
                    />
                </div>
            )}
            <div className="card p-4">
                {logoUrl && (
                    <div className="mb-3 text-center">
                        <img
                            src={logoUrl}
                            alt="Restaurant Logo"
                            className="img-thumbnail"
                            style={{ width: "120px", height: "120px", objectFit: "contain" }}
                        />
                    </div>
                )}

                <h3 className="text-center">{restaurantName}</h3>
                <p>
                    <strong>Address:</strong>
                    {address}
                </p>
                <p>
                    <strong>Operating Hours:</strong> {openingHours}
                </p>
                <p>
                    <strong>Pickup:</strong> {pickup ? "Yes" : "No"}
                </p>
                <p>
                    <strong>Delivery:</strong> {delivery ? "Yes" : "No"}
                </p>
                <p>
                    <strong>Rating:</strong> {rating} {ratingCount}reviews
                </p>
                <p>
                    <strong>FSSAI:</strong> {fssaiNumber || "N/A"}
                </p>
                <p>
                    <strong>GST:</strong> {gstNumber || "N/A"}
                </p>
                <p>
                    <strong>Latitude:</strong> {latitude}
                </p>
                <p>
                    <strong>Longitude:</strong> {longitude}
                </p>
            </div>
            <div className="card p-4 my-4">
                <Link to='/restaurant/manage-menu' className="btn btn-outline-danger w-50 m-auto" >Add Food</Link>
            </div>
        </div>
    );
};

export default RestaurantProfile;
