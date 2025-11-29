import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import ProgressSteps from "../../components/ProgressSteps";
import Loader from "../../components/Loader";
import { useCreateOrderMutation } from "../../redux/api/orderApiSlice";
import { clearCartItems } from "../../redux/features/cart/cartSlice";

const PlaceOrder = () => {
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.cartItems || cart.cartItems.length === 0) {
      navigate("/cart");
      return;
    }
    if (!cart.shippingAddress?.address) {
      navigate("/shipping");
    }
  }, [cart.cartItems, cart.shippingAddress?.address, navigate]);

  const dispatch = useDispatch();

  const placeOrderHandler = async () => {
    try {
      if (!cart.cartItems || cart.cartItems.length === 0) {
        toast.error("Your cart is empty");
        return;
      }

      if (!cart.shippingAddress?.address) {
        toast.error("Please provide a shipping address");
        navigate("/shipping");
        return;
      }

      const res = await createOrder({
        orderItems: cart.cartItems || [],
        shippingAddress: cart.shippingAddress || {},
        paymentMethod: cart.paymentMethod || "PayPal",
        itemsPrice: cart.itemsPrice || 0,
        shippingPrice: cart.shippingPrice || 0,
        taxPrice: cart.taxPrice || 0,
        totalPrice: cart.totalPrice || 0,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (error) {
      toast.error(error?.data?.message || error?.message || "Failed to place order");
    }
  };

  return (
    <div className="min-h-[calc(100vh-100px)]">
      <div className="container mx-auto px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-8 sm:mb-12">
          <ProgressSteps step1 step2 step3 />
        </div>

        {!cart.cartItems || cart.cartItems.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md sm:p-8 dark:border-slate-700 dark:bg-slate-800">
            <Message>Your cart is empty</Message>
          </div>
        ) : (
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
            {/* Cart Items */}
            <div className="flex-1 space-y-4">
              <h2 className="mb-4 text-xl font-bold text-gray-900 sm:text-2xl dark:text-white">
                Order Items
              </h2>
              {cart.cartItems.map((item, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-slate-200 bg-white p-3 shadow-md transition-shadow hover:shadow-lg sm:rounded-2xl sm:p-4 dark:border-slate-700 dark:bg-slate-800"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <div className="flex-shrink-0">
                      <Link to={`/product/${item.product || item._id}`}>
                        <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-slate-100 sm:w-24 sm:rounded-xl dark:bg-slate-900">
                          <img
                            src={item.image || ""}
                            alt={item.name || "Product"}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </Link>
                    </div>

                    <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                      <div className="flex-1">
                        <Link
                          to={`/product/${item.product || item._id}`}
                          className="text-base font-semibold text-gray-900 transition-colors hover:text-pink-600 sm:text-lg dark:text-white dark:hover:text-amber-400"
                        >
                          {item.name || "Product"}
                        </Link>
                        <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                          <span>
                            Qty: <strong className="text-gray-900 dark:text-white">{item.qty || 0}</strong>
                          </span>
                          <span>
                            Price: <strong className="text-gray-900 dark:text-white">${(item.price || 0).toFixed(2)}</strong>
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-lg font-bold text-pink-600 dark:text-amber-400 sm:text-xl">
                          ${((item.qty || 0) * (item.price || 0)).toFixed(2)}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Total
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:w-96">
              <div className="space-y-6">
                {/* Order Summary Card */}
                <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-md sm:rounded-2xl sm:p-6 dark:border-slate-700 dark:bg-slate-800">
                  <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">
                    Order Summary
                  </h2>

                  <div className="space-y-3 border-b border-slate-200 pb-4 dark:border-slate-700">
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                      <span>Items</span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        ${typeof cart.itemsPrice === "number" ? cart.itemsPrice.toFixed(2) : (parseFloat(cart.itemsPrice) || 0).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                      <span>Shipping</span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        ${typeof cart.shippingPrice === "number" ? cart.shippingPrice.toFixed(2) : (parseFloat(cart.shippingPrice) || 0).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                      <span>Tax</span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        ${typeof cart.taxPrice === "number" ? cart.taxPrice.toFixed(2) : (parseFloat(cart.taxPrice) || 0).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-between text-lg font-bold text-gray-900 dark:text-white sm:text-xl">
                    <span>Total</span>
                    <span className="text-pink-600 dark:text-amber-400">
                      ${typeof cart.totalPrice === "number" ? cart.totalPrice.toFixed(2) : (parseFloat(cart.totalPrice) || 0).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Shipping Address Card */}
                <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-md sm:rounded-2xl sm:p-6 dark:border-slate-700 dark:bg-slate-800">
                  <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">
                    Shipping Address
                  </h2>
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <p>
                      <strong className="text-gray-900 dark:text-white">Address:</strong>{" "}
                      {cart.shippingAddress?.address || "N/A"}
                    </p>
                    <p>
                      <strong className="text-gray-900 dark:text-white">City:</strong>{" "}
                      {cart.shippingAddress?.city || "N/A"}
                    </p>
                    <p>
                      <strong className="text-gray-900 dark:text-white">Postal Code:</strong>{" "}
                      {cart.shippingAddress?.postalCode || "N/A"}
                    </p>
                    <p>
                      <strong className="text-gray-900 dark:text-white">Country:</strong>{" "}
                      {cart.shippingAddress?.country || "N/A"}
                    </p>
                  </div>
                </div>

                {/* Payment Method Card */}
                <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-md sm:rounded-2xl sm:p-6 dark:border-slate-700 dark:bg-slate-800">
                  <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">
                    Payment Method
                  </h2>
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-700/50">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {cart.paymentMethod || "PayPal"}
                    </p>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
                    <Message variant="danger">
                      {error?.data?.message || error?.message || "An error occurred"}
                    </Message>
                  </div>
                )}

                {/* Place Order Button */}
                <button
                  type="button"
                  className="w-full rounded-full bg-pink-600 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:py-3.5 sm:text-lg dark:bg-amber-600 dark:hover:bg-amber-700 dark:focus:ring-amber-500"
                  disabled={!cart.cartItems || cart.cartItems.length === 0 || isLoading}
                  onClick={placeOrderHandler}
                >
                  {isLoading ? "Placing Order..." : "Place Order"}
                </button>

                {isLoading && <Loader />}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaceOrder;