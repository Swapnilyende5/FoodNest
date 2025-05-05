import React, { useState } from "react";
import axiosInstance from "../../../axiosInstance";
import ToastMessage from "../../components/common/ToastMessage";

const RegisterRestaurant = () => {
    const [formData, setFormData] = useState({
        restaurantName: "",
        email: "",
        phone: "",
        password: "",
        address: "",
        latitude: "",
        longitude: "",
        openingHours: "",
        pickup: true,
        delivery: true,
        logoUrl: "",
        imageUrl: "",
        fssaiNumber: "",
        gstNumber: "",
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const registeredRes = await axiosInstance.post("/restaurant/create", {
                restaurantName: formData.restaurantName,
                email: formData.email,
                phone: formData.phone,
                password: formData.password,
                address: formData.address,
                latitude: formData.latitude,
                longitude: formData.longitude,
                openingHours: formData.openingHours,
                pickup: formData.pickup,
                delivery: formData.delivery,
                logoUrl: formData.logoUrl,
                imageUrl: formData.imageUrl,
                fssaiNumber: formData.fssaiNumber,
                gstNumber: formData.gstNumber,
                rating: formData.rating,
                ratingCount: formData.ratingCount,
            });
            localStorage.setItem("RestaurantId", registeredRes.data.newRestaurant._id)

            await axiosInstance.post("/food/create", {
                restaurantName: formData.restaurantName,
                restaurantId: registeredRes.data.newRestaurant._id,
                menu: []
            })
        } catch (error) {
            const errorMsg =
                error.response?.data?.message ||
                "Restaurant registration failed. Please try again.";
            console.log(errorMsg);
        }
        setFormData({
            restaurantName: "",
            email: "",
            phone: "",
            password: "",
            address: "",
            latitude: "",
            longitude: "",
            openingHours: "",
            pickup: true,
            delivery: true,
            logoUrl: "",
            imageUrl: "",
            fssaiNumber: "",
            gstNumber: "",
        });
        const toast = document.getElementById("toast");
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 3000);
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Register Your Restaurant</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Restaurant Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="restaurantName"
                        value={formData.restaurantName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Phone Number</label>
                    <input
                        type="tel"
                        className="form-control"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Full Address</label>
                    <textarea
                        className="form-control"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>

                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Latitude</label>
                        <input
                            type="number"
                            step="any"
                            className="form-control"
                            name="latitude"
                            value={formData.latitude}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Longitude</label>
                        <input
                            type="number"
                            step="any"
                            className="form-control"
                            name="longitude"
                            value={formData.longitude}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="mb-3">
                    <label className="form-label">Opening Hours (e.g. 9AM - 11PM)</label>
                    <input
                        type="text"
                        className="form-control"
                        name="openingHours"
                        value={formData.openingHours}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-check form-switch mb-3">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        name="pickup"
                        checked={formData.pickup}
                        onChange={handleChange}
                    />
                    <label className="form-check-label">Pickup Available</label>
                </div>

                <div className="form-check form-switch mb-3">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        name="delivery"
                        checked={formData.delivery}
                        onChange={handleChange}
                    />
                    <label className="form-check-label">Delivery Available</label>
                </div>

                <div className="mb-3">
                    <label className="form-label">Logo URL</label>
                    <input
                        type="text"
                        className="form-control"
                        name="logoUrl"
                        value={formData.logoUrl}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Cover Image URL</label>
                    <input
                        type="text"
                        className="form-control"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">FSSAI License Number</label>
                    <input
                        type="text"
                        className="form-control"
                        name="fssaiNumber"
                        value={formData.fssaiNumber}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">GST Number</label>
                    <input
                        type="text"
                        className="form-control"
                        name="gstNumber"
                        value={formData.gstNumber}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                    Register Restaurant
                </button>
                <ToastMessage message="Restaurant registered successfully!" />
            </form>
        </div>
    );
};

export default RegisterRestaurant;
