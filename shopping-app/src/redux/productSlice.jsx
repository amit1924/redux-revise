/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Declare initial state for the product slice
const initialState = {
  products: [], // Array to store products
  status: "idle", // Status of the fetch request (idle, loading, success, failed)
  error: null, // Error message if the fetch request fails
};

// Create an async thunk to fetch products from the API
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get("https://fakestoreapi.com/products"); // Make a GET request to the API
    return response.data; // Return the data from the API
  }
);

// Create the product slice
const productSlice = createSlice({
  name: "product", // Name of the slice
  initialState, // Initial state defined above
  reducers: {}, // Empty reducers object since we are not defining any reducer functions here
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading"; // Set status to loading when the fetch request is pending
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "success"; // Set status to success when the fetch request is fulfilled
        state.products = action.payload; // Set products to the data returned from the API
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed"; // Set status to failed when the fetch request is rejected
        state.error = action.error.message; // Set error to the error message from the rejected action
      });
  },
});

// Export the reducer from the product slice
export default productSlice.reducer;

//  builder is an API provided by the createSlice function to define additional reducer logic for handling actions outside of the slice's own reducers field. Specifically, it is used within the extraReducers field to handle actions created by createAsyncThunk or other action creators that are not part of the slice.
