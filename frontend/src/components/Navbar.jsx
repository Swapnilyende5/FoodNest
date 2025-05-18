import { Link, useLocation, useNavigate } from "react-router-dom";
import { RestaurantContext } from "../context/restaurantContext";
import { useContext, useRef } from "react";

const Navbar = () => {
    const { isAuthenticated, setIsAuthenticated, addedItem } = useContext(RestaurantContext);
    const userType = localStorage.getItem("usertype");
    const navigate = useNavigate();
    const location = useLocation();
    const collapseRef = useRef(null);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("usertype");
        setIsAuthenticated(false);
        collapseNavbar();
        navigate("/login");
    };

    const collapseNavbar = () => {
        if (collapseRef.current && collapseRef.current.classList.contains("show")) {
            collapseRef.current.classList.remove("show");
        }
    };

    const guestUser = [
        { path: "/", label: "Home" },
        { path: "/login", label: "Login" },
        { path: "/register", label: "Register" },
    ];
    const vendorUser = [
        { path: "/", label: "Home" },
        { path: "/restaurant/manage-menu", label: "Manage Menu" },
        { path: "/restaurant/orders", label: "Orders" },
        { path: "/restaurant/feedback", label: "Customer Feedback" },
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

    const renderLinks = (userList) =>
        userList.map((item, index) => (
            <li className="nav-item" key={index}>
                <Link
                    className={`nav-link ${location.pathname === item.path ? "active text-danger" : ""}`}
                    to={item.path}
                    onClick={collapseNavbar}
                >
                    {item.label}
                    {item.label === "Cart" && (
                        <span className="bg-danger text-white rounded px-2 py-1 ms-1">
                            {addedItem?.length || 0}
                        </span>
                    )}
                </Link>
            </li>
        ));

    return (
        <nav className="navbar navbar-expand-lg bg-white shadow-sm fixed-top">
            <div className="container">
                <Link className="navbar-brand fw-bold" to="/" onClick={collapseNavbar}>
                    <img src="/foodnest.png" width="150px" alt="FoodNest Logo" />
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav" ref={collapseRef}>
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-2">
                        {!isAuthenticated && renderLinks(guestUser)}
                        {isAuthenticated && userType === "client" && (
                            <>
                                {renderLinks(clientUser)}
                                <li className="nav-item">
                                    <button className="nav-link btn btn-link" onClick={() => { handleLogout(); collapseNavbar(); }}>
                                        Logout
                                    </button>
                                </li>
                            </>
                        )}
                        {isAuthenticated && userType === "vendor" && (
                            <>
                                {renderLinks(vendorUser)}
                                <li className="nav-item">
                                    <button className="nav-link btn btn-link" onClick={() => { handleLogout(); collapseNavbar(); }}>
                                        Logout
                                    </button>
                                </li>
                            </>
                        )}
                        {isAuthenticated && userType === "admin" && (
                            <>
                                {renderLinks(adminUser)}
                                <li className="nav-item">
                                    <button className="nav-link btn btn-link" onClick={() => { handleLogout(); collapseNavbar(); }}>
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
