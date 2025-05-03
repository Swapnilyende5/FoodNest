import React, { useState, useEffect } from "react";
import axiosInstance from "../../../axiosInstance";

const MyRestaurantMenu = () => {
    const [restaurantProfile, setRestaurantProfile] = useState({});
    const [newFood, setNewFood] = useState({
        title: "",
        description: "",
        price: "",
        imageUrl: "",
        foodTags: "",
        category: "veg",
        isAvailable: true,
        rating: "",
    });
    const [foodsList, setFoodsList] = useState([]);
    const RestaurantId = localStorage.getItem("RestaurantId");

    const getRestaurant = async () => {
        try {
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

    const getAllFood = async () => {
        try {
            const res = await axiosInstance.get("/food/getall");
            const allFoods = res.data.foods
            const restaurantFoods = allFoods.find(
                (item) => item.restaurantId === RestaurantId
            );
            setFoodsList(restaurantFoods?.menu || []);
        } catch (error) {
            const errorMsg =
                error.response?.data?.message ||
                "Error fetching Foods. Please try again.";
            console.log("errorMsg", errorMsg);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await getRestaurant();
            await getAllFood();
        };
        if (RestaurantId) {
            fetchData();
        }
    }, [RestaurantId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewFood({ ...newFood, [name]: value });
    };

    const handleAddFood = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post("/food/create", {
                restaurantName: restaurantProfile?.restaurantName,
                restaurantId: RestaurantId,
                menu: [newFood],
            });
            setNewFood({ title: "", description: "", price: "", imageUrl: "", foodTags: "", category: "veg", isAvailable: true, rating: "" });
            await getAllFood();
        } catch (err) {
            console.error("Error adding food:", err);
            alert("Failed to add food");
        }
    };

    const handleDelete = async (id) => {
        try {
            await axiosInstance.delete(`/food/deletefood/${id}`);
            await getAllFood();
        } catch (err) {
            console.error("Error deleting food:", err);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Manage & Add Food</h2>

            <form
                onSubmit={handleAddFood}
                className="p-4 border rounded bg-light shadow-sm"
            >
                <h4 className="mb-3">Add New Food Item</h4>
                <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Food Title"
                    name="title"
                    value={newFood.title}
                    onChange={handleChange}
                    required
                />
                <textarea
                    className="form-control mb-3"
                    placeholder="Description"
                    name="description"
                    value={newFood.description}
                    onChange={handleChange}
                ></textarea>
                <input
                    type="number"
                    className="form-control mb-3"
                    placeholder="Price ($)"
                    name="price"
                    value={newFood.price}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Dish Image Url"
                    name="imageUrl"
                    value={newFood.imageUrl}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Tags (comma separated)"
                    name="foodTags"
                    value={newFood.foodTags}
                    onChange={handleChange}
                />
                <select
                    className="form-control mb-3"
                    name="category"
                    value={newFood.category}
                    onChange={handleChange}
                >
                    <option value="veg">Veg</option>
                    <option value="non-veg">Non-Veg</option>
                    <option value="vegan">Vegan</option>
                </select>
                <input
                    type="number"
                    className="form-control mb-3"
                    placeholder="Rating (1-5)"
                    name="rating"
                    step="0.1"
                    value={newFood.rating}
                    onChange={handleChange}
                />
                <div className="form-check form-switch mb-3">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        name="isAvailable"
                        checked={newFood.isAvailable}
                        onChange={(e) =>
                            setNewFood({ ...newFood, isAvailable: e.target.checked })
                        }
                    />
                    <label className="form-check-label">Available</label>
                </div>
                <button type="submit" className="btn btn-primary w-100">
                    Add Food
                </button>
            </form>

            <div className="mt-5">
                <h4>Food Items</h4>
                <div className="row">
                    {foodsList?.length ? (
                        foodsList?.map((food) => {
                            return (
                                <div className="col-md-3 mt-3 card-wrapper">
                                    <div className="card position-relative">
                                        <img
                                            src={food.imageUrl}
                                            style={{ height: "164px" }}
                                            alt="Pizza Hut"
                                        />
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between">
                                                <h6 className="card-title fw-semibold">{food.title}</h6>
                                                <span>⭐ {food.rating}</span>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                                <p className="card-text">Price: ₹{food.price}</p>
                                                <p className="mb-1 text-success">
                                                    {food.isVeg && "VEG"}
                                                </p>
                                            </div>
                                            <div
                                                className="text-muted"
                                                style={{
                                                    whiteSpace: "nowrap",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                }}
                                            >
                                                {food.description}
                                            </div>
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => handleDelete(food._id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p>No food items found</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyRestaurantMenu;
