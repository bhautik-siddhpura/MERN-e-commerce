import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
};

const saveCart = (cartItems) => {
  localStorage.setItem(
    "cartItems",
    JSON.stringify(cartItems)
  );
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    // ==========================
    // Add Product to Cart
    // ==========================
    addToCart: (state, action) => {
      const item = action.payload;

      const existItem = state.cartItems.find(
        (x) => x._id === item._id
      );

      if (existItem) {
        if (existItem.quantity < existItem.stock) {
          existItem.quantity += item.quantity || 1;
        }
      } else {
        state.cartItems.push({
          ...item,
          quantity: item.quantity || 1,
        });
      }

      saveCart(state.cartItems);
    },

    // ==========================
    // Increase Quantity
    // ==========================
    increaseQuantity: (state, action) => {
      const item = state.cartItems.find(
        (x) => x._id === action.payload
      );

      if (item && item.quantity < item.stock) {
        item.quantity += 1;
      }

      saveCart(state.cartItems);
    },

    // ==========================
    // Decrease Quantity
    // ==========================
    decreaseQuantity: (state, action) => {
      const item = state.cartItems.find(
        (x) => x._id === action.payload
      );

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }

      saveCart(state.cartItems);
    },

    // ==========================
    // Remove Product
    // ==========================
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (x) => x._id !== action.payload
      );

      saveCart(state.cartItems);
    },

    // ==========================
    // Clear Cart
    // ==========================
    clearCart: (state) => {
      state.cartItems = [];

      localStorage.removeItem("cartItems");
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;