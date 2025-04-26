const Contact = () => {
    return (
        <section id="contact" className="py-5 bg-light">
            <div className="container px-4">
                <h2 className="text-center fs-1 fw-bold mb-5">Visit Us</h2>
                <div className="row g-4 align-items-center">
                    <div className="col-md-6">
                        <div className="card h-100 shadow-sm border-0">
                            <div style={{ height: "400px" }} className="card-body p-4">
                                <div className="mb-4 d-flex align-items-start gap-3">
                                    <i className="bi bi-geo-alt fs-5"></i>
                                    <div>
                                        <h5 className="fw-semibold mb-1">Location</h5>
                                        <p className="text-muted mb-0">123 Culinary Street, Foodie City, FC 12345</p>
                                    </div>
                                </div>
                                <div className="mb-4 d-flex align-items-start gap-3">
                                    <i className="bi bi-telephone fs-5"></i>
                                    <div>
                                        <h5 className="fw-semibold mb-1">Reservations</h5>
                                        <p className="text-muted mb-0">(555) 123-4567</p>
                                    </div>
                                </div>
                                <div className="mb-4 d-flex align-items-start gap-3">
                                    <i className="bi bi-clock fs-5"></i>
                                    <div>
                                        <h5 className="fw-semibold mb-1">Hours</h5>
                                        <p className="text-muted mb-0">
                                            Mon-Fri: 11am - 10pm<br />
                                            Sat-Sun: 10am - 11pm
                                        </p>
                                    </div>
                                </div>
                                <button className="btn btn-primary w-100 mt-3">Make a Reservation</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div style={{ height: "400px", borderRadius: "0.5rem", overflow: "hidden" }}>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.30596576134!2d-74.25987368715491!3d40.69714941932609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1647043451803!5m2!1sen!2s"
                                className="w-100 h-100 border-0"
                                loading="lazy"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
