
const Hero = () => {
    return (
        <div className="position-relative d-flex align-items-center" style={{ height: "600px" }}>
            <div
                className="position-absolute top-0 start-0 w-100 h-100 img-fluid"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1494859802809-d069c3b71a8a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="position-absolute top-0 start-0 w-100 bg-black opacity-50"></div>
            </div>
            <div className="container position-relative z-1 text-black px-4">
                <div className="col-md-8 col-lg-8">
                    <h1 className="display-3 fw-bold" style={{ fontSize: "70px" }}>Bringing Flavor to Your Doorstep</h1>
                    <p className="fs-5 mb-4 ps-1">
                        Fresh meals from your favorite restaurants, delivered fast and hot.
                    </p>
                    <div className="d-flex gap-3">
                        <a href="#partnerus" className="btn btn-lg btn-dark text-light">Partner With Us</a>
                        <a href="#ordernow" className="btn btn-lg btn-outline-dark d-flex align-items-center">
                            Order Now
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
