import { createContext, useMemo, useState } from "react";


export const RestaurantContext = createContext(null);

const RestaurantContextProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [auth, setAuth] = useState({
        token: ''
    });
    const [selectedRes, setSelectedRes] = useState({});
    const [addFood, setAddFood] = useState([]);


    const contextValues = useMemo(() => ({ isAuthenticated, setIsAuthenticated, auth, setAuth, selectedRes, setSelectedRes, addFood, setAddFood }), [isAuthenticated, setIsAuthenticated, auth, setAuth, selectedRes, setSelectedRes, addFood, setAddFood]);

    return (
        <RestaurantContext.Provider value={contextValues}>
            {children}
        </RestaurantContext.Provider>
    )
}

export default RestaurantContextProvider;