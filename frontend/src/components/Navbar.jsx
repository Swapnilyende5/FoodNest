import { Link } from 'react-router-dom';
import { RestaurantContext } from '../context/restaurantContext';
import { useContext } from 'react';

const Navbar = () => {
    const { isAuthenticated } = useContext(RestaurantContext);
    const userType = localStorage.getItem("usertype");
    console.log("object", isAuthenticated, userType)
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ width: '85%', margin: '0 auto' }}>
            <div className="container-fluid">
                <Link className="navbar-brand fw-bold" to="/">
                    🍽️ FoodNest
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    {isAuthenticated}
                    <ul className="navbar-nav ms-auto gap-3">
                        {
                            !isAuthenticated && (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/">Home</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/login">Login</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/register">Register</Link>
                                    </li>
                                </>
                            )
                        }
                        {
                            isAuthenticated && userType === 'client' && (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/">Home</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/orders">My Orders</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/cart">Cart</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/profile">Profile</Link>
                                    </li>
                                </>
                            )
                        }
                        {
                            isAuthenticated && userType === 'vendor' && (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/restaurant/dashboard">Dashboard</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/restaurant/foods">Foods</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/restaurant/orders">Orders</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/restaurant/profile">Profile</Link>
                                    </li>
                                </>
                            )
                        }
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
