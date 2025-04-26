
const Hero = () => {
    return (
        <div className="position-relative min-vh-100 d-flex align-items-center">
            <div
                className="position-absolute top-0 start-0 w-100 h-100 img-fluid"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1552901274-4440b5ca43a9?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="position-absolute top-0 start-0 w-100 bg-black opacity-50"></div>
            </div>
            <div className="container position-relative z-1 text-white px-4">
                <div className="col-md-8 col-lg-8">
                    <h1 className="display-3 fw-bold mb-4 bg-dark bg-opacity-25 p-3 rounded">Experience Fine Dining at Its Best</h1>
                    <p className="fs-5 mb-4 text-light bg-dark bg-opacity-25 p-3 rounded">
                        Discover our carefully crafted menu featuring the finest ingredients and exceptional flavors.
                    </p>
                    <div className="d-flex gap-3">
                        <button className="btn btn-lg btn-light text-dark">Book a Table</button>
                        <button className="btn btn-lg btn-outline-light d-flex align-items-center">
                            View Menu
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
