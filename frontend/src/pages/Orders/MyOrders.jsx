import { Link } from "react-router-dom";
import { useGetMyOrdersQuery } from "../../redux/api/orderApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";

const MyOrders = () => {
  const { data: ordersData, isLoading, error } = useGetMyOrdersQuery();

  const orders = ordersData?.orders || [];

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="min-h-[calc(100vh-100px)]">
        <div className="container mx-auto px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 shadow-md dark:border-red-800 dark:bg-red-900/20">
            <Message variant="danger">
              {error?.data?.message ||
                error?.message ||
                "Failed to load orders"}
            </Message>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-100px)]">
      <div className="container mx-auto px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <h1 className="mb-6 text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
          My Orders
        </h1>

        {!orders || orders.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md sm:p-8 dark:border-slate-700 dark:bg-slate-800">
            <Message>You have no orders yet</Message>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order._id}
                className="rounded-xl border border-slate-200 bg-white p-4 shadow-md transition-shadow hover:shadow-lg sm:rounded-2xl sm:p-6 dark:border-slate-700 dark:bg-slate-800"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex-1">
                    <div className="mb-2 flex flex-wrap items-center gap-4">
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
                      {order.isDelivered && (
                        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800 sm:text-sm dark:bg-blue-900/30 dark:text-blue-400">
                          Delivered
                        </span>
                      )}
                    </div>
                    <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                      <p>
                        <strong className="text-gray-900 dark:text-white">
                          Placed:
                        </strong>{" "}
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                      <p>
                        <strong className="text-gray-900 dark:text-white">
                          Items:
                        </strong>{" "}
                        {order.orderItems?.length || 0}
                      </p>
                      <p>
                        <strong className="text-gray-900 dark:text-white">
                          Total:
                        </strong>{" "}
                        <span className="text-lg font-bold text-pink-600 dark:text-amber-400">
                          $
                          {typeof order.totalPrice === "number"
                            ? order.totalPrice.toFixed(2)
                            : (parseFloat(order.totalPrice) || 0).toFixed(2)}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 sm:flex-row">
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

export default MyOrders;
