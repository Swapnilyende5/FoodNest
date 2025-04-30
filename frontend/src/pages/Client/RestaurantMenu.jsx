import React, { useContext, useEffect, useState } from 'react';
import { RestaurantContext } from '../../context/restaurantContext';
import "./RestaurantMenu.scss"
import ToastMessage from '../../components/common/ToastMessage';

const RestaurantMenu = () => {
    const { selectedRes, setSelectedRes, addToCart } = useContext(RestaurantContext)
    const [filterFood, setFilterFood] = useState('')
    const [foodList, setFoodList] = useState(selectedRes?.menu || [])

    useEffect(() => {
        const storedRestaurant = localStorage.getItem("restaurantMenu");
        if (storedRestaurant) {
            setSelectedRes(JSON.parse(storedRestaurant));
        }
    }, []);

    useEffect(() => {
        if (filterFood === '') {
            setFoodList(selectedRes?.menu)
        } else {
            const filteredFood = selectedRes.menu.filter((v) => {
                return v.title == filterFood
            })
            setFoodList(filteredFood.length > 0 ? filteredFood : selectedRes.menu)
        }
    }, [filterFood, selectedRes.menu])

    return (
        <div className='w-75 m-auto mt-5'>
            <h2 className='mb-4 fw-bold'>{selectedRes.restaurantName}</h2>
            <div className='text-center mb-5'>
                <h6 className='text-muted mb-2'>- Menu -</h6>
                <input className="search-input w-50" onChange={(e) => setFilterFood(e.target.value)} placeholder="Search" />
            </div>
            {foodList?.map((item, index) => {
                const { description, imageId, title, price, } = item || {}
                return <>
                    <div className='d-flex my-4' key={index}>
                        <div className="card-body">
                            <h5 className="card-title mb-1">{title}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">₹{price / 100}</h6>
                            <div className="d-flex align-items-center mb-2">
                                <span className="text-success me-1">★</span>
                                <small className="text-success">4.4 (5)</small>
                            </div>
                            <p className="card-text text-muted mb-2">
                                {description}
                            </p>
                        </div>
                        <div className="col-md-4 text-center position-relative" style={{ height: '144px' }}>
                            <img
                                src={imageId ? `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${imageId}` : '/foodstore-icon.png'}
                                alt="food"
                                className="img-fluid rounded mb-2"
                                style={{ maxHeight: '120px', width: "180px", objectFit: 'cover' }}
                            />
                            <button className="btn btn-success m-auto d-block w-25 position-absolute" style={{ right: '126px', bottom: '5px' }} onClick={() => addToCart(item)}>ADD</button>
                            <ToastMessage message={`"${foodList[0]?.title}" added to the cart`} />
                        </div>
                    </div>
                    <hr className='m-0' />
                </>
            })}
        </div >
    );
};

export default RestaurantMenu;
