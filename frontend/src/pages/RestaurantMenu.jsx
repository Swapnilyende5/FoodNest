import React, { useContext, useEffect } from 'react';
import { RestaurantContext } from '../context/restaurantContext';

const RestaurantMenu = () => {
    const { selectedRes, setSelectedRes } = useContext(RestaurantContext)

    useEffect(() => {
        const storedRestaurant = localStorage.getItem("restaurantMenu");
        if (storedRestaurant) {
            setSelectedRes(JSON.parse(storedRestaurant));
        }
    }, []);

    return (
        <div className='w-75 m-auto'>
            {selectedRes?.menu?.map((item) => {
                const { description, _id, imageId, title, price, } = item || {}
                return <>
                    <div className='d-flex my-4' key={_id}>
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
                        <div className="col-md-4 text-center">
                            <img
                                src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${imageId}`}
                                alt="food"
                                className="img-fluid rounded mb-2"
                                style={{ maxHeight: '120px', width: "180px", objectFit: 'cover' }}
                            />
                            <button className="btn btn-success m-auto d-block w-25">ADD</button>
                        </div>
                    </div>
                    <hr className='m-0' />
                </>
            })}
        </div >
    );
};

export default RestaurantMenu;
