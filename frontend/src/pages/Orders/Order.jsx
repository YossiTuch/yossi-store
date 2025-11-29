import { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
  useGetPaypalClientIdQuery,
  usePayOrderMutation,
} from "../../redux/api/orderApiSlice";

const Order = () => {
  const { id: orderId } = useParams();
  const navigate = useNavigate();

  const {
    data: order,
    refetch,
    isLoading,
    error,
    isFetching,
  } = useGetOrderDetailsQuery(orderId, {
    refetchOnMountOrArgChange: true,
  });

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const {
    data: paypal,
    isLoading: loadingPaPal,
    error: errorPayPal,
  } = useGetPaypalClientIdQuery();

  useEffect(() => {
    if (!errorPayPal && !loadingPaPal && paypal?.clientId) {
      if (order && !order.isPaid) {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal.clientId,
            currency: "USD",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      } else if (order && order.isPaid) {
        paypalDispatch({ type: "setLoadingStatus", value: "idle" });
      }
    }
  }, [errorPayPal, loadingPaPal, order, paypal, paypalDispatch]);

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details }).unwrap();
        toast.success("Order is paid");
        paypalDispatch({ type: "setLoadingStatus", value: "idle" });
        navigate("/myorders");
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    });
  }

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [{ amount: { value: order.totalPrice } }],
      })
      .then((orderID) => {
        return orderID;
      });
  }

  function onError(err) {
    toast.error(err.message);
  }

  const deliverHandler = async () => {
    try {
      await deliverOrder(orderId).unwrap();
      toast.success("Order marked as delivered");
      refetch();
      navigate("/myorders");
    } catch (error) {
      toast.error(error?.data?.message || error?.message || "Failed to mark order as delivered");
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return error ? (
    <div className="min-h-[calc(100vh-100px)]">
      <div className="container mx-auto px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 shadow-md dark:border-red-800 dark:bg-red-900/20">
          <Message variant="danger">
            {error?.data?.message || error?.message || "Failed to load order"}
          </Message>
        </div>
      </div>
    </div>
  ) : (
    <div className="min-h-[calc(100vh-100px)]">
      <div className="container mx-auto px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <h1 className="mb-6 text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
          Order Details
        </h1>

        {!order || !order.orderItems || order.orderItems.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md sm:p-8 dark:border-slate-700 dark:bg-slate-800">
            <Message>Order is empty</Message>
          </div>
        ) : (
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
            <div className="flex-1 space-y-4">
              <h2 className="mb-4 text-xl font-bold text-gray-900 sm:text-2xl dark:text-white">
                Order Items
              </h2>
              {order.orderItems.map((item, index) => (
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

            <div className="lg:w-96">
              <div className="space-y-6">
                <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-md sm:rounded-2xl sm:p-6 dark:border-slate-700 dark:bg-slate-800">
                  <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">
                    Shipping Information
                  </h2>
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <p>
                      <strong className="text-gray-900 dark:text-white">Order ID:</strong>{" "}
                      {order._id || "N/A"}
                    </p>
                    <p>
                      <strong className="text-gray-900 dark:text-white">Name:</strong>{" "}
                      {order.user?.username || "N/A"}
                    </p>
                    <p>
                      <strong className="text-gray-900 dark:text-white">Email:</strong>{" "}
                      {order.user?.email || "N/A"}
                    </p>
                    <p>
                      <strong className="text-gray-900 dark:text-white">Address:</strong>{" "}
                      {order.shippingAddress?.address || "N/A"}, {order.shippingAddress?.city || ""}{" "}
                      {order.shippingAddress?.postalCode || ""}, {order.shippingAddress?.country || ""}
                    </p>
                    <p>
                      <strong className="text-gray-900 dark:text-white">Payment Method:</strong>{" "}
                      {order.paymentMethod || "N/A"}
                    </p>
                  </div>
                  <div className="mt-4">
                    {order.isPaid ? (
                      <div className="rounded-lg border border-green-200 bg-green-50 p-3 dark:border-green-800 dark:bg-green-900/20">
                        <Message variant="success">
                          Paid on {order.paidAt ? new Date(order.paidAt).toLocaleDateString() : "N/A"}
                        </Message>
                      </div>
                    ) : (
                      <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-3 dark:border-yellow-800 dark:bg-yellow-900/20">
                        <Message variant="danger">Not paid</Message>
                      </div>
                    )}
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-md sm:rounded-2xl sm:p-6 dark:border-slate-700 dark:bg-slate-800">
                  <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">
                    Order Summary
                  </h2>

                  <div className="space-y-3 border-b border-slate-200 pb-4 dark:border-slate-700">
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                      <span>Items</span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        ${typeof order.itemsPrice === "number" ? order.itemsPrice.toFixed(2) : (parseFloat(order.itemsPrice) || 0).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                      <span>Shipping</span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        ${typeof order.shippingPrice === "number" ? order.shippingPrice.toFixed(2) : (parseFloat(order.shippingPrice) || 0).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                      <span>Tax</span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        ${typeof order.taxPrice === "number" ? order.taxPrice.toFixed(2) : (parseFloat(order.taxPrice) || 0).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-between text-lg font-bold text-gray-900 dark:text-white sm:text-xl">
                    <span>Total</span>
                    <span className="text-pink-600 dark:text-amber-400">
                      ${typeof order.totalPrice === "number" ? order.totalPrice.toFixed(2) : (parseFloat(order.totalPrice) || 0).toFixed(2)}
                    </span>
                  </div>
                </div>

                {order && !order.isPaid && userInfo && userInfo._id === order.user?._id && paypal?.clientId && (
                  <div className="rounded-xl border-2 border-pink-200 bg-white p-4 shadow-md sm:rounded-2xl sm:p-6 dark:border-amber-700 dark:bg-slate-800">
                    <div className="mb-4 flex items-center justify-between">
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">
                        Pay Now
                      </h2>
                      <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 sm:text-sm">
                        Unpaid
                      </span>
                    </div>
                    <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
                      Complete your payment to finalize this order.
                    </p>
                    {loadingPay && <Loader />}
                    {isPending || loadingPaPal ? (
                      <div className="flex items-center justify-center py-4">
                        <Loader />
                      </div>
                    ) : (
                      <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-700/50">
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        />
                      </div>
                    )}
                  </div>
                )}
                
                {order && !order.isPaid && (!userInfo || userInfo._id !== order.user?._id) && (
                  <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-4 shadow-md sm:rounded-2xl sm:p-6 dark:border-yellow-800 dark:bg-yellow-900/20">
                    <div className="flex items-center gap-2">
                      <svg
                        className="h-5 w-5 text-yellow-600 dark:text-yellow-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                      </svg>
                      <p className="text-sm font-medium text-yellow-800 dark:text-yellow-400">
                        This order is unpaid. Only the order owner can make payment.
                      </p>
                    </div>
                  </div>
                )}

                {loadingDeliver && <Loader />}
                {order && userInfo && userInfo._id === order.user?._id && order.isPaid && !order.isDelivered && (
                  <button
                    type="button"
                    className="w-full rounded-full bg-pink-600 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 sm:py-3.5 sm:text-lg dark:bg-amber-600 dark:hover:bg-amber-700 dark:focus:ring-amber-500"
                    onClick={deliverHandler}
                  >
                    Mark As Delivered
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;