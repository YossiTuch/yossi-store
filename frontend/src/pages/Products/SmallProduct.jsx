import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const SmallProduct = ({ product }) => {
  return (
    <div className="group w-full max-w-[20rem] p-2 sm:p-3 md:ml-0">
      <div className="relative overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:bg-slate-900 dark:shadow-slate-800/50">
        <div className="relative aspect-square w-full overflow-hidden bg-gray-50 dark:bg-slate-800">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <HeartIcon product={product} />
        </div>
        <div className="p-3 sm:p-4">
          <Link to={`/product/${product._id}`}>
            <h2 className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="line-clamp-2 text-sm font-semibold text-gray-900 transition-colors group-hover:text-pink-600 sm:text-base dark:text-white dark:group-hover:text-amber-400">
                {product.name}
              </div>
              <span className="w-fit rounded-full bg-pink-100 px-2.5 py-1 text-xs font-semibold text-pink-800 shadow-sm sm:text-sm dark:bg-amber-900 dark:text-white">
                ${product.price}
              </span>
            </h2>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SmallProduct;
