import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "../../redux/api/orderApiSlice";
import AdminMenu from "./AdminMenu";

const OrderList = () => {
  const { data: ordersData, isLoading, error } = useGetOrdersQuery();
  const orders = ordersData?.orders || [];

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = "";
    e.target.style.display = "none";
    if (e.target.nextSibling) {
      e.target.nextSibling.classList.remove("hidden");
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="min-h-[calc(100vh-100px)]">
        <div className="container mx-auto px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          <AdminMenu />
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 shadow-md dark:border-red-800 dark:bg-red-900/20">
            <Message variant="danger">
              {error?.data?.message || error?.error || "Failed to load orders"}
            </Message>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-100px)]">
      <div className="container mx-auto px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <AdminMenu />
        <h1 className="mb-6 text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
          All Orders
        </h1>

        {!orders || orders.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md sm:p-8 dark:border-slate-700 dark:bg-slate-800">
            <Message>No orders found</Message>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order._id}
                className="rounded-xl border border-slate-200 bg-white p-4 shadow-md transition-shadow hover:shadow-lg sm:rounded-2xl sm:p-6 dark:border-slate-700 dark:bg-slate-800"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex flex-1 flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
                    {order.orderItems && order.orderItems.length > 0 && order.orderItems[0].image ? (
                      <div className="flex-shrink-0">
                        <div className="relative h-20 w-20 overflow-hidden rounded-lg bg-slate-100 sm:h-24 sm:w-24 sm:rounded-xl dark:bg-slate-900">
                          <img
                            src={order.orderItems[0].image}
                            alt={order.orderItems[0].name || "Product"}
                            className="h-full w-full object-cover"
                            onError={handleImageError}
                            loading="lazy"
                          />
                          <span className="hidden text-gray-400 text-xs">N/A</span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-lg bg-slate-100 sm:h-24 sm:w-24 sm:rounded-xl dark:bg-slate-900">
                        <span className="text-xs text-gray-400">N/A</span>
                      </div>
                    )}

                    <div className="flex-1 space-y-2">
                      <div className="flex flex-wrap items-center gap-3">
                        <h2 className="text-lg font-semibold text-gray-900 sm:text-xl dark:text-white">
                          Order #{order._id.slice(-8).toUpperCase()}
                        </h2>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium sm:text-sm ${
                            order.isPaid
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                          }`}
                        >
                          {order.isPaid ? "Paid" : "Not Paid"}
                        </span>
                        {order.isDelivered ? (
                          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800 sm:text-sm dark:bg-blue-900/30 dark:text-blue-400">
                            Delivered
                          </span>
                        ) : (
                          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-800 sm:text-sm dark:bg-gray-700 dark:text-gray-300">
                            Pending
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-1 gap-2 text-sm sm:grid-cols-2 sm:gap-x-6">
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">User:</span>{" "}
                          <span className="font-medium text-gray-900 dark:text-white">
                            {order.user ? order.user.username : "N/A"}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Date:</span>{" "}
                          <span className="font-medium text-gray-900 dark:text-white">
                            {order.createdAt
                              ? new Date(order.createdAt).toLocaleDateString()
                              : "N/A"}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Items:</span>{" "}
                          <span className="font-medium text-gray-900 dark:text-white">
                            {order.orderItems?.length || 0}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Total:</span>{" "}
                          <span className="text-lg font-bold text-pink-600 dark:text-amber-400">
                            $
                            {typeof order.totalPrice === "number"
                              ? order.totalPrice.toFixed(2)
                              : (parseFloat(order.totalPrice) || 0).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 sm:flex-row lg:flex-col">
                    <Link
                      to={`/order/${order._id}`}
                      className="rounded-full bg-pink-600 px-6 py-2 text-center text-sm font-semibold text-white transition-colors hover:bg-pink-700 focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:outline-none sm:px-8 sm:py-2.5 dark:bg-amber-600 dark:hover:bg-amber-700 dark:focus:ring-amber-500"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderList;