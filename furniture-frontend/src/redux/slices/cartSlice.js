import { createSlice } from "@reduxjs/toolkit";

/*
  initialState:
  cartItems = []
*/

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: []
  },
  reducers: {
    // Add product to cart
    addToCart: (state, action) => {
      const item = action.payload;

      // Check if item already exists
      const existingItem = state.cartItems.find(
        (x) => x.id === item.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({ ...item, quantity: 1 });
      }
    },

    // Remove product
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
    },

    // Increase quantity
    increaseQty: (state, action) => {
      const item = state.cartItems.find(
        (x) => x.id === action.payload
      );
      if (item) item.quantity += 1;
    },

    // Decrease quantity
    decreaseQty: (state, action) => {
      const item = state.cartItems.find(
        (x) => x.id === action.payload
      );
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },

    clearCart: (state) => {
      state.cartItems = [];
    }
  }
});

export const {
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart
} = cartSlice.actions;

export default cartSlice.reducer;
