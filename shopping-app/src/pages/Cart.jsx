/* eslint-disable no-unused-vars */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../redux/cartSlice";
const Cart = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Cart</h1>
      <p className="text-lg mb-2">Total Items: {totalQuantity}</p>
      <p className="text-lg mb-4">Total Amount: ${totalAmount.toFixed(2)}</p>
      {items.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty</p>
      ) : (
        items.map((product) => (
          <div
            key={product.id}
            className="flex items-center justify-between border-b border-gray-300 py-4"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-16 h-16 object-cover rounded"
            />
            <p className="flex-1 ml-4 text-lg">{product.title}</p>
            <p className="text-lg font-semibold">{product.quantity}</p>
            <button
              className="ml-4 inline-flex items-center justify-center px-4 py-2 font-sans font-semibold tracking-wide text-white bg-red-500 rounded-lg hover:bg-red-600 transition duration-300"
              onClick={() => dispatch(removeFromCart(product.id))}
            >
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;
