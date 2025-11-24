import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { FaBox, FaClock, FaStar, FaStore } from "react-icons/fa";
import moment from "moment";
import HeartIcon from "./HeartIcon";
import Ratings from "./Ratings";
import ProductTabs from "./ProductTabs";
import { addToCart } from "../../redux/features/cart/cartSlice";

const ProductDetails = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review created successfully");
    } catch (error) {
      toast.error(
        error?.data?.message || error?.message || "Failed to create review",
      );
    }
  };

  const addToCartHandler = () => {
    if (!product) return;
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  return (
    <div className="min-h-[calc(100vh-100px)] bg-white dark:bg-slate-900">
      <div className="container mx-auto px-3 py-3 sm:px-6 sm:py-6 md:px-8 lg:px-8">
        {/* Go Back Link */}
        <Link
          to="/"
          className="mb-3 inline-flex items-center text-xs font-medium text-gray-700 transition-colors hover:text-pink-600 sm:mb-6 sm:text-sm dark:text-gray-300 dark:hover:text-amber-400"
        >
          <svg
            className="mr-1.5 h-3.5 w-3.5 sm:mr-2 sm:h-4 sm:w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Go Back
        </Link>

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error.message}
          </Message>
        ) : (
          <>
            {/* Product Main Section */}
            <div className="mb-4 rounded-xl border border-slate-200 bg-white p-3 shadow-lg sm:mb-8 sm:rounded-2xl sm:p-6 dark:border-slate-700 dark:bg-slate-800 sm:dark:p-8">
              <div className="flex flex-col gap-4 sm:gap-6 lg:flex-row lg:gap-8">
                {/* Product Image */}
                <div className="relative flex-shrink-0">
                  <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-slate-100 sm:w-[400px] sm:rounded-xl lg:w-[500px] dark:bg-slate-900">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="absolute top-2 right-2 sm:top-4 sm:right-4">
                    <HeartIcon product={product} />
                  </div>
                </div>

                {/* Product Info */}
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <h1 className="mb-2 text-xl font-bold text-gray-900 sm:mb-4 sm:text-3xl dark:text-white sm:dark:text-4xl">
                      {product.name}
                    </h1>

                    <p className="mb-3 text-sm text-gray-600 sm:mb-6 sm:text-base dark:text-gray-300 sm:dark:text-lg">
                      {product.description}
                    </p>

                    <div className="mb-4 text-3xl font-extrabold text-pink-600 sm:mb-6 sm:text-5xl dark:text-amber-400">
                      ${product.price}
                    </div>

                    {/* Product Details Grid */}
                    <div className="mb-4 grid grid-cols-2 gap-2 sm:mb-6 sm:gap-4">
                      <div className="flex items-center gap-2 rounded-lg bg-slate-50 p-2 sm:gap-3 sm:p-3 dark:bg-slate-900/50">
                        <FaStore className="flex-shrink-0 text-sm text-pink-600 sm:text-base dark:text-amber-400" />
                        <div className="min-w-0">
                          <p className="text-[10px] text-gray-500 sm:text-xs dark:text-gray-400">
                            Brand
                          </p>
                          <p className="truncate text-xs font-semibold text-gray-900 sm:text-sm dark:text-white">
                            {product.brand}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 rounded-lg bg-slate-50 p-2 sm:gap-3 sm:p-3 dark:bg-slate-900/50">
                        <FaClock className="flex-shrink-0 text-sm text-pink-600 sm:text-base dark:text-amber-400" />
                        <div className="min-w-0">
                          <p className="text-[10px] text-gray-500 sm:text-xs dark:text-gray-400">
                            Added
                          </p>
                          <p className="truncate text-xs font-semibold text-gray-900 sm:text-sm dark:text-white">
                            {moment(
                              product.createdAt || product.createAt,
                            ).fromNow()}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 rounded-lg bg-slate-50 p-2 sm:gap-3 sm:p-3 dark:bg-slate-900/50">
                        <FaStar className="flex-shrink-0 text-sm text-pink-600 sm:text-base dark:text-amber-400" />
                        <div className="min-w-0 flex-1">
                          <p className="mb-1 text-[10px] text-gray-500 sm:mb-2 sm:text-xs dark:text-gray-400">
                            Reviews ({product.numReviews || 0})
                          </p>
                          <div className="flex items-center">
                            <Ratings value={product.rating || 0} text="" />
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 rounded-lg bg-slate-50 p-2 sm:gap-3 sm:p-3 dark:bg-slate-900/50">
                        <FaBox className="flex-shrink-0 text-sm text-pink-600 sm:text-base dark:text-amber-400" />
                        <div className="min-w-0">
                          <p className="text-[10px] text-gray-500 sm:text-xs dark:text-gray-400">
                            In Stock
                          </p>
                          <p className="text-xs font-semibold text-gray-900 sm:text-sm dark:text-white">
                            {product.countInStock}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Add to Cart Section */}
                  <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-3 sm:mt-6 sm:rounded-xl sm:p-4 dark:border-slate-700 dark:bg-slate-900/50">
                    <div className="mb-3 flex items-center justify-between sm:mb-4">
                      <label className="text-xs font-medium text-gray-700 sm:text-sm dark:text-gray-300">
                        Quantity
                      </label>
                      {product.countInStock > 0 && (
                        <select
                          value={qty}
                          onChange={(e) => setQty(Number(e.target.value))}
                          className="rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-xs font-medium text-gray-900 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 focus:outline-none sm:px-3 sm:py-2 sm:text-sm dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:focus:border-amber-500 dark:focus:ring-amber-500/20"
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>

                    <button
                      onClick={addToCartHandler}
                      disabled={product.countInStock === 0}
                      className="w-full rounded-lg bg-pink-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-pink-700 focus:ring-2 focus:ring-pink-300 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 sm:px-6 sm:py-3 sm:text-base dark:bg-amber-600 dark:hover:bg-amber-700 dark:focus:ring-amber-500/50"
                    >
                      {product.countInStock === 0
                        ? "Out of Stock"
                        : "Add To Cart"}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Tabs Section */}
            <div className="rounded-xl border border-slate-200 bg-white shadow-lg sm:rounded-2xl dark:border-slate-700 dark:bg-slate-800">
              <ProductTabs
                loadingProductReview={loadingProductReview}
                userInfo={userInfo}
                submitHandler={submitHandler}
                rating={rating}
                setRating={setRating}
                comment={comment}
                setComment={setComment}
                product={product}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
