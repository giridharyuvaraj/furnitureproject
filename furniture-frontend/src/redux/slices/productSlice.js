import { createSlice } from "@reduxjs/toolkit";
import products from "../../data/product.json";

/*
  Temporary product slice
  Backend API will replace this
*/

const productSlice = createSlice({
  name: "products",
  initialState: {
    productList: products
  },
  reducers: {}
});

export default productSlice.reducer;
