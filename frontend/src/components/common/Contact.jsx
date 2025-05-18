import React from 'react';

const Contact = () => {
    return (
        <div>
            <header className="bg-dark text-white py-4 text-center">
                <div className="container">
                    <h1>Contact Us</h1>
                    <p className="lead">We’d love to hear from you!</p>
                </div>
            </header>
            <section className="py-5">
                <div className="container">
                    <div className="row g-4">
                        <div className="col-md-6">
                            <h4>Get in Touch</h4>
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Full Name</label>
                                    <input type="text" className="form-control" id="name" placeholder="Enter your full name" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email Address</label>
                                    <input type="email" className="form-control" id="email" placeholder="name@example.com" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="message" className="form-label">Your Message</label>
                                    <textarea className="form-control" id="message" rows="4" placeholder="Write your message here..."></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary">Send Message</button>
                            </form>
                        </div>
                        <div className="col-md-6">
                            <h4>Contact Information</h4>
                            <ul className="list-unstyled">
                                <li><strong>Address:</strong> 123 Food Street, Flavor Town, India</li>
                                <li><strong>Phone:</strong> +91 9876543210</li>
                                <li><strong>Email:</strong> support@foodnest.com</li>
                                <li><strong>Working Hours:</strong> 9:00 AM – 10:00 PM</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
