import { Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Register from "./pages/Auth/Register.jsx";
import Login from "./pages/Auth/Login.jsx";
import { useContext, useEffect } from "react";
import { RestaurantContext } from "./context/restaurantContext.jsx";
import { jwtDecode } from "jwt-decode";
import Home from "./pages/Home/Home.jsx";
import RestaurantMenu from "./pages/Client/RestaurantMenu.jsx";
import HomeGuest from "./pages/Auth/HomeGuest.jsx";
import UserProfile from "./pages/Client/UserProfile.jsx";
import Cart from "./pages/Client/Cart.jsx";
import MyOrders from "./pages/Client/MyOrders.jsx";
import RegisterRestaurant from "./pages/Vendor/RegisterRestaurant.jsx";
import RestaurantProfile from "./pages/Vendor/RestaurantProfile.jsx";
import MyRestaurantMenu from "./pages/Vendor/MyRestaurantMenu.jsx";
import AddFeedback from "./pages/Client/AddFeedback.jsx";
import Footer from "./components/Footer.jsx";
import CustomerFeedback from "./pages/Vendor/CustomerFeedback.jsx";
import PastOrders from "./pages/Vendor/PastOrders.jsx";

function App() {
  const { isAuthenticated, setIsAuthenticated } = useContext(RestaurantContext);
  const userType = localStorage.getItem("usertype");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    function isTokenExpired(token) {
      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        return decoded.exp < currentTime;
      } catch (err) {
        return err;
      }
    }

    const publicPaths = ["/login", "/register", "/", "/registerRestaurant"];
    const currentPath = window.location.pathname;

    if (!token || isTokenExpired(token)) {
      localStorage.removeItem("token");
      setIsAuthenticated(false);

      if (!publicPaths.includes(currentPath)) {
        navigate("/login");
      }
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate, setIsAuthenticated]);


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
          element={<Login />}
        />
        <Route path="/" element={<Home />} />
        {isAuthenticated && userType === "client" && (
          <>
            <Route path="/restaurant" element={<RestaurantMenu />}>
              <Route path=":restaurantId" element={<RestaurantMenu />} />
            </Route>
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<MyOrders />} />
            <Route path="/feedback" element={<AddFeedback />} />
          </>
        )}
        {isAuthenticated && userType === "vendor" && (
          <>
            <Route path="/restaurant/profile" element={<RestaurantProfile />} />
            <Route path="/restaurant" element={<MyRestaurantMenu />}>
              <Route path=":restaurantId" element={<MyRestaurantMenu />} />
            </Route>
            <Route path="/restaurant/feedback" element={<CustomerFeedback />} />
            <Route path="/restaurant/orders" element={<PastOrders />} />
            PastOrders
          </>
        )}
      </Routes>
      {isAuthenticated && <Footer />}
    </>
  );
}

export default App;
