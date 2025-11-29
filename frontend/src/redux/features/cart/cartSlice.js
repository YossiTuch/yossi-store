import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../../../utils/cartUtils";

const getInitialState = () => {
  try {
    const localCart = localStorage.getItem("cart");
    return localCart
      ? JSON.parse(localCart)
      : { cartItems: [], shippingAddress: {}, paymentMethod: "PayPal" };
  } catch (error) {
    localStorage.removeItem("cart");
    return { cartItems: [], shippingAddress: {}, paymentMethod: "PayPal" };
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState: getInitialState(),
  reducers: {
    addToCart: (state, action) => {
      const { user, rating, numReviews, reviews, ...item } = action.payload;
      const existItem = state.cartItems.find((cartItem) => cartItem._id === item._id);

      if (existItem) {
        state.cartItems = state.cartItems.map((cartItem) =>
          cartItem._id === existItem._id ? { ...cartItem, qty: item.qty } : cartItem,
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      return updateCart(state, true);
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload,
      );
      return updateCart(state, true);
    },

    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
      return state;
    },

    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
      return state;
    },

    clearCartItems: (state, action) => {
      state.cartItems = [];
      return updateCart(state, true);
    },

    setCartFromBackend: (state, action) => {
      const backendCart = action.payload;
      state.cartItems = backendCart.cartItems || [];
      state.shippingAddress = backendCart.shippingAddress || {};
      state.paymentMethod = backendCart.paymentMethod || "PayPal";
      state.itemsPrice = backendCart.itemsPrice || "0.00";
      state.shippingPrice = backendCart.shippingPrice || "0.00";
      state.taxPrice = backendCart.taxPrice || "0.00";
      state.totalPrice = backendCart.totalPrice || "0.00";
      return state;
    },

    mergeCarts: (state, action) => {
      const backendCart = action.payload;
      const localCartItems = state.cartItems || [];
      const backendCartItems = backendCart.cartItems || [];

      const mergedItems = [...backendCartItems];
      localCartItems.forEach((localItem) => {
        const existingItem = mergedItems.find((item) => item._id === localItem._id);
        if (!existingItem) {
          mergedItems.push(localItem);
        }
      });

      state.cartItems = mergedItems;
      state.shippingAddress = backendCart.shippingAddress || state.shippingAddress || {};
      state.paymentMethod = backendCart.paymentMethod || state.paymentMethod || "PayPal";
      
      return updateCart(state, true);
    },

    saveCartToLocalStorage: (state) => {
      localStorage.setItem("cart", JSON.stringify(state));
      return state;
    },

    resetCart: (state) => {
      const newState = getInitialState();
      return newState;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  savePaymentMethod,
  saveShippingAddress,
  clearCartItems,
  setCartFromBackend,
  mergeCarts,
  saveCartToLocalStorage,
  resetCart,
} = cartSlice.actions;

export default cartSlice.reducer;
