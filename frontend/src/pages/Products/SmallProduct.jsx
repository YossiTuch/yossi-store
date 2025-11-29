import { Link } from "react-router";
import HeartIcon from "./HeartIcon";

const SmallProduct = ({ product }) => {
  return (
    <div className="group w-full max-w-[20rem] p-1 sm:p-2 md:p-3 xl:p-2">
      <div className="relative flex h-full min-h-[280px] flex-col overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:bg-slate-900 dark:shadow-slate-800/50 sm:min-h-[320px] md:min-h-[360px] xl:min-h-[380px]">
        <div className="relative h-48 w-full flex-shrink-0 overflow-hidden bg-gray-50 dark:bg-slate-800 sm:h-56 md:h-64 xl:h-72">
          <Link to={`/product/${product._id}`} className="block h-full w-full">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
          <div onClick={(e) => e.stopPropagation()}>
            <HeartIcon product={product} />
          </div>
        </div>
        <div className="flex min-h-[80px] flex-shrink-0 flex-col justify-center p-2 sm:min-h-[90px] sm:p-3 xl:min-h-[100px] xl:p-4">
          <Link to={`/product/${product._id}`}>
            <h2 className="flex flex-col gap-1.5 sm:gap-2 xl:flex-row xl:items-center xl:justify-between">
              <div className="line-clamp-2 min-h-[2.5rem] text-xs font-semibold text-gray-900 transition-colors group-hover:text-pink-600 sm:min-h-[3rem] sm:text-sm xl:min-h-[3.5rem] xl:text-base dark:text-white dark:group-hover:text-amber-400">
                {product.name}
              </div>
              <span className="mt-1 w-fit rounded-full bg-pink-100 px-2 py-0.5 text-xs font-semibold text-pink-800 shadow-sm xl:mt-0 sm:px-2.5 sm:py-1 sm:text-sm dark:bg-amber-900 dark:text-white">
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
