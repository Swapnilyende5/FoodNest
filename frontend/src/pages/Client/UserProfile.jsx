import React, { useContext, useEffect, useState } from "react";
import axiosInstance from "../../../axiosInstance";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/utils/Loader";
import { RestaurantContext } from "../../context/restaurantContext";
import "./RestaurantMenu.scss";

const UserProfile = () => {
    const { userDetails, setUserDetails, setIsAuthenticated } = useContext(RestaurantContext);
    const navigate = useNavigate();
    const [order, setOrders] = useState([]);
    const [activeTab, setActiveTab] = useState("profile");
    const [editProfile, setEditProfile] = useState(false);
    const [changePassword, setChangePassword] = useState(true);
    const [isProfileLoading, setIsProfileLoading] = useState(false);
    const [password, setPassword] = useState({
        oldPassword: "",
        newPassword: "",
    });

    useEffect(() => {
        const getRecentOrders = async () => {
            try {
                setIsProfileLoading(true);
                const res = await axiosInstance.get("/order/getRecentOrders");
                setOrders(res.data.recentOrders);
                setIsProfileLoading(false);
            } catch (error) {
                const errorMsg =
                    error.response?.data?.message ||
                    "Failed getting user data. Please try again.";
                console.log("getRecentOrdersError", errorMsg);
            }
        };
        getRecentOrders();
    }, []);

    const handleUpdateUser = () => {
        setEditProfile((prev) => !prev);
        const updateUser = async () => {
            try {
                setIsProfileLoading(true);
                await axiosInstance.put("/user/updateuser", {
                    userName: userDetails?.userName,
                    address: [userDetails?.address],
                    phone: userDetails?.phone,
                });
                setIsProfileLoading(false);
            } catch (error) {
                const errorMsg =
                    error.response?.data?.message || "Failed Updating user.";
                console.log("updateUserError", errorMsg);
            }
        };
        updateUser();
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleChangePass = () => {
        setChangePassword(false);
        const editPassword = async () => {
            try {
                setIsProfileLoading(true);
                const editPasswordResponse = await axiosInstance.put(
                    "/user/updatepassword",
                    {
                        oldPassword: password.oldPassword,
                        newPassword: password.newPassword,
                    }
                );
                setIsProfileLoading(false);
                setChangePassword(true);
                setPassword({
                    oldPassword: "",
                    newPassword: "",
                });
                console.log("editPasswordResponse", editPasswordResponse);
            } catch (error) {
                alert("Please provide correct old password!");
                setPassword({
                    oldPassword: "",
                    newPassword: "",
                });
                const errorMsg =
                    error.response?.data?.message || "Failed Updating User Password.";
                console.log("editPasswordError", errorMsg);
            }
        };
        password.oldPassword && password.newPassword && editPassword();
    };

    const handleChangePassword = (e) => {
        const { name, value } = e.target;
        setPassword((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleDelete = () => {
        const deleteAccount = async () => {
            try {
                setIsProfileLoading(true);
                const deleteAccountRes = await axiosInstance.delete(
                    `/user/deleteuser/${userDetails._id}`
                );
                setIsProfileLoading(false);
                localStorage.removeItem("token");
                localStorage.removeItem("usertype");
                setIsAuthenticated(false);
                navigate("/login");
                console.log("deleteAccountRes", deleteAccountRes);
            } catch (error) {
                const errorMsg =
                    error.response?.data?.message || "Failed Deleting Account.";
                console.log("errorMsg", errorMsg);
            }
        };
        deleteAccount();
    };

    const ordersByCurrentUser = order?.find(
        (item) => item.userId === userDetails._id
    );

    return isProfileLoading ? (
        <Loader />
    ) : (
        <section className="container py-5">
            <div className="row">
                <div className="col-md-4 mb-4">
                    <div className="card shadow-sm border-0 overflow-hidden">
                        <div className="bg-success text-white text-center py-4">
                            <img
                                src={userDetails?.profile}
                                alt="Profile"
                                className="rounded-circle border border-3 border-white mb-2"
                                width="100"
                                height="100"
                            />
                            <h5 className="mb-0">{userDetails.userName}</h5>
                            <small>{userDetails.email}</small>
                        </div>
                        <div className="card-body text-center">
                            <p className="text-muted small mb-2">
                                Joined: {userDetails?.createdAt?.slice(0, 10)}
                            </p>

                            {!editProfile ? (
                                <button
                                    className="btn btn-outline-primary btn-sm w-100 mb-2"
                                    onClick={() => {
                                        setEditProfile((prev) => !prev);
                                        if (activeTab !== "profile") {
                                            setActiveTab("profile");
                                        }
                                    }}
                                    disabled={!changePassword}
                                >
                                    Edit Profile
                                </button>
                            ) : (
                                <div className="d-flex">
                                    <button
                                        className="btn btn-outline-success btn-sm w-100 mb-2 me-1"
                                        onClick={handleUpdateUser}
                                    >
                                        Save
                                    </button>
                                    <button
                                        className="btn btn-outline-danger btn-sm w-100 mb-2 ms-1"
                                        onClick={() => {
                                            setEditProfile((prev) => !prev);
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            )}

                            {changePassword ? (
                                <button
                                    className="btn btn-outline-secondary btn-sm w-100"
                                    onClick={handleChangePass}
                                    disabled={editProfile}
                                >
                                    Change Password
                                </button>
                            ) : (
                                <div className="d-flex">
                                    <button
                                        className="btn btn-outline-success btn-sm w-100 me-1"
                                        onClick={handleChangePass}
                                    >
                                        Save
                                    </button>
                                    <button
                                        className="btn btn-outline-danger btn-sm w-100 ms-1"
                                        onClick={() => {
                                            setChangePassword((prev) => !prev);
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="col-md-8">
                    <div className="card shadow-sm border-0">
                        {changePassword ? (
                            <div className="card-header bg-white border-bottom-0">
                                <ul className="nav nav-tabs card-header-tabs" role="tablist">
                                    <li className="nav-item">
                                        <Link
                                            className={`nav-link ${activeTab === "profile"
                                                ? "active text-primary fw-bold"
                                                : "text-dark"
                                                }`}
                                            data-bs-toggle="tab"
                                            onClick={() => setActiveTab("profile")}
                                            role="tab"
                                        >
                                            Profile Info
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link
                                            className={`nav-link ${activeTab === "orders"
                                                ? "active text-primary fw-bold"
                                                : "text-dark"
                                                }`}
                                            data-bs-toggle="tab"
                                            onClick={() => setActiveTab("orders")}
                                            role="tab"
                                        >
                                            Order History
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link
                                            className={`nav-link ${activeTab === "settings"
                                                ? "active text-primary fw-bold"
                                                : "text-dark"
                                                }`}
                                            data-bs-toggle="tab"
                                            onClick={() => setActiveTab("settings")}
                                            role="tab"
                                        >
                                            Settings
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <div className="card-header bg-white border-bottom-0">
                                <ul className="nav nav-tabs card-header-tabs" role="tablist">
                                    <li className="nav-item">
                                        <Link
                                            className="nav-link active text-primary fw-bold"
                                            data-bs-toggle="tab"
                                            role="tab"
                                        >
                                            Change Password
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        )}
                        {changePassword ? (
                            <div className="card-body tab-content">
                                <div
                                    className={`tab-pane fade ${activeTab === "profile" ? "show active" : ""
                                        }`}
                                    id="profile"
                                    role="tabpanel"
                                >
                                    <h6 className="mb-3 fw-bold text-primary">
                                        Personal Information
                                    </h6>
                                    <div className="row mb-2">
                                        <div className="col-sm-4 text-muted">Full Name:</div>
                                        {editProfile ? (
                                            <input
                                                className="search-input col-sm-8"
                                                type="text"
                                                name="userName"
                                                value={userDetails.userName}
                                                onChange={handleChange}
                                            />
                                        ) : (
                                            <div className="col-sm-8 fw-medium">
                                                {userDetails.userName}
                                            </div>
                                        )}
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-sm-4 text-muted">Email:</div>
                                        <div className="col-sm-8 fw-medium">{userDetails.email}</div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-sm-4 text-muted">Phone:</div>
                                        {editProfile ? (
                                            <input
                                                className="search-input col-sm-8"
                                                type="number"
                                                name="phone"
                                                value={userDetails.phone}
                                                onChange={handleChange}
                                            />
                                        ) : (
                                            <div className="col-sm-8 fw-medium">{userDetails.phone}</div>
                                        )}
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-sm-4 text-muted">Address:</div>
                                        {editProfile ? (
                                            <input
                                                className="search-input col-sm-8"
                                                type="text"
                                                name="address"
                                                value={userDetails.address}
                                                onChange={handleChange}
                                            />
                                        ) : (
                                            <div className="col-sm-8 fw-medium">
                                                {userDetails.address}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div
                                    className={`tab-pane fade ${activeTab === "orders" ? "show active" : ""
                                        }`}
                                    id="orders"
                                    role="tabpanel"
                                >
                                    <h6 className="fw-bold mb-3 text-primary">Order History</h6>
                                    {ordersByCurrentUser?.orders.length > 0 ? (
                                        ordersByCurrentUser?.orders?.map((item) => {
                                            return (
                                                <div className="card mb-1">
                                                    <div className="card-header d-flex justify-content-between">
                                                        <div className="d-flex">
                                                            <p className="me-2 m-0">
                                                                Order: <small>{item.orderId}</small>
                                                            </p>
                                                            <p className="m-0">
                                                                Date: <small>{item.date}</small>
                                                            </p>
                                                        </div>
                                                        <p className="m-0">
                                                            Total: <small>{item.total}</small>
                                                        </p>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <div className="alert alert-info">
                                            You haven't placed any orders yet.
                                        </div>
                                    )}
                                </div>
                                <div
                                    className={`tab-pane fade ${activeTab === "settings" ? "show active" : ""
                                        }`}
                                    id="settings"
                                    role="tabpanel"
                                >
                                    <h6 className="fw-bold mb-3 text-primary">
                                        Account Settings
                                    </h6>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item d-flex justify-content-between align-items-center">
                                            Email Notifications
                                            <button disabled className="btn btn-success w-25">
                                                Enabled
                                            </button>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between align-items-center">
                                            Location Access
                                            <button disabled className="btn btn-secondary w-25">
                                                Disabled
                                            </button>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between align-items-center">
                                            Delete Account
                                            <button
                                                className="btn btn-danger w-25"
                                                onClick={handleDelete}
                                            >
                                                Delete
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        ) : (
                            <div className="card-body tab-content">
                                <div
                                    className="tab-pane fade show active ms-1 w-75"
                                    id="changePassword"
                                    role="tabpanel"
                                >
                                    <p>Enter your current password and your new password</p>
                                    <div className="row mb-2">
                                        <input
                                            className="search-input col-sm-8"
                                            name="oldPassword"
                                            value={password.oldPassword}
                                            onChange={handleChangePassword}
                                            type="password"
                                            placeholder="old password"
                                        />
                                    </div>
                                    <div className="row mb-2">
                                        <input
                                            className="search-input col-sm-8"
                                            name="newPassword"
                                            value={password.newPassword}
                                            onChange={handleChangePassword}
                                            type="password"
                                            placeholder="new password"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UserProfile;
