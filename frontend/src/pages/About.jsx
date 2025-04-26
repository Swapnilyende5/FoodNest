const About = () => {
    return (
        <section id="about" className="py-5">
            <div className="container px-4">
                <div className="mx-auto text-center mb-5" style={{ maxWidth: "768px" }}>
                    <h2 className="fs-1 fw-bold mb-3">Our Story</h2>
                    <p className="text-muted fs-5">
                        Since 2010, Tasty Bite has been serving exceptional cuisine in a warm and elegant atmosphere.
                        Our passion for food and dedication to service excellence makes every visit memorable.
                    </p>
                </div>
                <div className="row">
                    <div className="col-md-4 mb-4">
                        <div className="card text-center border-0 shadow-sm h-100">
                            <div className="card-body p-4">
                                <i className="bi bi-cup-hot fs-1"></i>
                                <h3 className="card-title fs-4 fw-semibold mb-2">Quality Ingredients</h3>
                                <p className="card-text text-muted">We source only the finest ingredients from local suppliers.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-4">
                        <div className="card text-center border-0 shadow-sm h-100">
                            <div className="card-body p-4">
                                <i className="bi bi-star fs-1"></i>
                                <h3 className="card-title fs-4 fw-semibold mb-2">Expert Chefs</h3>
                                <p className="card-text text-muted">Our culinary team brings years of experience and passion.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-4">
                        <div className="card text-center border-0 shadow-sm h-100">
                            <div className="card-body p-4">
                                <i className="bi bi-alarm fs-1"></i>
                                <h3 className="card-title fs-4 fw-semibold mb-2">Perfect Timing</h3>
                                <p className="card-text text-muted">Enjoy prompt service without compromising quality.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
