/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../redux/productSlice";
import { addToCart } from "../redux/cartSlice";

addToCart;

const Products = () => {
  const dispatch = useDispatch();

  // Extracting the necessary pieces of state from the Redux store
  const items = useSelector((state) => state.product.products); // Accessing products from state
  const status = useSelector((state) => state.product.status); // Accessing status from state
  const error = useSelector((state) => state.product.error); // Accessing error from state

  // useEffect hook to dispatch fetchProducts when the component mounts
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  // Conditional rendering based on the status
  if (status === "loading") {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (status === "failed") {
    return <div className="text-center text-red-500 mt-10">Error: {error}</div>; // Display error if fetch failed
  }

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-gray-600 mt-2">${item.price}</p>
              <button
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
                onClick={() => dispatch(addToCart(item))}
              >
                Add To Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;

// useSelector: Allows you to extract data from the Redux store state.
// useDispatch: Allows you to dispatch actions to the Redux store.
