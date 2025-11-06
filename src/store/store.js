import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../features/productsSlice";
import cartWishlistReducer from "../features/cartWishlistSlice";
import userReducer from "../features/userSlice";

const persistedCartWishlist = (() => {
  try {
    const savedState = localStorage.getItem("ujaas-cart-wishlist");
    return savedState ? JSON.parse(savedState) : undefined;
  } catch (error) {
    console.warn("Failed to load cart/wishlist from localStorage:", error);
    return undefined;
  }
})();

// 🏗 Configure store with preloaded persisted state
export const store = configureStore({
  reducer: {
    user: userReducer,
    products: productsReducer,
    cartWishlist: cartWishlistReducer,
  },
  preloadedState: persistedCartWishlist
    ? { cartWishlist: persistedCartWishlist }
    : undefined,
});

// 💾 Subscribe to store changes → save cart/wishlist to localStorage
store.subscribe(() => {
  try {
    const state = store.getState().cartWishlist;
    localStorage.setItem("ujaas-cart-wishlist", JSON.stringify(state));
  } catch (error) {
    console.warn("Failed to save cart/wishlist to localStorage:", error);
  }
});

export default store;
