import React, { useContext, useState } from "react";
import "./Cart.scss"; // (new smaller CSS file)
import { RestaurantContext } from "../context/restaurantContext";

const CartItems = () => {
    const [toast, setToast] = useState("");
    const { addFood } = useContext(RestaurantContext)

    console.log(addFood)
    // const handleCheckout = () => {
    //     const message = getSubTotal()
    //         ? "Your order has been confirmed! 🚀 Expect delivery soon."
    //         : "⚠️ Oops! No items in your cart. Start shopping now!";

    //     setToast(message);
    //     const button = document.getElementById("toast");
    //     button.classList.add("show");
    //     setTimeout(() => {
    //         button.classList.remove("show");
    //     }, 3000);
    // };

    return (
        <div className="container cartitems">
            {/* {!!getSubTotal() && ( */}
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
            {/* )} */}
            {addFood?.map((item, index) => {
                return (
                    <div key={index}>
                        <div className="row align-items-center text-center py-2 fw-medium cartitems-row">
                            <div className="col">
                                <img src={item?.imageId ? `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${item?.imageId}` : '/foodstore-icon.png'} alt="" className="cartitems-product-img img-fluid" width='100px' />
                            </div>
                            <div className="col">{item?.title}</div>
                            <div className="col">₹ {item?.price / 100}.00</div>
                            <div className="col">
                                <button className="btn cartitems-quantity">{item?.quantity}</button>
                            </div>
                            <div className="col">₹ {item?.price / 100 * item?.price / 100}</div>
                            <div className="col">
                                {/* <img
                                    src={remove_icon}
                                    alt=""
                                    className="cartitems-remove-icon"
                                    onClick={() => removeFromCart(id, size)}
                                /> */}
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
                            <p className="mb-0">$'getSubTotal()'</p>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between py-2">
                            <p className="mb-0">Shipping Fee</p>
                            <p className="mb-0">Free</p>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between py-2 fw-bold">
                            <h5>Total</h5>
                            <h5>$getSubTotal()</h5>
                        </div>
                    </div>
                    <div className="mt-3">
                        {/* <MainButton
                            btnTitle="PROCEED TO CHECKOUT"
                            handleClick={handleCheckout}
                            isHomeButton
                        />
                        <ToastMessage message={toast} /> */}
                    </div>
                </div>
                <div className="col-md-6">
                    <p>If you have a promo code, Enter it here</p>
                    <div className="d-flex bg-light rounded overflow-hidden cartitems-promobox">
                        <input
                            type="text"
                            className="form-control border me-2"
                            placeholder="Promo code"
                        />
                        <button className="btn btn-dark cartitems-promobutton">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItems;
