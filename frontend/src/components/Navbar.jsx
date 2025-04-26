import { Link, Navigate } from 'react-router-dom';
import { RestaurantContext } from '../context/restaurantContext';
import { useContext, useState } from 'react';

const Navbar = () => {
    const { isAuthenticated, setIsAuthenticated } = useContext(RestaurantContext);
    const [redirect, setRedirect] = useState(false)

    const userType = localStorage.getItem("usertype");

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('usertype');
        setIsAuthenticated(false)
        setRedirect(true)
    }

    if (redirect) {
        return <Navigate to='/login' />
    }

    return (
        <nav className="navbar navbar-expand-lg bg-light w-100 m-auto" style={{ backdropFilter: "blur(8px)", zIndex: 1050 }}>
            <div className="container-fluid px-5">
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
                                    <li className="nav-item">
                                        <button className="nav-link btn btn-link" onClick={handleLogout}>Logout</button>
                                    </li>
                                </>
                            )
                        }
                        {
                            isAuthenticated && userType === 'admin' && (
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
                                    <li className="nav-item">
                                        <button className="nav-link btn btn-link" onClick={handleLogout}>Logout</button>
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
