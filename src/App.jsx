import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./homepage/Homepage";
import Navbar from "./navigation/Navbar";
import SignUp from "./signup/SignUp";
import Login from "./login/Login";
import Cart from "./cart/Cart";

const App = () => {
  return (
    <>
      <Navbar />
      <hr />
      <Routes>
        <Route exact path="/quickmart" element={<Homepage />} />
        <Route path="/quickmart/signup" element={<SignUp />} />
        <Route path="/quickmart/login" element={<Login />} />
        <Route path="/quickmart/cart" element={<Cart />} />
      </Routes>
    </>
  );
};

export default App;
