import { useSelector } from "react-redux";

const FavoritesCount = () => {
  const favorites = useSelector((state) => state.favorites);
  const favoriteCount = favorites.length;

  if (favoriteCount === 0) return null;

  return (
    <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-pink-600 px-1.5 text-xs font-bold text-white dark:bg-amber-600">
      {favoriteCount > 99 ? "99+" : favoriteCount}
    </span>
  );
};

export default FavoritesCount;