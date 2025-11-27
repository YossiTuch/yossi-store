import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import HeartIcon from "./HeartIcon";

const ProductCard = ({ p }) => {
  const dispatch = useDispatch();

  const addToCartHandler = useCallback(
    (product, qty) => {
      dispatch(addToCart({ ...product, qty }));
      toast.success("Item added successfully");
    },
    [dispatch]
  );

  return (
    <div className="group h-full">
      <div className="relative h-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-pink-300 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800 dark:hover:border-amber-500/50">
        <div className="relative aspect-square w-full overflow-hidden bg-gray-50 dark:bg-slate-900">
          <Link to={`/product/${p._id}`} className="block h-full w-full">
            <img
              src={p.image}
              alt={p.name}
              loading="lazy"
              className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105 group-hover:brightness-110"
            />
          </Link>
          {p?.brand && (
            <span className="absolute bottom-3 right-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-pink-800 shadow-md backdrop-blur-sm dark:bg-slate-800/90 dark:text-amber-400">
              {p.brand}
            </span>
          )}
          <div
            className="absolute top-3 right-3"
            onClick={(e) => e.stopPropagation()}
          >
            <HeartIcon product={p} />
          </div>
        </div>

        <div className="flex flex-1 flex-col p-4 sm:p-5">
          <Link to={`/product/${p._id}`}>
            <h2 className="mb-2 flex items-start justify-between gap-2">
              <span className="line-clamp-2 flex-1 text-base font-semibold text-gray-900 transition-colors group-hover:text-pink-600 sm:text-lg dark:text-white dark:group-hover:text-amber-400">
                {p?.name}
              </span>
            </h2>
          </Link>

          {p?.description && (
            <p className="mb-3 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
              {p.description}
            </p>
          )}

          <div className="mt-auto flex items-center justify-between gap-3">
            <span className="rounded-full bg-pink-100 px-3 py-1 text-sm font-semibold text-pink-800 shadow-sm dark:bg-amber-900 dark:text-white">
              {p?.price?.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </span>

            <div className="flex items-center gap-2">
              <Link
                to={`/product/${p._id}`}
                className="inline-flex items-center rounded-lg bg-pink-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 dark:bg-amber-600 dark:hover:bg-amber-700 dark:focus:ring-amber-500 sm:px-4 sm:py-2 sm:text-sm"
              >
                View
                <svg
                  className="ml-1.5 h-3 w-3 sm:h-3.5 sm:w-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </Link>

              <button
                onClick={() => addToCartHandler(p, 1)}
                aria-label="Add to cart"
                className="rounded-lg bg-gray-100 p-2 text-gray-700 transition-colors hover:bg-pink-100 hover:text-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 dark:bg-slate-700 dark:text-gray-300 dark:hover:bg-amber-900/50 dark:hover:text-amber-400"
              >
                <AiOutlineShoppingCart size={20} className="sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProductCard);