import React, { useContext, useEffect, useState } from "react";
import { RestaurantContext } from "../../context/restaurantContext";
import ToastMessage from "../../components/common/ToastMessage";
import axiosInstance from "../../../axiosInstance";
import { useNavigate } from "react-router-dom";
import "./Cart.scss";

const CartItems = () => {
    const { addedItem, setAddedItem, removeFromCart, subTotal } =
        useContext(RestaurantContext);
    const [userData, setUserData] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await axiosInstance.get("/user/getuser");
                setUserData(res.data.user);
            } catch (error) {
                const errorMsg =
                    error.response?.data?.message || "Login failed. Please try again.";
                console.log("getUserError", errorMsg);
            }
        };
        getUser();
    }, []);

    const placeOrder = async () => {
        if (!addedItem.length) {
            alert("Cart is empty, Please add something!");
            return;
        }
        try {
            await axiosInstance.post("/food/placeorder", {
                cart: addedItem,
            });

            await axiosInstance.post("/order/recentOrder", {
                userId: userData._id,
                newOrder: {
                    orderId: Date.now(),
                    items: addedItem,
                    total: subTotal,
                    date: new Date().toLocaleString(),
                },
            });

            await axiosInstance.post("/past-orders/create", {
                userId: userData._id,
                items: addedItem,
                totalAmount: subTotal
            })

            localStorage.removeItem("cartitems")
            setAddedItem([]);
            const toast = document.getElementById("toast");
            toast.classList.add("show");
            setTimeout(() => toast.classList.remove("show"), 3000);
        } catch (error) {
            console.log("Order Error:", error?.response?.data?.message || "Something went wrong.");
        }
    };

    return (
        <div className="container cartitems">
            {addedItem.length > 0 && (
                <div className="d-none d-md-block">
                    <div className="row text-center fw-semibold cartitems-header">
                        <div className="col">Products</div>
                        <div className="col">Title</div>
                        <div className="col">Price</div>
                        <div className="col">Quantity</div>
                        <div className="col">Total</div>
                        <div className="col">Remove</div>
                    </div>
                    <hr />
                </div>
            )}
            {addedItem?.map((item, index) => {
                return (
                    <div key={index}>
                        <div className="row align-items-center text-center py-2 fw-medium cartitems-row">
                            <div className="col">
                                <img
                                    src={item && item?.imageUrl}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src =
                                            item.imageUrl &&
                                            `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${item?.imageUrl}`;
                                    }}
                                    alt={item?.title}
                                    className="rounded cartitems-product-img img-fluid"
                                    width="100px"
                                />
                            </div>
                            <div className="col">{item?.title}</div>
                            <div className="col">₹ {item?.price}.00</div>
                            <div className="col">
                                <p className="m-0">1</p>
                            </div>
                            <div className="col">₹ {item?.price}.00</div>
                            <div className="col">
                                <i
                                    className="bi bi-trash3-fill"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => removeFromCart(item?.cartItemId)}
                                ></i>
                            </div>
                        </div>
                        <hr />
                    </div>
                );
            })}
            <div className="row justify-content-between my-5">
                <div className="col-md-4 mb-4">
                    <h1 className="mb-5">Cart Totals</h1>
                    <div>
                        <div className="d-flex justify-content-between py-2">
                            <p className="mb-0">Subtotal</p>
                            <p className="mb-0">₹{subTotal}.00</p>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between py-2">
                            <p className="mb-0">Shipping Fee</p>
                            <p className="mb-0">Free</p>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between py-2 fw-bold">
                            <h5>Total</h5>
                            <h5>₹{subTotal}</h5>
                        </div>
                    </div>
                    <div className="mt-3">
                        <button
                            className="btn btn-success btn-md w-100"
                            onClick={placeOrder}
                        >
                            Proceed to Pay ₹{subTotal}
                        </button>
                        <button
                            className="btn btn-danger btn-md w-100 mt-3"
                            onClick={() => navigate("/orders")}
                        >
                            Check your recent orders
                        </button>
                    </div>
                    <ToastMessage message={"Order is Placed"} />
                </div>
                <div className="col-md-6">
                    <p>If you have a promo code, Enter it here</p>
                    <div className="d-flex bg-light rounded overflow-hidden cartitems-promobox">
                        <input
                            type="text"
                            className="form-control border me-2"
                            placeholder="Promo code"
                        />
                        <button className="btn btn-dark cartitems-promobutton">
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItems;
