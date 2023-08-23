"use client";

import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "./Slice/productSlice";
import voucherSlice from "./Slice/voucherSlice";

export const store = configureStore({
  reducer: {
    product: ProductReducer,
    voucher:voucherSlice
  },
});

export default store;
