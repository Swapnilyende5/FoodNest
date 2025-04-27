import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axiosInstance';
import { Link } from 'react-router-dom';

const UserProfile = () => {
    // const { isAuthenticated } = useContext(RestaurantContext);
    const [userData, setUserData] = useState({});
    const [activeTab, setActiveTab] = useState('profile');
    const [editProfile, setEditProfile] = useState(false);

    // useEffect(() => {
    //     // Simulated fetch — replace with actual API call
    //     const storedUser = JSON.parse(localStorage.getItem('user'));
    //     if (storedUser) {
    //         setUserData(storedUser);
    //     }
    // }, []);

    // if (!isAuthenticated || !userData) {
    //     return <p className="text-center mt-5">Please log in to view your profile.</p>;
    // }

    // console.log("userDatauserDatauserData", userData)
    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await axiosInstance.get('/user/getuser')
                console.log("userdataaaaa", res.data.user)
                setUserData(res.data.user)
            } catch (error) {
                const errorMsg = error.response?.data?.message || "Login failed. Please try again.";
                console.log("errorMsg", errorMsg)
            }
        }
        getUser()
    }, [])

    const handleEditProfile = () => {
        setEditProfile(!editProfile)
    }
    const handleUpdateUser = () => {
        setEditProfile(!editProfile)
        const updateUser = async () => {
            try {
                const updateResponse = await axiosInstance.put('/user/updateuser', {
                    userName: userData?.userName,
                    address: [userData?.address],
                    phone: userData?.phone
                })
                console.log("userdataaaaa", updateResponse)
            } catch (error) {
                const errorMsg = error.response?.data?.message || "Failed Updating user.";
                console.log("errorMsg", errorMsg)
            }
        }
        updateUser()
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setUserData((prev) => ({
            ...prev,
            [name]: value
        }))
    }


    return (
        <section class="container py-5">
            <div class="row">
                <div class="col-md-4 mb-4">
                    <div class="card shadow-sm border-0 overflow-hidden">
                        <div class="bg-success text-white text-center py-4">
                            <img src={userData?.profile} alt="Profile" class="rounded-circle border border-3 border-white mb-2" width="100" height="100" />
                            <h5 class="mb-0">{userData.userName}</h5>
                            <small>{userData.email}</small>
                        </div>
                        <div class="card-body text-center">
                            <p class="text-muted small mb-2">Joined: {userData?.createdAt?.slice(0, 10)}</p>
                            {!editProfile ? <button class="btn btn-outline-primary btn-sm w-100 mb-2" onClick={handleEditProfile}>Edit Profile</button> : <button class="btn btn-outline-primary btn-sm w-100 mb-2" onClick={handleUpdateUser}>Save</button>}
                            <button class="btn btn-outline-secondary btn-sm w-100">Change Password</button>
                        </div>
                    </div>
                </div>

                <div class="col-md-8">
                    <div class="card shadow-sm border-0">
                        <div class="card-header bg-white border-bottom-0">
                            <ul class="nav nav-tabs card-header-tabs" role="tablist">
                                <li class="nav-item">
                                    <Link class={`nav-link ${activeTab === 'profile' ? 'active text-primary fw-bold' : 'text-dark'}`} data-bs-toggle="tab" onClick={() => setActiveTab('profile')} role="tab">Profile Info</Link>
                                </li>
                                <li class="nav-item">
                                    <Link class={`nav-link ${activeTab === 'orders' ? 'active text-primary fw-bold' : 'text-dark'}`} data-bs-toggle="tab" onClick={() => setActiveTab('orders')} role="tab">Order History</Link>
                                </li>
                                <li class="nav-item">
                                    <Link class={`nav-link ${activeTab === 'settings' ? 'active text-primary fw-bold' : 'text-dark'}`} data-bs-toggle="tab" onClick={() => setActiveTab('settings')} role="tab">Settings</Link>
                                </li>
                            </ul>
                        </div>

                        <div class="card-body tab-content">

                            <div class={`tab-pane fade ${activeTab === 'profile' ? 'show active' : ''}`} id="profile" role="tabpanel">
                                <h6 class="mb-3 fw-bold text-primary">Personal Information</h6>
                                <div class="row mb-2">
                                    <div class="col-sm-4 text-muted">Full Name:</div>
                                    {editProfile ? <input className='col-sm-8' type="text" name='userName' value={userData.userName} onChange={handleChange} /> : <div class="col-sm-8 fw-medium">{userData.userName}</div>}
                                </div>
                                <div class="row mb-2">
                                    <div class="col-sm-4 text-muted">Email:</div>
                                    <div class="col-sm-8 fw-medium">{userData.email}</div>
                                </div>
                                <div class="row mb-2">
                                    <div class="col-sm-4 text-muted">Phone:</div>
                                    {editProfile ? <input className='col-sm-8' type="number" name='phone' value={userData.phone} onChange={handleChange} /> : <div class="col-sm-8 fw-medium">{userData.phone}</div>}
                                </div>
                                <div class="row mb-2">
                                    <div class="col-sm-4 text-muted">Address:</div>
                                    {editProfile ? <input className='col-sm-8' type="text" name='address' value={userData.address} onChange={handleChange} /> : <div class="col-sm-8 fw-medium">{userData.address}</div>}
                                </div>
                            </div>

                            <div class={`tab-pane fade ${activeTab === 'orders' ? 'show active' : ''}`} id="orders" role="tabpanel">
                                <h6 class="fw-bold mb-3 text-primary">Order History</h6>
                                <div class="alert alert-info">
                                    You haven't placed any orders yet.
                                </div>
                            </div>

                            <div class={`tab-pane fade ${activeTab === 'settings' ? 'show active' : ''}`} id="settings" role="tabpanel">
                                <h6 class="fw-bold mb-3 text-primary">Account Settings</h6>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item d-flex justify-content-between align-items-center">
                                        Email Notifications
                                        <span class="badge bg-success">Enabled</span>
                                    </li>
                                    <li class="list-group-item d-flex justify-content-between align-items-center">
                                        Location Access
                                        <span class="badge bg-secondary">Disabled</span>
                                    </li>
                                    <li class="list-group-item d-flex justify-content-between align-items-center">
                                        Preferred Language
                                        <span class="text-muted">English</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
};

export default UserProfile;
