import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import axiosInstance from '../../axiosInstance'
import { RestaurantContext } from '../context/restaurantContext'

const Login = () => {
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })
    const { setIsAuthenticated } = useContext(RestaurantContext);
    const [errorMessage, setErrorMessage] = useState('')
    const [redirect, setRedirect] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setLoginData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axiosInstance.post('/auth/login', {
                email: loginData.email,
                password: loginData.password,
            })
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("usertype", res.data.user.userType);
            setIsAuthenticated(true);
            setRedirect(true)
        } catch (error) {
            const errorMsg = error.response?.data?.message || "Login failed. Please try again.";
            setErrorMessage(errorMsg);
        }
        setLoginData({
            email: '',
            password: '',
        })
    }

    if (redirect) {
        return <Navigate to="/" />;
    }


    return (
        <form className="p-4 rounded-4 bg-white mx-md-auto mt-5 mx-3" onSubmit={handleSubmit} style={{ maxWidth: '400px' }}>
            <h2 className="mb-2 fw-semibold text-primary title">
                Login
            </h2>
            {errorMessage ? <span className='text-danger small mb-3'>{errorMessage}</span> : <p className="text-secondary small mb-3">Welcome back! Please login to continue.</p>}
            <div className="form-floating mb-3">
                <input type="email" name="email" value={loginData.email} onChange={handleChange} className="form-control" id="email" placeholder="Email" required />
                <label htmlFor="email">Email</label>
            </div>
            <div className="form-floating mb-3">
                <input type="password" name="password" value={loginData.password} onChange={handleChange} className="form-control" id="password" placeholder="Password" required />
                <label htmlFor="password">Password</label>
            </div>
            <button type="submit" className="btn btn-primary w-100">Login</button>
            <p className="text-center mt-3 small">
                Don't have an account? <Link to="/register" className="text-primary text-decoration-none">Register</Link>
            </p>
        </form>
    )
}

export default Login
