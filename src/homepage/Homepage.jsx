import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import Products from "../Products/Products";

const Homepage = () => {
  const [products, setProducts] = useState(null);
  const { pending, error, fetchData } = useFetch(
    "https://jwt-server-test-bongominerickjuma.onrender.com/products"
  );

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetchData({
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response) {
        setProducts(response);
      }
    };

    fetchProducts();
  }, [fetchData]); // Depend on token and fetchData

  return (
    <div className="px-4 mt-24 py-2">
      <>
        <h1 className="text-center uppercase text-forest-green text-2xl my-3">
          Items in store
        </h1>
        {pending && (
          <p className="text-center text-forest-green my-3">Loading data...</p>
        )}
        {error && <p className="text-center text-burnt-sienna">{error}</p>}
      </>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products &&
          products.map((product, ind) => (
            <Products key={ind} product={product} />
          ))}
      </div>
    </div>
  );
};

export default Homepage;
