import { BrowserRouter, Link, Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar.jsx"
import Register from "./pages/Register.jsx"
import Login from "./pages/Login.jsx"
import { useContext, useEffect } from "react";
import { RestaurantContext } from "./context/restaurantContext.jsx";

function App() {
  const { setAuth, setIsAuthenticated } = useContext(RestaurantContext);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true)
      setAuth({
        token,
      });
    }
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

      </Routes>
    </>
  )
}

export default App
