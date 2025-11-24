import { useEffect } from "react";
import { FaHeart, FaRegHeart, FaVaadin } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  addToFavorites,
  removeFromFavorites,
  setFavorites,
} from "../../redux/features/favorites/favoriteSlice";

import {
  addFavoriteToLocalStorage,
  getFavoritesFromLocalStorage,
  removeFavoriteFromLocalStorage,
} from "../../utils/localStorage";

const HeartIcon = ({ product }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites) || [];
  const { userInfo } = useSelector((state) => state.auth);
  const isFavorite = favorites.some((p) => p._id === product._id);

  useEffect(() => {
    if (userInfo) {
      const favoritesFromLocalStorage = getFavoritesFromLocalStorage();
      dispatch(setFavorites(favoritesFromLocalStorage));
    }
  }, [userInfo, dispatch]);

  const toggleFavorites = () => {
    if (!userInfo) {
      toast.error("Please login to add products to favorites");
      return;
    }

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

  // Don't render the heart icon if user is not logged in
  if (!userInfo) {
    return null;
  }

  return (
    <div
      className="absolute top-2 right-2 z-10 cursor-pointer rounded-full bg-white/80 p-1 shadow-sm backdrop-blur-sm transition-all hover:bg-white hover:scale-110 dark:bg-slate-900/80 dark:hover:bg-slate-900 sm:top-3 sm:right-3 sm:p-1.5"
      onClick={toggleFavorites}
    >
      {isFavorite ? (
        <FaHeart className="h-3.5 w-3.5 text-pink-500 sm:h-[18px] sm:w-[18px]" />
      ) : (
        <FaRegHeart className="h-3.5 w-3.5 text-gray-700 dark:text-gray-300 sm:h-[18px] sm:w-[18px]" />
      )}
    </div>
  );
};

export default HeartIcon;
