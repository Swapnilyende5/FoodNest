import { Link, useLocation, useNavigate } from "react-router-dom";
import { RestaurantContext } from "../context/restaurantContext";
import { useContext } from "react";

const Navbar = () => {
    const { isAuthenticated, setIsAuthenticated, addedItem } =
        useContext(RestaurantContext);
    const userType = localStorage.getItem("usertype");
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("usertype");
        setIsAuthenticated(false);
        navigate("/login");
    };
    const guestUser = [
        { path: "/", label: "Home" },
        { path: "/login", label: "Login" },
        { path: "/register", label: "Register" },
    ];
    const vendorUser = [
        { path: "/", label: "Home" },
        {
            path: "/restaurant/manage-menu",
            label: "Manage Menu",
        },
        { path: "/restaurant/orders", label: "Orders" },
        {
            path: "/restaurant/feedback",
            label: "Customer Feedback",
        },
        { path: "/restaurant/profile", label: "Profile" },
    ];
    const clientUser = [
        { path: "/", label: "Home" },
        { path: "/orders", label: "My Orders" },
        { path: "/cart", label: "Cart" },
        { path: "/profile", label: "Profile" },
    ];
    const adminUser = [
        { path: "/admin/dashboard", label: "Admin Dashboard" },
        { path: "/admin/manage-users", label: "Manage Users" },
        { path: "/admin/manage-vendors", label: "Manage Vendors" },
        { path: "/admin/reports", label: "Reports/Analytics" },
        { path: "/admin/settings", label: "Settings" },
    ];

    return (
        <nav
            className="navbar navbar-expand-lg w-100 m-auto"
            style={{ backdropFilter: "blur(8px)", zIndex: 1050 }}
        >
            <div className="container px-4">
                <Link className="navbar-brand fw-bold p-0" to="/">
                    <img src="/foodnest.png" width="150px" alt="main-logo" />
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
                        {!isAuthenticated &&
                            guestUser.map((item) => {
                                return (
                                    <li className="nav-item">
                                        <Link
                                            className={`nav-link ${location.pathname === item.path && "text-danger"
                                                }`}
                                            to={item.path}
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                );
                            })}
                        {isAuthenticated && userType === "client" && (
                            <>
                                {clientUser.map((item) => {
                                    return (
                                        <li className="nav-item">
                                            <Link
                                                className={`nav-link ${location.pathname === item.path && "text-danger"
                                                    }`}
                                                to={item.path}
                                            >
                                                {item.label}
                                                {item.label === "Cart" && (
                                                    <span className="bg-danger text-white rounded px-2 py-1 ms-1">
                                                        {addedItem?.length || 0}
                                                    </span>
                                                )}
                                            </Link>
                                        </li>
                                    );
                                })}
                                <li className="nav-item">
                                    <button
                                        className="nav-link btn btn-link"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </button>
                                </li>
                            </>
                        )}
                        {isAuthenticated && userType === "vendor" && (
                            <>
                                {vendorUser.map((item) => {
                                    return (
                                        <li className="nav-item">
                                            <Link
                                                className={`nav-link ${location.pathname === item.path && "text-danger"
                                                    }`}
                                                to={item.path}
                                            >
                                                {item.label}
                                            </Link>
                                        </li>
                                    );
                                })}
                                <li className="nav-item">
                                    <button
                                        className="nav-link btn btn-link"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </button>
                                </li>
                            </>
                        )}
                        {isAuthenticated && userType === "admin" && (
                            <>
                                {adminUser.map((item) => {
                                    return (
                                        <li className="nav-item">
                                            <Link
                                                className={`nav-link ${location.pathname === item.path && "text-danger"
                                                    }`}
                                                to={item.path}
                                            >
                                                {item.label}
                                            </Link>
                                        </li>
                                    )
                                })}
                                <li className="nav-item">
                                    <button
                                        className="nav-link btn btn-link"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
