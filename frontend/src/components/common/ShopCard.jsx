import React from 'react'
import { Link } from 'react-router-dom';
import '../FeaturedMenuCard/FeaturedMenuCard.scss'

const ShopCard = ({ item, handleClick }) => {
    const { restaurantName, rating, ratingCount, logoUrl, delivery, address, _id } = item || {};
    return (
        <div className="col-md-3 card-wrapper" onClick={() => handleClick(_id)}>
            <Link to={`/restaurant/${restaurantName}`}>
                <div className="card position-relative card-hover">
                    <img src={logoUrl} style={{ height: '164px' }} className="card-img" alt="Pizza Hut" />
                    <div className="card-body">
                        <div className='d-flex justify-content-between'>

                            <h6 className="card-title fw-semibold">{restaurantName}</h6><small>⭐ {rating} ({ratingCount})</small>
                        </div>
                        <p className="mb-1">{address}</p>
                        <small className="text-success">{delivery ? "Delivery Available" : "Delivery Not Available"}</small>
                    </div>
                </div>
            </Link>
        </div >
    )
}

export default ShopCard
