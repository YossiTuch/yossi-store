import { useEffect } from "react";
import { FaHeart, FaRegHeart, FaVaadin } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
  addToFavorites,
  removeFromFavorites,
  setFavorites,
} from "../../redux/features/favorites/favoriteSlice";

import {
  addFavoriteToLocalStorage,
  getFavoritesFromLocalStorage,
  removeFavoriteFromLocalStorage,
} from "../../../utils/localStorage";

const HeartIcon = ({ product }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites) || [];
  const isFavorite = favorites.some((p) => p._id === product._id);

  useEffect(() => {
    const favoritesFromLocalStorage = getFavoritesFromLocalStorage();
    dispatch(setFavorites(favoritesFromLocalStorage));
  }, []);

  const toggleFavorites = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(product));
      // remove the product from the localStorage as well
      removeFavoriteFromLocalStorage(product._id);
    } else {
      dispatch(addToFavorites(product));
      // add the product to localStorage as well
      addFavoriteToLocalStorage(product);
    }
  };

  return (
    <div
      className="absolute top-2 right-2 z-10 cursor-pointer rounded-full bg-white/80 p-1.5 shadow-sm backdrop-blur-sm transition-all hover:bg-white hover:scale-110 dark:bg-slate-900/80 dark:hover:bg-slate-900 sm:top-3 sm:right-3"
      onClick={toggleFavorites}
    >
      {isFavorite ? (
        <FaHeart className="text-pink-500" size={18} />
      ) : (
        <FaRegHeart className="text-gray-700 dark:text-gray-300" size={18} />
      )}
    </div>
  );
};

export default HeartIcon;
