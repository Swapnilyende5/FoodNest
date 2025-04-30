import { useEffect, useState } from 'react';
import axiosInstance from '../../../axiosInstance';
import ShopCard from '../common/ShopCard';
import { restaurants } from '../utils/RestaurantData';
import './FeaturedMenuCard.scss'

const FeaturedMenu = () => {
    const [food, setFood] = useState([])

    useEffect(() => {
        const getAllFoodData = async () => {
            try {
                const res = await axiosInstance.get('/food/getall')
                setFood(res.data.foods)
            } catch (error) {
                const errorMsg = error.response?.data?.message || "Login failed. Please try again.";
                console.log("errorMsg", errorMsg)
            }
        }
        getAllFoodData()
    }, [])

    const handleClick = (title) => {
        const clickedRestaurant = food.find((item) => item.restaurantName === title)
        localStorage.setItem("restaurantMenu", JSON.stringify(clickedRestaurant));
    }

    return (
        <div className='bg-white' id='ordernow'>
            <div className="container py-5">
                <h2 className="mb-3 fw-semibold">Fast & Fresh Online Restaurant Orders</h2>
                <div className="d-flex flex-wrap gap-2 mb-4">
                    <button className="btn btn-outline-secondary">Filter</button>
                    <button className="btn btn-outline-secondary">Sort By</button>
                    <button className="btn btn-outline-secondary">Fast Delivery</button>
                    <button className="btn btn-outline-secondary">Ratings 4.0+</button>
                    <button className="btn btn-outline-secondary">Pure Veg</button>
                    <button className="btn btn-outline-secondary">Offers</button>
                    <button className="btn btn-outline-secondary">Rs. 300–Rs. 600</button>
                    <button className="btn btn-outline-secondary">Less than Rs. 300</button>
                </div>
                <div className="row g-4">
                    {restaurants.map((item) => {
                        return <ShopCard key={item.id} item={item} handleClick={handleClick} />
                    })}
                </div>
            </div>
        </div>
    );
};

export default FeaturedMenu;
