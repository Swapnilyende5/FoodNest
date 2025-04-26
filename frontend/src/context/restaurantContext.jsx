import { createContext, useMemo, useState } from "react";


export const RestaurantContext = createContext(null);

const RestaurantContextProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [auth, setAuth] = useState({
        token: ''
    });
    const [selectedRes, setSelectedRes] = useState({});

    const contextValues = useMemo(() => ({ isAuthenticated, setIsAuthenticated, auth, setAuth, selectedRes, setSelectedRes }), [isAuthenticated, setIsAuthenticated, auth, setAuth, selectedRes, setSelectedRes]);

    return (
        <RestaurantContext.Provider value={contextValues}>
            {children}
        </RestaurantContext.Provider>
    )
}

export default RestaurantContextProvider;