import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import axiosInstance from "../../axiosInstance";

export const RestaurantContext = createContext(null);

const RestaurantContextProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [selectedRes, setSelectedRes] = useState({});
    const [addedItem, setAddedItem] = useState(() => {
        const storedCart = localStorage.getItem("cartitems");
        return storedCart ? JSON.parse(storedCart) : [];
    });
    const [subTotal, setSubTotal] = useState(0)
    const [addedItemToast, setAddedItemToast] = useState({})
    const [resIdForFeedback, setResIdForFeedback] = useState("")
    const [userDetails, setUserDetails] = useState({})

    useEffect(() => {
        const getUserData = async () => {
            try {
                const getUser = await axiosInstance.get("/user/getuser");
                setUserDetails(getUser.data.user)
            } catch (error) {
                const errorMsg =
                    error.response?.data?.message ||
                    "Failed getting user data. Please try again.";
                console.log("getUserError", errorMsg);
            }
        }
        getUserData();
    }, [])

    useEffect(() => {
        const total = addedItem.reduce((acc, item) => acc + item?.price, 0)
        setSubTotal(total)
    }, [addedItem])

    const addToCart = useCallback((item, id) => {
        const cartItemId = Date.now() + Math.random();
        const updatedCart = [...addedItem, { ...item, cartItemId, restaurantId: id }]
        setAddedItem(updatedCart)
        setAddedItemToast(item)
        localStorage.setItem("cartitems", JSON.stringify(updatedCart));
        const toast = document.getElementById("toast");
        toast.classList.add("show");
        setTimeout(() => {
            toast.classList.remove("show")
        }, 3000);
    }, [addedItem])

    const removeFromCart = useCallback((id) => {
        const updatedCart = addedItem.filter((item) => item?.cartItemId !== id);
        setAddedItem(updatedCart);
        localStorage.setItem("cartitems", JSON.stringify(updatedCart));
    }, [addedItem]);

    const handleFeedback = useCallback((id) => {
        setResIdForFeedback(id)
    }, [])

    const contextValues = useMemo(
        () => ({
            isAuthenticated,
            setIsAuthenticated,
            selectedRes,
            setSelectedRes,
            addedItem,
            addedItemToast,
            setAddedItem,
            addToCart,
            removeFromCart,
            subTotal,
            handleFeedback,
            resIdForFeedback,
            userDetails,
            setUserDetails,
        }),
        [
            isAuthenticated,
            setIsAuthenticated,
            selectedRes,
            setSelectedRes,
            addedItem,
            addedItemToast,
            setAddedItem,
            addToCart,
            removeFromCart,
            subTotal,
            handleFeedback,
            resIdForFeedback,
            userDetails,
            setUserDetails,
        ]
    );

    return (
        <RestaurantContext.Provider value={contextValues}>
            {children}
        </RestaurantContext.Provider>
    );
};

export default RestaurantContextProvider;
