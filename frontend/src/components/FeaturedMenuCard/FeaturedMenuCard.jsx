import { useEffect, useState } from 'react';
import axiosInstance from '../../../axiosInstance';
import ShopCard from '../common/ShopCard';
import './FeaturedMenuCard.scss'

const FeaturedMenu = () => {
    const [food, setFood] = useState([])
    const [allRestaurantsList, setAllRestaurantsList] = useState([]);
    const [isVegFilter, setIsVegFilter] = useState('')
    const [ratingFilter, setRatingFilter] = useState(false)

    const getRestaurant = async () => {
        try {
            const allRestaurants = await axiosInstance.get('/restaurant/getall');
            setAllRestaurantsList(allRestaurants.data.allRestaurants);
            console.log("allRESS", allRestaurants.data.allRestaurants)
        } catch (error) {
            const errorMsg =
                error.response?.data?.message ||
                "Failed getting Restaurant. Please try again.";
            console.log("errorMsg", errorMsg);
        }
    };

    const getAllFoodData = async () => {
        try {
            const res = await axiosInstance.get('/food/getall')
            setFood(res.data.foods)
        } catch (error) {
            const errorMsg = error.response?.data?.message || "Login failed. Please try again.";
            console.log("errorMsg", errorMsg)
        }
    }
    useEffect(() => {
        const fetchAllData = async () => {
            await getRestaurant()
            await getAllFoodData()
        }
        fetchAllData();
    }, [])

    const handleClick = (id) => {
        const clickedRestaurant = food.find((item) => item.restaurantId === id)
        localStorage.setItem("restaurantMenu", JSON.stringify(clickedRestaurant));
    }

    const applyFilters = (veg, rating) => {
        let filtered = [...allRestaurantsList];
        if (veg) {
            filtered = filtered.filter((item) => item.isVeg === 'Yes');
        }
        if (rating) {
            filtered = filtered.filter((item) => item.rating > 4.0);
        }
        setAllRestaurantsList(filtered);
    };

    const filterIsVeg = () => {
        const newVegFilter = !isVegFilter;
        setIsVegFilter(newVegFilter);
        applyFilters(newVegFilter, ratingFilter);
    };

    const filterHighRating = () => {
        const newRatingFilter = !ratingFilter;
        setRatingFilter(newRatingFilter);
        applyFilters(isVegFilter, newRatingFilter);
    };

    return (
        <div className='bg-white' id='ordernow'>
            <div className="container py-5">
                <h2 className="mb-3 fw-semibold">Fast & Fresh Online Restaurant Orders</h2>
                <div className="d-flex flex-wrap gap-2 mb-4">
                    <button className={`btn ${ratingFilter ? 'btn-success' : 'btn-outline-secondary'}`} onClick={filterHighRating}>Ratings 4.0+</button>

                    <button className={`btn ${isVegFilter ? 'btn-success' : 'btn-outline-secondary'}`} onClick={filterIsVeg}>Pure Veg</button>
                    <button disabled className="btn btn-outline-secondary">Filter</button>
                    <button disabled className="btn btn-outline-secondary">Sort By</button>
                    <button disabled className="btn btn-outline-secondary">Fast Delivery</button>
                    <button disabled className="btn btn-outline-secondary">Offers</button>
                    <button disabled className="btn btn-outline-secondary">Rs. 300–Rs. 600</button>
                    <button disabled className="btn btn-outline-secondary">Less than Rs. 300</button>
                </div>
                <div className="row g-4">
                    {allRestaurantsList.map((item) => {
                        return <ShopCard key={item.id} item={item} handleClick={handleClick} />
                    })}
                </div>
            </div>
        </div>
    );
};

export default FeaturedMenu;
