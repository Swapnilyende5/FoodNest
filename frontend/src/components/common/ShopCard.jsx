import React from 'react'
import { Link } from 'react-router-dom';
import '../FeaturedMenuCard/FeaturedMenuCard.scss'

const ShopCard = ({ item, handleClick }) => {
    const { title, image, rating, description, deliveryTime, location } = item || {};

    return (
        <div className="col-md-3 card-wrapper" onClick={() => handleClick(title)}>
            <Link to={`/restaurant/${title}`}>
                <div className="card position-relative card-hover">
                    <img src={image} style={{ height: '164px' }} className="card-img" alt="Pizza Hut" />
                    <div className="card-body">
                        <div className='d-flex justify-content-between'>

                            <h6 className="card-title fw-semibold">{title}</h6><span>⭐ {rating}</span>
                        </div>
                        <p className="mb-1 text-success">{deliveryTime}</p>
                        <small className="text-muted">{description}<br />{location}</small>
                    </div>
                </div>
            </Link>
        </div >
    )
}

export default ShopCard
