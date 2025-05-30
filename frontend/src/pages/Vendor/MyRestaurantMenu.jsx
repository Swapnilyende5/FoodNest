import React, { useState, useEffect } from "react";
import axiosInstance from "../../../axiosInstance";
import Loader from "../../components/utils/Loader";

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
    const [foodItemsLoading, setFoodItemsLoading] = useState(false);
    const clickedRestaurant = JSON.parse(localStorage.getItem("restaurantMenu"));
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
            console.log("getRestaurantError", errorMsg);
        }
    };

    const getAllFood = async () => {
        try {
            setFoodItemsLoading(true);
            const res = await axiosInstance.get("/food/getall");
            const allShopFoods = res.data.foods;
            const restaurantFoods = allShopFoods.find(
                (item) => item.restaurantId === clickedRestaurant.restaurantId
            );
            setFoodsList(restaurantFoods || []);
            setFoodItemsLoading(false);
        } catch (error) {
            const errorMsg =
                error.response?.data?.message ||
                "Error fetching Foods. Please try again.";
            console.log("getAllFoodError", errorMsg);
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

    const loginRestaurant = foodsList.restaurantId === restaurantProfile._id;

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
            setNewFood({
                title: "",
                description: "",
                price: "",
                imageUrl: "",
                foodTags: "",
                category: "veg",
                isAvailable: true,
                rating: "",
            });
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
            <h2 className="text-center">{foodsList.restaurantName}</h2>
            {loginRestaurant && (
                <form
                    onSubmit={handleAddFood}
                    className="p-4 border rounded bg-light shadow-sm"
                >
                    <h5 className="mb-3">Add New Food Item</h5>
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
            )}
            <div className="mt-5">
                <h4>Food Items</h4>
                {!foodItemsLoading ? (
                    <div className="row mb-4">
                        {foodsList?.menu?.length ? (
                            foodsList?.menu?.map((food) => {
                                return (
                                    <div className="col-lg-3 col-md-6 mt-3 card-wrapper">
                                        <div className="card position-relative">
                                            {food?.imageUrl?.startsWith("https://") ? (
                                                <img
                                                    src={food.imageUrl}
                                                    style={{ height: "164px" }}
                                                    alt="food-image"
                                                />
                                            ) : (
                                                <img
                                                    src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${food.imageUrl}`}
                                                    style={{ height: "164px" }}
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src =
                                                            "https://png.pngtree.com/png-vector/20191023/ourmid/pngtree-vector-fast-food-icon-png-image_1856930.jpg";
                                                    }}
                                                    alt={food.title}
                                                />
                                            )}
                                            <div className="card-body">
                                                <div className="d-flex justify-content-between">
                                                    <h6 className="card-title fw-semibold w-75">
                                                        {food.title}
                                                    </h6>
                                                    <span>⭐ {food.rating}</span>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                    <p className="card-text">Price: ₹{food.price}</p>
                                                    <small className="mb-1 text-success">
                                                        {food.isVeg && "Veg"}
                                                    </small>
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
                                                {loginRestaurant && (
                                                    <button
                                                        className="btn btn-danger btn-sm"
                                                        onClick={() => handleDelete(food._id)}
                                                    >
                                                        Delete
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <p>No food items found</p>
                        )}
                    </div>
                ) : (
                    <Loader />
                )}
            </div>
        </div>
    );
};

export default MyRestaurantMenu;
