import { useSelector } from "react-redux";
import { selectFavoriteProduct } from "../../redux/features/favorites/favoriteSlice";
import Product from "./Product";

const Favorites = () => {
  const favorites = useSelector(selectFavoriteProduct);

  return (
    <div className="min-h-[calc(100vh-100px)]">
      <div className="container mx-auto mt-8 px-4 pb-8 sm:mt-12 sm:px-6 sm:pb-12 md:mt-16 md:pb-16 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl md:text-4xl lg:text-5xl mb-8 sm:mb-10 md:mb-12">
          Favorite Products
        </h1>

        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 sm:py-20 md:py-24">
            <div className="text-center">
              <svg
                className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-500 sm:h-20 sm:w-20"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <h2 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                No favorites yet
              </h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 sm:text-base">
                Start adding products to your favorites to see them here.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 lg:gap-8">
            {favorites.map((product) => (
              <div key={product._id}>
                <Product product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;