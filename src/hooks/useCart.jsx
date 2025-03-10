import React, { useContext } from "react";
import { CartContext } from "../contexts/CartProvider";

const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined)
    throw new Error("CartContext was used outside of CartProvider");
  return context;
};

export default useCart;
