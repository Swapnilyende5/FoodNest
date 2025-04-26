import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar.jsx"
import Register from "./pages/Register.jsx"
import Login from "./pages/Login.jsx"
import { useContext, useEffect } from "react";
import { RestaurantContext } from "./context/restaurantContext.jsx";
import Home from "./pages/Home.jsx";
import RestaurantMenu from "./pages/RestaurantMenu.jsx";
import HomeGuest from "./pages/HomeGuest.jsx";

function App() {

  const { isAuthenticated, setIsAuthenticated } = useContext(RestaurantContext);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true)
    }
  }, [setIsAuthenticated]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/register" element={!isAuthenticated ? <Register /> : <Home />} />
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Home />} />
        {/* <Route path="/" element={isAuthenticated ? <Home /> : <HomeGuest />} /> */}
        {/* {isAuthenticated && <> */}
        <Route path="/" element={<Home />} />
        <Route path="/restaurant" element={<RestaurantMenu />}>
          <Route path=":restaurantId" element={<RestaurantMenu />} />
        </Route>
        {/* </>} */}
      </Routes>
    </>
  )
}

export default App
