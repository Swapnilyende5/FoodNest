import React from 'react'

const About = () => {
    return (
        <div className="container py-5">
            <div className="text-center mb-5">
                <img src="/foodnestmain.png" width="300px" alt="main-logo" />
            </div>
            <div className="row mb-4">
                <div className="col-md-12">
                    <p>
                        <strong>FoodNest</strong> is a modern, user-centric platform built to seamlessly connect <strong>hungry customers</strong> with their <strong>favorite restaurants</strong>. Whether you're craving a quick bite or a full-course meal, FoodNest brings your favorite flavors right to your doorstep with just a few clicks.

                        With a growing network of restaurants across cities, FoodNest empowers local eateries to reach a broader audience and helps users discover new tastes effortlessly. Our easy-to-use interface, fast search, and real-time order tracking make the food ordering experience smooth, reliable, and enjoyable.

                        We are committed to supporting both diners and restaurant owners with powerful tools—ranging from menu management to delivery insights. As we continue to grow, our goal remains the same: to revolutionize the way food is ordered and enjoyed in India and beyond.

                        Whether you're ordering for yourself, your family, or planning a team lunch, FoodNest is your trusted food partner—fast, fresh, and always satisfying.
                    </p>
                </div>
            </div>
            <div className="row text-center mb-5">
                <div className="col-md-3">
                    <div className="highlight-number">120+</div>
                    <p>Registered Restaurants</p>
                </div>
                <div className="col-md-3">
                    <div className="highlight-number">5,000+</div>
                    <p>Active Users</p>
                </div>
                <div className="col-md-3">
                    <div className="highlight-number">20,000+</div>
                    <p>Orders Delivered</p>
                </div>
                <div className="col-md-3">
                    <div className="highlight-number">50+</div>
                    <p>Cities Covered</p>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col-md-12">
                    <h3 className="mb-3">🚀 What We Do</h3>
                    <ul>
                        <li>Restaurants can register and showcase their full menu online.</li>
                        <li>Users can explore cuisines, place orders, and enjoy hassle-free delivery.</li>
                    </ul>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col-md-12">
                    <h3 className="mb-3">🔒 Trust & Safety</h3>
                    <ul>
                        <li>Verified restaurant profiles</li>
                        <li>Real-time order tracking</li>
                        <li>Multiple payment options</li>
                        <li>Secure authentication and encrypted transactions</li>
                    </ul>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col-md-12">
                    <h3 className="mb-3">💡 Why Choose FoodNest?</h3>
                    <ul>
                        <li>Curated restaurant listings with real user reviews</li>
                        <li>Intuitive interface for easy browsing and ordering</li>
                        <li>24/7 customer support for both users and restaurant partners</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default About
