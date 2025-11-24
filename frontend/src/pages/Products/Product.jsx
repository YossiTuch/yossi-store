import { Link } from "react-router";
import HeartIcon from "./HeartIcon";

const Product = ({ product }) => {
  return (
    <div className="group w-full p-3">
      <div className="relative h-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md transition-all duration-300 hover:border-pink-300 hover:shadow-xl dark:border-slate-700 dark:bg-slate-800 dark:hover:border-amber-500/50">
        <div className="relative aspect-square w-full overflow-hidden bg-gray-50 dark:bg-slate-900">
          <Link to={`/product/${product._id}`} className="block h-full w-full">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover transition-all duration-300 group-hover:brightness-110"
            />
          </Link>
          <div onClick={(e) => e.stopPropagation()}>
            <HeartIcon product={product} />
          </div>
        </div>

        <div className="p-4 sm:p-5">
          <Link to={`/product/${product._id}`}>
            <h2 className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
              <div className="text-base font-semibold break-words text-gray-900 transition-colors group-hover:text-pink-600 sm:text-lg dark:text-amber-400 dark:group-hover:text-amber-300">
                {product.name}
              </div>
              <span className="rounded-full bg-pink-100 px-3 py-1 text-sm font-semibold whitespace-nowrap text-pink-800 shadow-sm transition-shadow group-hover:shadow-md dark:bg-amber-900 dark:text-white">
                ${product.price}
              </span>
            </h2>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;

