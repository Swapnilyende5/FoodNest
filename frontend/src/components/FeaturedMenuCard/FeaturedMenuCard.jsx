import { useEffect, useState } from 'react';
import axiosInstance from '../../../axiosInstance';
import ShopCard from '../common/ShopCard';
import './FeaturedMenuCard.scss'
import Loader from '../utils/Loader';

const FeaturedMenu = () => {
    const RestaurantId = localStorage.getItem("RestaurantId");
    const [food, setFood] = useState([])
    const [originalRestaurants, setOriginalRestaurants] = useState([]);
    const [allRestaurantsList, setAllRestaurantsList] = useState([]);
    const [ratingFilter, setRatingFilter] = useState(false)
    const [isCardsLoading, setIsCardsLoading] = useState(false);

    const getRestaurant = async () => {
        try {
            const allRestaurants = await axiosInstance.get('/restaurant/getall');
            setOriginalRestaurants(allRestaurants.data.allRestaurants)
            setAllRestaurantsList(allRestaurants.data.allRestaurants);
        } catch (error) {
            const errorMsg =
                error.response?.data?.message ||
                "Failed getting Restaurant. Please try again.";
            console.log("getRestaurantError", errorMsg);
        }
    };

    const getAllFoodData = async () => {
        try {
            const res = await axiosInstance.get('/food/getall')
            setFood(res.data.foods)
        } catch (error) {
            const errorMsg = error.response?.data?.message || "Login failed. Please try again.";
            console.log("getRestaurantError", errorMsg)
        }
    }
    useEffect(() => {
        const fetchAllData = async () => {
            setIsCardsLoading(true)
            await getRestaurant()
            await getAllFoodData()
            setIsCardsLoading(false)
        }
        fetchAllData();
    }, [])

    const handleClick = (id) => {
        const clickedRestaurant = food.find((item) => item.restaurantId === id)
        localStorage.setItem("restaurantMenu", JSON.stringify(clickedRestaurant));
    }

    const applyFilters = (rating) => {
        let filtered = [...originalRestaurants];
        if (rating) {
            filtered = filtered.filter((item) => item.rating > 4.0);
        }
        setAllRestaurantsList(filtered);
    };

    const filterHighRating = () => {
        const newRatingFilter = !ratingFilter;
        setRatingFilter(newRatingFilter);
        applyFilters(newRatingFilter);
    };

    const allRestaurants = allRestaurantsList.sort((a, b) => {
        return a._id === RestaurantId ? -1 : b._id === RestaurantId ? 1 : 0;
    });

    return (
        <div className='bg-white' id='ordernow'>
            <div className="container py-5">
                <h2 className="mb-3 fw-semibold">Fast & Fresh Online Restaurant Orders</h2>
                <div className="d-flex flex-wrap gap-2 mb-4">
                    <button className={`btn ${ratingFilter ? 'btn-success' : 'btn-outline-secondary'}`} onClick={filterHighRating}>Ratings 4.0+</button>
                    <button disabled className="btn btn-outline-secondary">Pure Veg</button>
                    <button disabled className="btn btn-outline-secondary">Filter</button>
                    <button disabled className="btn btn-outline-secondary">Sort By</button>
                    <button disabled className="btn btn-outline-secondary">Fast Delivery</button>
                    <button disabled className="btn btn-outline-secondary">Offers</button>
                    <button disabled className="btn btn-outline-secondary">Rs. 300–Rs. 600</button>
                    <button disabled className="btn btn-outline-secondary">Less than Rs. 300</button>
                </div>
                {isCardsLoading ? <Loader /> :
                    <div className="row g-4">
                        {allRestaurants.map((item) => {
                            return <ShopCard key={item.id} item={item} RestaurantId={RestaurantId} handleClick={handleClick} />
                        })}
                    </div>}
            </div>
        </div>
    );
};

export default FeaturedMenu;
