import React from 'react';
import { useNavigate } from 'react-router-dom';

const PartnerWithUs = () => {
    const navigate = useNavigate();

    return (
        <section className="py-5 bg-light" id="partnerus">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6 mb-4 mb-lg-0">
                        <h2 className="fs-1 fw-bold">Own a Restaurant? Partner With Us!</h2>
                        <p className="lead fs-6">
                            Join our growing platform and reach thousands of hungry customers every day.
                            We handle the tech and logistics — you focus on the food.
                        </p>
                        <ul className="list-unstyled text-muted mt-3">
                            <li>✅ Increase your sales and visibility</li>
                            <li>✅ Easy-to-use dashboard for managing orders</li>
                            <li>✅ Reliable delivery support</li>
                        </ul>
                        <button className="btn btn-primary mt-4" onClick={() => navigate('/register')}>
                            Become a Partner
                        </button>
                    </div>
                    <div className="col-lg-6 text-center">
                        <img
                            src='https://images.unsplash.com/photo-1516005492235-7a8d3a652dca?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                            alt="Partner with us"
                            className="img-fluid"
                            style={{ maxHeight: '400px' }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PartnerWithUs;
