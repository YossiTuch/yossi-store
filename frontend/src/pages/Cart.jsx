import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems = [] } = cart;

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const totalPrice = cartItems
    .reduce((acc, item) => acc + item.qty * item.price, 0)
    .toFixed(2);

  return (
    <div className="min-h-[calc(100vh-100px)] bg-white dark:bg-slate-900">
      <div className="container mx-auto px-3 py-3 sm:px-6 sm:py-6 md:px-8 lg:px-8">
        {/* Go Back Link */}
        <Link
          to="/shop"
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
          Continue Shopping
        </Link>

        <h1 className="mb-4 text-2xl font-bold text-gray-900 sm:mb-6 sm:text-3xl dark:text-white md:text-4xl">
          Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-lg sm:rounded-2xl sm:p-8 dark:border-slate-700 dark:bg-slate-800">
            <div className="text-center">
              <p className="mb-4 text-lg text-gray-600 dark:text-gray-300">
                Your cart is empty
              </p>
              <Link
                to="/shop"
                className="inline-block rounded-lg bg-pink-600 px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-pink-700 focus:ring-2 focus:ring-pink-300 focus:outline-none sm:px-8 sm:py-3 sm:text-base dark:bg-amber-600 dark:hover:bg-amber-700 dark:focus:ring-amber-500/50"
              >
                Go To Shop
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
            {/* Cart Items Section */}
            <div className="flex-1 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="rounded-xl border border-slate-200 bg-white p-3 shadow-md transition-shadow hover:shadow-lg sm:rounded-2xl sm:p-4 dark:border-slate-700 dark:bg-slate-800"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <Link to={`/product/${item._id}`}>
                        <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-slate-100 sm:w-24 sm:rounded-xl dark:bg-slate-900">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </Link>
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                      <div className="flex-1">
                        <Link
                          to={`/product/${item._id}`}
                          className="text-base font-semibold text-gray-900 transition-colors hover:text-pink-600 sm:text-lg dark:text-white dark:hover:text-amber-400"
                        >
                          {item.name}
                        </Link>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                          {item.brand}
                        </p>
                        <p className="mt-2 text-lg font-bold text-pink-600 dark:text-amber-400">
                          ${item.price}
                        </p>
                      </div>

                      {/* Quantity Selector */}
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <label className="text-xs font-medium text-gray-700 sm:text-sm dark:text-gray-300">
                            Qty:
                          </label>
                          <select
                            className="rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-xs font-medium text-gray-900 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 focus:outline-none sm:px-3 sm:py-2 sm:text-sm dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:focus:border-amber-500 dark:focus:ring-amber-500/20"
                            value={item.qty}
                            onChange={(e) =>
                              addToCartHandler(item, Number(e.target.value))
                            }
                          >
                            {[...Array(item.countInStock || 10).keys()].map(
                              (index) => (
                                <option key={index + 1} value={index + 1}>
                                  {index + 1}
                                </option>
                              ),
                            )}
                          </select>
                        </div>

                        {/* Remove Button */}
                        <button
                          className="flex items-center justify-center rounded-lg p-2 text-red-500 transition-colors hover:bg-red-50 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 dark:hover:bg-red-900/20 dark:focus:ring-red-500/50"
                          onClick={() => removeFromCartHandler(item._id)}
                          aria-label="Remove item"
                        >
                          <FaTrash className="h-4 w-4 sm:h-5 sm:w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary Section */}
            <div className="lg:w-80">
              <div className="sticky top-4 rounded-xl border border-slate-200 bg-white p-4 shadow-lg sm:rounded-2xl sm:p-6 dark:border-slate-700 dark:bg-slate-800">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">
                  Order Summary
                </h2>

                <div className="mb-4 space-y-2 border-b border-slate-200 pb-4 dark:border-slate-700">
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                    <span>Items ({totalItems})</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      ${totalPrice}
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white sm:text-xl">
                    <span>Total</span>
                    <span className="text-pink-600 dark:text-amber-400">
                      ${totalPrice}
                    </span>
                  </div>
                </div>

                <button
                  className="w-full rounded-lg bg-pink-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-pink-700 focus:ring-2 focus:ring-pink-300 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 sm:px-6 sm:py-3 sm:text-base dark:bg-amber-600 dark:hover:bg-amber-700 dark:focus:ring-amber-500/50"
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed To Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
