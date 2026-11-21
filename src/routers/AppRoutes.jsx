import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Homepage from "../pages/Homepage";
import Aboutpage from "../pages/Aboutpage";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Contactpage from "../pages/contactpage";
import Cartpage from "../pages/Cartpage";
import Checkoutpage from "../pages/Checkoutpage";
import Ordersuccess from "../pages/Ordersuccess";

function AppRoutes() {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/about" element={<Aboutpage />} />

      <Route path="/signup" element={
        <Signup onLogin={() => navigate("/login")} />
      } />

      <Route path="/login" element={
        <Login
          onLogin={() => navigate("/")}
          onSignup={() => navigate("/signup")}
        />
      } />

      <Route path="/contact" element={<Contactpage />} />
      <Route path="/cart" element={<Cartpage />} />
      <Route path="/checkout" element={<Checkoutpage />} />
      <Route path="/order-success" element={<Ordersuccess />} />

      <Route path="*" element={<h2>404 - Page Not Found</h2>} />
    </Routes>
  );
}

export default AppRoutes;
