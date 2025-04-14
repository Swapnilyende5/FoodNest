import { createContext, useState } from "react";


export const RestaurantContext = createContext(null);

const RestaurantContextProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [auth, setAuth] = useState({
        token: ''
    });

    const contextValues = {
        isAuthenticated, setIsAuthenticated, auth, setAuth
    }
    return (
        <RestaurantContext.Provider value={contextValues}>
            {children}
        </RestaurantContext.Provider>
    )
}

export default RestaurantContextProvider;