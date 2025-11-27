import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
  name: "favorites",
  initialState: [],
  reducers: {
    addToFavorites: (state, action) => {
      const productId = action.payload;
      if (!state.includes(productId)) {
        state.push(productId);
      }
    },
    removeFromFavorites: (state, action) => {
      const productId = action.payload;
      return state.filter((id) => id !== productId);
    },
    setFavorites: (state, action) => {
      return action.payload || [];
    },
  },
});

export const { addToFavorites, removeFromFavorites, setFavorites } =
  favoriteSlice.actions;
export const selectFavoriteProduct = (state) => state.favorites;
export default favoriteSlice.reducer;
