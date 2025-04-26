import React from 'react'
import { Link } from 'react-router-dom';
import '../FeaturedMenuCard/FeaturedMenuCard.scss'

const ShopCard = ({ item, handleClick }) => {
    const { title, image, rating, description, location } = item;

    return (
        <div class="col-md-3 card-wrapper" onClick={() => handleClick(title)}>
            <Link to={`/restaurant/${title}`}>
                <div class="card position-relative card-hover">
                    <img src={image} style={{ height: '164px' }} class="card-img" alt="Pizza Hut" />
                    <div class="card-body">
                        <h6 class="card-title fw-semibold">{title}</h6>
                        <p class="mb-1 text-success">{rating}</p>
                        <small class="text-muted">{description}<br />{location}</small>
                    </div>
                </div>
            </Link>
        </div >
    )
}

export default ShopCard
