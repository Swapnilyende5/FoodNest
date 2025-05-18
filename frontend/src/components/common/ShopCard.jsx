import React from "react";
import { Link } from "react-router-dom";
import "../FeaturedMenuCard/FeaturedMenuCard.scss";

const ShopCard = ({ item, handleClick, RestaurantId }) => {
    const userType = localStorage.getItem("usertype");
    const {
        restaurantName,
        rating,
        ratingCount,
        logoUrl,
        delivery,
        address,
        _id,
    } = item || {};

    return (
        <div
            className="col-lg-3 col-md-4 card-wrapper h-75"
            onClick={() => handleClick(_id)}
        >
            <Link to={`/restaurant/${restaurantName}`}>
                <div className="card position-relative card-hover">
                    <img
                        src={logoUrl}
                        style={{ height: "164px" }}
                        className="card-img"
                        alt="Pizza Hut"
                    />
                    {_id === RestaurantId && userType === "vendor" && (
                        <>
                            <span className="bg-success text-white py-1 text-center">
                                Add Food
                                <i className="ms-2 bi bi-pencil-square"></i>
                            </span>
                        </>
                    )}
                    <div className="card-body">
                        <div className="d-flex justify-content-between">
                            <h6 className="card-title fw-semibold">{restaurantName}</h6>
                            <small>
                                ⭐ {rating} ({ratingCount})
                            </small>
                        </div>
                        <p className="mb-1 multi-line-truncate">{address}</p>
                        {_id !== RestaurantId && userType === "vendor" && <p className="text-white py-3 m-0 text-center"></p>}
                        <small className="text-success">
                            {delivery ? "Delivery Available" : "Delivery Not Available"}
                        </small>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default ShopCard;
