import { useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  addToFavorites,
  removeFromFavorites,
  setFavorites,
} from "../../redux/features/favorites/favoriteSlice";
import { useUpdateFavoritesMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";

const HeartIcon = ({ product }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites) || [];
  const { userInfo } = useSelector((state) => state.auth);
  const [updateFavoritesApi] = useUpdateFavoritesMutation();
  const isFavorite = favorites.includes(product._id);

  useEffect(() => {
    if (userInfo && userInfo.favorites) {
      dispatch(setFavorites(userInfo.favorites));
    } else if (userInfo) {
      dispatch(setFavorites([]));
    }
  }, [userInfo, dispatch]);

  const toggleFavorites = async () => {
    if (!userInfo) {
      toast.error("Please login to add products to favorites");
      return;
    }

    try {
      let updatedFavorites;
      if (isFavorite) {
        updatedFavorites = favorites.filter((id) => id !== product._id);
        dispatch(removeFromFavorites(product._id));
      } else {
        updatedFavorites = [...favorites, product._id];
        dispatch(addToFavorites(product._id));
      }

      const updatedUser = await updateFavoritesApi(updatedFavorites).unwrap();
      dispatch(setCredentials(updatedUser));
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update favorites");
      if (isFavorite) {
        dispatch(addToFavorites(product._id));
      } else {
        dispatch(removeFromFavorites(product._id));
      }
    }
  };

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
