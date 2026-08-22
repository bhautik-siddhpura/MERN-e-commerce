import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "../redux/cartSlice.jsx";
// import authReducer from "./authSlice";
// import productReducer from "./productSlice";

const store = configureStore({
    reducer: {
        cart: cartReducer,
        // auth: authReducer,
        // product: productReducer,
    },
});

export default store;