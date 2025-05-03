import { createContext, useCallback, useEffect, useMemo, useState } from "react";

export const RestaurantContext = createContext(null);

const RestaurantContextProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [auth, setAuth] = useState({
        token: "",
    });
    const [selectedRes, setSelectedRes] = useState({});
    const [addedItem, setAddedItem] = useState(() => {
        const storedCart = localStorage.getItem("cartitems");
        return storedCart ? JSON.parse(storedCart) : [];
    });
    const [subTotal, setSubTotal] = useState(0)
    const [addedItemToast, setAddedItemToast] = useState({})

    useEffect(() => {
        const total = addedItem.reduce((acc, item) => acc + item.price, 0)
        setSubTotal(total / 100)
    }, [addedItem])

    const addToCart = useCallback((item) => {
        const cartItemId = Date.now() + Math.random();
        const updatedCart = [...addedItem, { ...item, cartItemId }]
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
        const updatedCart = addedItem.filter((item) => item.cartItemId !== id);
        setAddedItem(updatedCart);
        localStorage.setItem("cartitems", JSON.stringify(updatedCart));
    }, [addedItem]);

    const contextValues = useMemo(
        () => ({
            isAuthenticated,
            setIsAuthenticated,
            auth,
            setAuth,
            selectedRes,
            setSelectedRes,
            addedItem,
            addedItemToast,
            setAddedItem,
            addToCart,
            removeFromCart,
            subTotal
        }),
        [
            isAuthenticated,
            setIsAuthenticated,
            auth,
            setAuth,
            selectedRes,
            setSelectedRes,
            addedItem,
            addedItemToast,
            setAddedItem,
            addToCart,
            removeFromCart,
            subTotal
        ]
    );

    return (
        <RestaurantContext.Provider value={contextValues}>
            {children}
        </RestaurantContext.Provider>
    );
};

export default RestaurantContextProvider;
