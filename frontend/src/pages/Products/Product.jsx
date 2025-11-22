import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const Product = ({ product }) => {
  return (
    <div className="relative w-full p-3">
      <div className="relative w-full">
        <img
          src={product.image}
          alt={product.name}
          className="h-auto w-full rounded object-cover"
        />
        <HeartIcon product={product} />
      </div>

      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h2 className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
            <div className="text-base font-medium break-words text-gray-900 sm:text-lg dark:text-amber-400">
              {product.name}
            </div>
            <span className="rounded-full bg-pink-100 px-2.5 py-0.5 text-sm font-medium whitespace-nowrap text-pink-800 dark:bg-amber-900 dark:text-white">
              $ {product.price}
            </span>
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default Product;
