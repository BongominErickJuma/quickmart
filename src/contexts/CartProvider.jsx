import React, { createContext, useReducer } from "react";

const CartContext = createContext();

const initialState = {
  confirmOrder: false,
  cart: [],
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingCartItemIndex = state.cart.findIndex(
        (cartItem) => cartItem.name === action.payload.name
      );

      const existingCartItem = state.cart[existingCartItemIndex];

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          count: existingCartItem.count + 1,
        };
        const updatedCartItems = [...state.cart];
        updatedCartItems[existingCartItemIndex] = updatedItem;
        return {
          ...state,
          cart: updatedCartItems,
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, { ...action.payload, count: 1 }],
        };
      }
    }
    case "SUBTRACT_ITEM":
      {
        const existingCartItemIndex = state.cart.findIndex(
          (cartItem) => cartItem.name === action.payload.name
        );
        const existingCartItem = state.cart[existingCartItemIndex];

        if (existingCartItem) {
          const updatedItem = {
            ...existingCartItem,
            count: existingCartItem.count - 1,
          };
          const updatedCartItems = [...state.cart];
          updatedCartItems[existingCartItemIndex] = updatedItem;
          return {
            ...state,
            cart: updatedCartItems,
          };
        } else {
          return {
            ...state,
            cart: state.cart.filter(
              (cartItem) => cartItem.name !== action.payload.name
            ),
          };
        }
      }
      "";
    case "REMOVE": {
      return {
        ...state,
        cart: state.cart.filter(
          (cartItem) => cartItem.name !== action.payload.name
        ),
      };
    }
    case "CLEAR": {
      return {
        confirmOrder: false,
        cart: [],
      };
    }
    default: {
      return "Action not allowed";
    }
  }
};
const CartProvider = ({ children }) => {
  const [{ confirmOrder, cart }, dispatch] = useReducer(
    cartReducer,
    initialState
  );

  const handleAddToCart = (item) => {
    dispatch({ type: "ADD_ITEM", payload: item });
  };

  const handleSubtractToCart = (item) => {
    dispatch({ type: "SUBTRACT_ITEM", payload: item });
  };

  const handleDeleteFromCart = (item) => {
    dispatch({ type: "REMOVE", payload: item });
  };

  const handleClearItemsFromCart = () => {
    dispatch({ type: "CLEAR" });
  };

  return (
    <CartContext.Provider
      value={{
        confirmOrder,
        cart,
        handleAddToCart,
        handleSubtractToCart,
        handleDeleteFromCart,
        handleClearItemsFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartProvider, CartContext };
