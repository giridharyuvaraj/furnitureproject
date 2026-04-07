import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import authReducer from "./slices/authSlice";

/*
  configureStore:
  - Combines all slices
  - Creates global store
*/

const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer
  }
});

export default store;
