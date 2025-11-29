import Chart from "react-apexcharts";
import { useGetUsersQuery } from "../../redux/api/usersApiSlice";
import {
  useGetTotalOrdersQuery,
  useGetTotalSalesByDateQuery,
  useGetTotalSalesQuery,
} from "../../redux/api/orderApiSlice";
import { useState, useEffect } from "react";
import OrderList from "./OrderList";
import Loader from "../../components/Loader";
import { AiOutlineDollar, AiOutlineUser, AiOutlineShoppingCart } from "react-icons/ai";

const AdminDashboard = () => {
  const { data: sales, isLoading } = useGetTotalSalesQuery();
  const { data: customers, isLoading: loading } = useGetUsersQuery();
  const { data: orders, isLoading: loadingTwo } = useGetTotalOrdersQuery();
  const { data: salesDetail } = useGetTotalSalesByDateQuery();

  const [state, setState] = useState({
    options: {
      chart: {
        type: "line",
        toolbar: {
          show: true,
        },
        fontFamily: "inherit",
      },
      tooltip: {
        theme: "dark",
      },
      colors: ["#ec4899"],
      dataLabels: {
        enabled: true,
        style: {
          colors: ["#ec4899"],
        },
      },
      stroke: {
        curve: "smooth",
        width: 3,
      },
      title: {
        text: "Sales Trend",
        align: "left",
        style: {
          fontSize: "18px",
          fontWeight: 600,
          color: "#1f2937",
        },
      },
      grid: {
        borderColor: "#e5e7eb",
        strokeDashArray: 4,
      },
      markers: {
        size: 5,
        hover: {
          size: 7,
        },
      },
      xaxis: {
        categories: [],
        title: {
          text: "Date",
          style: {
            fontSize: "14px",
            fontWeight: 500,
          },
        },
        labels: {
          style: {
            fontSize: "12px",
          },
        },
      },
      yaxis: {
        title: {
          text: "Sales ($)",
          style: {
            fontSize: "14px",
            fontWeight: 500,
          },
        },
        min: 0,
        labels: {
          style: {
            fontSize: "12px",
          },
          formatter: (value) => `$${value.toFixed(0)}`,
        },
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
    },
    series: [{ name: "Sales", data: [] }],
  });

  useEffect(() => {
    // Detect dark mode
    const isDark = document.documentElement.classList.contains("dark");
    
    if (salesDetail) {
      const formattedSalesDate = salesDetail.map((item) => ({
        x: item._id,
        y: item.totalSales,
      }));

      setState((prevState) => ({
        ...prevState,
        options: {
          ...prevState.options,
          theme: {
            mode: isDark ? "dark" : "light",
          },
          title: {
            ...prevState.options.title,
            style: {
              ...prevState.options.title.style,
              color: isDark ? "#f3f4f6" : "#1f2937",
            },
          },
          grid: {
            ...prevState.options.grid,
            borderColor: isDark ? "#374151" : "#e5e7eb",
          },
          xaxis: {
            ...prevState.options.xaxis,
            labels: {
              style: {
                colors: isDark ? "#9ca3af" : "#6b7280",
                fontSize: "12px",
              },
            },
            title: {
              ...prevState.options.xaxis.title,
              style: {
                ...prevState.options.xaxis.title.style,
                color: isDark ? "#d1d5db" : "#374151",
              },
            },
            categories: formattedSalesDate.map((item) => item.x),
          },
          yaxis: {
            ...prevState.options.yaxis,
            labels: {
              ...prevState.options.yaxis.labels,
              style: {
                colors: isDark ? "#9ca3af" : "#6b7280",
                fontSize: "12px",
              },
            },
            title: {
              ...prevState.options.yaxis.title,
              style: {
                ...prevState.options.yaxis.title.style,
                color: isDark ? "#d1d5db" : "#374151",
              },
            },
          },
        },
        series: [
          { name: "Sales", data: formattedSalesDate.map((item) => item.y) },
        ],
      }));
    }
  }, [salesDetail]);

  return (
    <div className="min-h-screen bg-slate-100 py-3 dark:bg-slate-900 sm:py-6">
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:ml-24 lg:px-8">
        {/* Header */}
        <div className="mb-4 sm:mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
            Admin Dashboard
          </h1>
          <p className="mt-1 text-xs text-gray-600 dark:text-gray-400 sm:mt-2 sm:text-sm">
            Overview of your store's performance
          </p>
        </div>

        {/* Stats Cards */}
        <div className="mb-4 grid grid-cols-1 gap-3 sm:mb-8 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {/* Sales Card */}
          <div className="group relative overflow-hidden rounded-xl border border-slate-200 bg-gradient-to-br from-white to-pink-50 p-3 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-700 dark:from-slate-800 dark:to-slate-900 dark:hover:border-pink-500/50 sm:rounded-2xl sm:p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-xs font-medium text-gray-600 dark:text-gray-400 sm:text-sm">
                  Total Sales
                </p>
                <h2 className="mt-1 text-xl font-bold text-gray-900 dark:text-white sm:mt-2 sm:text-3xl">
                  {isLoading ? (
                    <Loader />
                  ) : (
                    `$${sales?.totalSales?.toFixed(2) || "0.00"}`
                  )}
                </h2>
                <p className="mt-1 text-[10px] text-gray-500 dark:text-gray-500 sm:mt-2 sm:text-xs">
                  All time revenue
                </p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-pink-500 to-pink-600 text-white shadow-lg shadow-pink-500/30 transition-transform duration-300 group-hover:scale-110 dark:from-amber-500 dark:to-amber-600 dark:shadow-amber-500/30 sm:h-14 sm:w-14 sm:rounded-xl">
                <AiOutlineDollar className="h-5 w-5 sm:h-7 sm:w-7" />
              </div>
            </div>
          </div>

          {/* Customers Card */}
          <div className="group relative overflow-hidden rounded-xl border border-slate-200 bg-gradient-to-br from-white to-blue-50 p-3 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-700 dark:from-slate-800 dark:to-slate-900 dark:hover:border-blue-500/50 sm:rounded-2xl sm:p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-xs font-medium text-gray-600 dark:text-gray-400 sm:text-sm">
                  Total Customers
                </p>
                <h2 className="mt-1 text-xl font-bold text-gray-900 dark:text-white sm:mt-2 sm:text-3xl">
                  {loading ? <Loader /> : customers?.length || 0}
                </h2>
                <p className="mt-1 text-[10px] text-gray-500 dark:text-gray-500 sm:mt-2 sm:text-xs">
                  Registered users
                </p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30 transition-transform duration-300 group-hover:scale-110 sm:h-14 sm:w-14 sm:rounded-xl">
                <AiOutlineUser className="h-5 w-5 sm:h-7 sm:w-7" />
              </div>
            </div>
          </div>

          {/* Orders Card */}
          <div className="group relative overflow-hidden rounded-xl border border-slate-200 bg-gradient-to-br from-white to-emerald-50 p-3 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-700 dark:from-slate-800 dark:to-slate-900 dark:hover:border-emerald-500/50 sm:rounded-2xl sm:p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-xs font-medium text-gray-600 dark:text-gray-400 sm:text-sm">
                  Total Orders
                </p>
                <h2 className="mt-1 text-xl font-bold text-gray-900 dark:text-white sm:mt-2 sm:text-3xl">
                  {loadingTwo ? <Loader /> : orders?.totalOrders || 0}
                </h2>
                <p className="mt-1 text-[10px] text-gray-500 dark:text-gray-500 sm:mt-2 sm:text-xs">
                  All time orders
                </p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/30 transition-transform duration-300 group-hover:scale-110 sm:h-14 sm:w-14 sm:rounded-xl">
                <AiOutlineShoppingCart className="h-5 w-5 sm:h-7 sm:w-7" />
              </div>
            </div>
          </div>
        </div>

        {/* Chart Section */}
        <div className="mb-4 rounded-xl border border-slate-200 bg-white p-3 shadow-lg dark:border-slate-700 dark:bg-slate-800 sm:mb-8 sm:rounded-2xl sm:p-6">
          <div className="mb-2 sm:mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white sm:text-xl">
              Sales Analytics
            </h2>
            <p className="mt-0.5 text-xs text-gray-600 dark:text-gray-400 sm:mt-1 sm:text-sm">
              Track your sales performance over time
            </p>
          </div>
          <div className="w-full overflow-x-auto">
            <Chart
              options={state.options}
              series={state.series}
              type="line"
              height={250}
              width="100%"
            />
          </div>
        </div>

        {/* Orders List Section */}
        <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-lg dark:border-slate-700 dark:bg-slate-800 sm:rounded-2xl sm:p-6">
          <div className="mb-2 sm:mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white sm:text-xl">
              Recent Orders
            </h2>
            <p className="mt-0.5 text-xs text-gray-600 dark:text-gray-400 sm:mt-1 sm:text-sm">
              Latest orders from your customers
            </p>
          </div>
          <OrderList />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;