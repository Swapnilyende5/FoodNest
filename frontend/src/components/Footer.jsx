import React from "react";
import "./Footer.scss";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-dark text-light py-5">
            <div className="container">
                <div className="row footer-container px-0">
                    <div className="col-md-4 footer-section mb-4">
                        <h3 className="mb-1">Food Nest</h3>
                        <p>
                            Naturally Delicious, Always Fresh!
                        </p>
                    </div>
                    <div className="col-md-4 footer-section mb-4">
                        <h3 className="mb-4">Quick Links</h3>
                        <ul className="list-unstyled">
                            <li>
                                <Link to="/registerRestaurant" className="text-light">Partner with us</Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-light">Contact</Link>
                            </li>
                            <li>
                                <Link to="/about" className="text-light">About</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-4 footer-section mb-4">
                        <h3 className="mb-4">Contact Us</h3>
                        <p className="mb-1">Email: support@foodnest.com</p>
                        <p className="mb-1">Phone: +91 9876543210</p>
                        <p className="mb-1">Address: 123 Food Street, Flavor Town, India</p>
                        <p className="mb-1">Working Hours: 9:00 AM – 10:00 PM</p>
                    </div>
                </div>
            </div>
            <div className="footer-bottom text-center">
                <p className="m-0">&copy; 2025 FoodNest. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
