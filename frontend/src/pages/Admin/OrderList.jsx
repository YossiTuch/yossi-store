import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "../../redux/api/orderApiSlice";

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
        <div className="container mx-auto px-3 py-3 sm:px-6 sm:py-8 lg:px-8">
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 shadow-md dark:border-red-800 dark:bg-red-900/20 sm:rounded-2xl sm:p-6">
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
      <div className="container mx-auto px-3 py-3 sm:px-6 sm:py-8 lg:px-8">
        <h1 className="mb-3 text-xl font-bold text-gray-900 sm:mb-6 sm:text-3xl dark:text-white">
          All Orders
        </h1>

        {!orders || orders.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-md dark:border-slate-700 dark:bg-slate-800 sm:rounded-2xl sm:p-8">
            <Message>No orders found</Message>
          </div>
        ) : (
          <div className="space-y-2 sm:space-y-4">
            {orders.map((order) => (
              <div
                key={order._id}
                className="rounded-lg border border-slate-200 bg-white p-3 shadow-md transition-shadow hover:shadow-lg dark:border-slate-700 dark:bg-slate-800 sm:rounded-xl sm:p-4 lg:rounded-2xl lg:p-6"
              >
                <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between sm:gap-4">
                  <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center sm:gap-4 lg:gap-6">
                    {order.orderItems && order.orderItems.length > 0 && order.orderItems[0].image ? (
                      <div className="flex-shrink-0">
                        <div className="relative h-16 w-16 overflow-hidden rounded-md bg-slate-100 dark:bg-slate-900 sm:h-20 sm:w-20 sm:rounded-lg lg:h-24 lg:w-24 lg:rounded-xl">
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
                      <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-md bg-slate-100 dark:bg-slate-900 sm:h-20 sm:w-20 sm:rounded-lg lg:h-24 lg:w-24 lg:rounded-xl">
                        <span className="text-[10px] text-gray-400 sm:text-xs">N/A</span>
                      </div>
                    )}

                    <div className="flex-1 space-y-1.5 sm:space-y-2">
                      <div className="flex flex-wrap items-center gap-1.5 sm:gap-3">
                        <h2 className="text-sm font-semibold text-gray-900 dark:text-white sm:text-lg lg:text-xl">
                          Order #{order._id.slice(-8).toUpperCase()}
                        </h2>
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-medium sm:px-3 sm:py-1 sm:text-xs lg:text-sm ${
                            order.isPaid
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                          }`}
                        >
                          {order.isPaid ? "Paid" : "Not Paid"}
                        </span>
                        {order.isDelivered ? (
                          <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 sm:px-3 sm:py-1 sm:text-xs lg:text-sm">
                            Delivered
                          </span>
                        ) : (
                          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300 sm:px-3 sm:py-1 sm:text-xs lg:text-sm">
                            Pending
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-1 gap-1 text-xs sm:grid-cols-2 sm:gap-x-6 sm:text-sm">
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
                          <span className="text-sm font-bold text-pink-600 dark:text-amber-400 sm:text-lg">
                            $
                            {typeof order.totalPrice === "number"
                              ? order.totalPrice.toFixed(2)
                              : (parseFloat(order.totalPrice) || 0).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5 sm:flex-row lg:flex-col sm:gap-2">
                    <Link
                      to={`/order/${order._id}`}
                      className="rounded-full bg-pink-600 px-4 py-1.5 text-center text-xs font-semibold text-white transition-colors hover:bg-pink-700 focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:outline-none dark:bg-amber-600 dark:hover:bg-amber-700 dark:focus:ring-amber-500 sm:px-6 sm:py-2 sm:text-sm lg:px-8 lg:py-2.5"
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