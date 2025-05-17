import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../../axiosInstance";
import { RestaurantContext } from "../../context/restaurantContext";

const Register = () => {
    const { setIsAuthenticated } = useContext(RestaurantContext);

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        userName: '',
        email: '',
        password: '',
        phone: '',
        address: [],
        answer: '',
        randomQuestion: '',
    });
    const [errorMessage, setErrorMessage] = useState('')

    const questions = [
        "What was the name of your first pet?",
        "What is your mothers maiden name?",
        "What was the name of your elementary school?",
        "What is your favorite food?",
        "What was the make of your first car?"
    ];
    useEffect(() => {
        const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
        setFormData((prev) => ({ ...prev, randomQuestion }));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post('/auth/register', {
                userName: formData.userName,
                email: formData.email,
                password: formData.password,
                phone: formData.phone,
                address: formData.address,
                answer: formData.answer
            })
        } catch (error) {
            const errorMsg = error.response?.data?.message || "Registration failed. Please try again.";
            setErrorMessage(errorMsg);
        }
        const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
        setFormData({
            userName: '',
            email: '',
            password: '',
            confirmPassword: '',
            phone: '',
            address: [],
            answer: '',
            randomQuestion: randomQuestion
        });
    }

    const handleLogin = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("usertype");
        setIsAuthenticated(false);
        navigate("/login");
    }

    return (
        <form onSubmit={handleSubmit} className="p-4 rounded-4 bg-white mx-md-auto mt-5 mx-3" style={{ maxWidth: '400px' }} autoComplete="off">
            <div className="d-flex justify-content-between align-items-center">
                <h2 className="m-0 fw-semibold text-primary title">
                    Register
                </h2>
                <Link to='/registerRestaurant' className="text-decoration-none"><small>Register Your Restaurant</small></Link>
            </div>
            {errorMessage ? <span className="text-danger small my-2">{errorMessage}</span> : <p className="text-secondary small my-2">Signup now and get full access to our app.</p>}
            <div className="form-floating mb-3 w-100">
                <input onChange={handleChange} name="userName" value={formData.userName} type="text" className="form-control" id="username" placeholder="Username" required autoComplete="off" />
                <label htmlFor="username">Username</label>
            </div>
            <div className="form-floating mb-3">
                <input onChange={handleChange} name="email" value={formData.email} type="email" className="form-control" id="email" placeholder="Email" required />
                <label htmlFor="email">Email</label>
            </div>
            <div className="form-floating mb-3">
                <input onChange={handleChange} name="password" value={formData.password} type="password" className="form-control" id="password" placeholder="Password" required autoComplete="off" />
                <label htmlFor="password">Password</label>
            </div>
            <div className="form-floating mb-3">
                <input onChange={handleChange} name="address" value={formData.address} type="text" className="form-control" id="address" required placeholder="Address" />
                <label htmlFor="address">Address</label>
            </div>
            <div className="form-floating mb-3">
                <input onChange={handleChange} name="phone" value={formData.phone} type="number" className="form-control" id="phone" required placeholder="Phone" />
                <label htmlFor="phone">Phone</label>
            </div>
            <div className="form-floating mb-3">
                <input
                    type="text"
                    name="answer" value={formData.answer}
                    className="form-control"
                    placeholder="Security Answer"
                    required
                    onChange={handleChange}
                />
                <label>{formData.randomQuestion}</label>
            </div>
            <button type="submit" className="btn btn-primary w-100">Create Account</button>
            <p className="text-center mt-3 small">
                Already have an account? <span onClick={handleLogin} style={{ cursor: "pointer" }} className="text-primary text-decoration-none">Login</span>
            </p>
        </form>
    );
};

export default Register;
