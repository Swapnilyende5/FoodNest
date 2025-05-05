import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Register from "./pages/Auth/Register.jsx";
import Login from "./pages/Auth/Login.jsx";
import { useContext, useEffect } from "react";
import { RestaurantContext } from "./context/restaurantContext.jsx";
import Home from "./pages/Home/Home.jsx";
import RestaurantMenu from "./pages/Client/RestaurantMenu.jsx";
import HomeGuest from "./pages/Auth/HomeGuest.jsx";
import UserProfile from "./pages/Client/UserProfile.jsx";
import Cart from "./pages/Client/Cart.jsx";
import MyOrders from "./pages/Client/MyOrders.jsx";
import RegisterRestaurant from "./pages/Vendor/RegisterRestaurant.jsx";
import RestaurantProfile from "./pages/Vendor/RestaurantProfile.jsx";
import MyRestaurantMenu from "./pages/Vendor/MyRestaurantMenu.jsx";

function App() {
  const { isAuthenticated, setIsAuthenticated } = useContext(RestaurantContext);
  const userType = localStorage.getItem("usertype");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, [setIsAuthenticated]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/register"
          element={<Register />}
        />
        <Route path="/registerRestaurant" element={<RegisterRestaurant />} />
        <Route
          path="/login"
          element={!isAuthenticated ? <Login /> : <Home />}
        />
        <Route path="/" element={isAuthenticated ? <Home /> : <HomeGuest />} />
        {isAuthenticated && userType === "client" && (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/restaurant" element={<RestaurantMenu />}>
              <Route path=":restaurantId" element={<RestaurantMenu />} />
            </Route>
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<MyOrders />} />
          </>
        )}
        {isAuthenticated && userType === "vendor" && (
          <>
            <Route path="/restaurant/profile" element={<RestaurantProfile />} />
            <Route path="/restaurant" element={<MyRestaurantMenu />}>
              <Route path=":restaurantId" element={<MyRestaurantMenu />} />
            </Route>
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
