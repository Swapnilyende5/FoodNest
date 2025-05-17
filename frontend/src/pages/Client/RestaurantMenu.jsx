import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { RestaurantContext } from '../../context/restaurantContext';
import ToastMessage from '../../components/common/ToastMessage';
import "./RestaurantMenu.scss"

const RestaurantMenu = () => {
    const { selectedRes, setSelectedRes, addToCart, addedItemToast, handleFeedback } = useContext(RestaurantContext)
    const [filterFood, setFilterFood] = useState('')
    const [foodList, setFoodList] = useState(selectedRes?.menu || [])

    useEffect(() => {
        const storedRestaurant = localStorage.getItem("restaurantMenu");
        if (storedRestaurant) {
            setSelectedRes(JSON.parse(storedRestaurant));
        }
    }, [setSelectedRes]);

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
            <div className='mb-4 d-flex justify-content-between'>
                <h2 className='fw-bold m-0'>{selectedRes.restaurantName}</h2>
                <Link className='btn btn-success' to='/feedback' onClick={() => handleFeedback(selectedRes.restaurantId)}>Add Feedback</Link>
            </div>
            <div className='text-center mb-5'>
                <h6 className='text-muted mb-2'>- Menu -</h6>
                <input className="search-input w-50" onChange={(e) => setFilterFood(e.target.value)} placeholder="Search" />
            </div>
            {foodList?.map((item, index) => {
                const { description, imageUrl, title, price, isVeg, rating } = item || {}
                return <>
                    <div className='d-flex my-4' key={index}>
                        <div className="card-body">
                            <div className='d-flex align-items-center'>
                                <h4 className="card-title mb-1 text-capitalize">{title}</h4>
                                {isVeg && <span className="badge bg-success py-1 ms-2">Veg</span>}
                            </div>
                            <h6 className="card-subtitle mb-2 text-muted">₹{price}</h6>
                            <div className="d-flex align-items-center mb-2">
                                <span className="text-success me-1">★</span>
                                <small className="text-success">{rating} (5)</small>
                            </div>
                            <p className="card-text text-muted mb-2 text-capitalize">
                                {description}
                            </p>
                        </div>
                        <div className="col-md-4 text-center position-relative" style={{ height: '144px' }}>
                            <img
                                src={imageUrl && imageUrl}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = imageUrl && `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${imageUrl}`
                                }}
                                alt="food"
                                className="img-fluid rounded mb-2"
                                style={{ maxHeight: '120px', width: "180px", objectFit: 'cover' }}
                            />
                            <button className="btn btn-success m-auto d-block w-25 position-absolute" style={{ right: '126px', bottom: '5px' }} onClick={() => addToCart(item, selectedRes.restaurantId)}>ADD</button>
                            <ToastMessage message={`"${addedItemToast.title}" added to the cart`} />
                        </div>
                    </div>
                    <hr className='m-0' />
                </>
            })}
        </div >
    );
};

export default RestaurantMenu;
