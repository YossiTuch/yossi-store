import { useSelector } from "react-redux";

const FavoritesCount = () => {
  const favorites = useSelector((state) => state.favorites);
  const favoriteCount = favorites.length;

  return (
    <>
      {favoriteCount > 0 && (
        <span className="px-1 py-0 text-sm text-white bg-blue-500 rounded-full">
          {favoriteCount}
        </span>
      )}
    </>
  );
};

export default FavoritesCount;