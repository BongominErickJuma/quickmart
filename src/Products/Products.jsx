import React from "react";
import AddToCartBtn from "../buttons/AddToCartBtn";
import IncrementDecrementBtn from "../buttons/IncrementDecrementBtn";
import useCart from "../hooks/useCart";
const Products = ({ product }) => {
  const { cart } = useCart();
  const targetCartItemIndex = cart.findIndex(
    (cart) => cart.name === product.name
  );
  const targetCartItem = cart[targetCartItemIndex];

  const count = targetCartItem?.count || 0;

  return (
    <div className="w-full max-w-sm rounded-lg shadow-sm bg-forest-green">
      <img src={product.image} alt={product.name} className="rounded-t-lg" />
      <div className="px-5 pb-5">
        <h5 className="text-xl text-pale-lime">{product.name}</h5>

        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold gradient-word">
            ${product.price}
          </span>
          {count > 0 ? (
            <IncrementDecrementBtn item={product} count={count} />
          ) : (
            <AddToCartBtn product={product} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
