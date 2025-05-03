import React from 'react';
import { useNavigate } from 'react-router-dom';
// import './GuestUser.scss'; // Optional: for your own styling

const HomeGuest = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    };

    const handleRegister = () => {
        navigate('/register');
    };

    return (
        <div className="container text-center py-5">
            <h1 className="mb-3">Welcome, Guest!</h1>
            <p className="lead mb-4">
                You are browsing as a guest. Some features like placing orders or viewing order history are only available to registered users.
            </p>
            <div className="d-flex justify-content-center gap-3">
                <button className="btn btn-primary px-4" onClick={handleLogin}>
                    Login
                </button>
                <button className="btn btn-outline-secondary px-4" onClick={handleRegister}>
                    Register
                </button>
            </div>
            <div className="mt-5">
                <h5 className="text-muted">Or continue browsing...</h5>
            </div>
        </div>
    );
};

export default HomeGuest;
