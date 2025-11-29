import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "./api/apiSlice";
import authReducer from "./features/auth/authSlice";
import favoritesReducer from "../redux/features/favorites/favoriteSlice";
import cartReducer from "../redux/features/cart/cartSlice";
import shopReducer from "../redux/features/shop/shopSlice";
import { cartSyncMiddleware } from "./middleware/cartSyncMiddleware";

const getInitialFavorites = () => {
  const userInfo = localStorage.getItem("userInfo");
  if (userInfo) {
    try {
      const parsed = JSON.parse(userInfo);
      return parsed.favorites || [];
    } catch (error) {
      return [];
    }
  }
  return [];
};

const initialFavorites = getInitialFavorites();

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    favorites: favoritesReducer,
    cart: cartReducer,
    shop: shopReducer,
  },
  preloadedState: {
    favorites: initialFavorites,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiSlice.middleware)
      .concat(cartSyncMiddleware),
  devTools: true,
});

setupListeners(store.dispatch);
export default store;
