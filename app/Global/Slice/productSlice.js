"use client";
import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [], 
  },
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    // Add more reducer functions as needed
  },
});

export const { addProduct } = productSlice.actions;
export default productSlice.reducer;
