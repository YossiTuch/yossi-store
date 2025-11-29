import { Link } from "react-router";
import moment from "moment";
import { useAllProductsQuery } from "../../redux/api/productApiSlice";
import { useEffect } from "react";

const ProductList = () => {
  const { data: products, isLoading, isError, refetch } = useAllProductsQuery();
 
  useEffect(() => {
    refetch();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading products</div>;
  }

  return (
    <div className="min-h-screen w-full bg-slate-100 py-3 dark:bg-slate-900 sm:py-6">
      <div className="flex flex-col px-3 sm:px-6 md:ml-[10rem] md:flex-row">
        <div className="w-full p-2 md:w-3/4 sm:p-3">
          <div className="mb-3 flex flex-col gap-1 sm:mb-6 sm:flex-row sm:items-center sm:justify-between sm:gap-2">
            <h1 className="text-xl font-semibold sm:text-2xl">Products</h1>
            <p className="text-xs text-gray-500 sm:text-sm">
              {products.length} {products.length === 1 ? "item" : "items"}
            </p>
          </div>

          {products.length === 0 ? (
            <div className="rounded-lg border border-dashed border-gray-300 p-4 text-center text-sm text-gray-500 dark:border-slate-700 sm:p-8 sm:text-base">
              No products found.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 sm:gap-5">
              {products.map((product) => (
                <article
                  key={product._id}
                  className="flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900 sm:min-w-[280px] sm:rounded-2xl"
                >
                  <div className="h-48 w-full overflow-hidden bg-gray-50 dark:bg-slate-800 sm:h-64">
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-3 sm:gap-3 sm:p-6">
                    <div className="flex items-start justify-between gap-2 sm:gap-3">
                      <h2 className="text-base font-semibold text-gray-900 dark:text-white sm:text-lg">
                        {product?.name}
                      </h2>
                      <span className="text-[10px] text-gray-500 dark:text-gray-400 sm:text-xs">
                        {moment(product.createdAt).format("MMM Do, YYYY")}
                      </span>
                    </div>

                    <p className="text-xs text-gray-600 dark:text-gray-300 sm:text-sm">
                      {product?.description
                        ? `${product.description.substring(0, 100)}${
                            product.description.length > 100 ? "..." : ""
                          }`
                        : "No description provided."}
                    </p>

                    <div className="mt-auto flex items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-gray-900 dark:text-amber-400 sm:text-base">
                        ${product?.price}
                      </p>
                      <Link
                        to={`/admin/product/update/${product._id}`}
                        className="inline-flex items-center rounded-md bg-blue-500 px-2 py-1.5 text-xs font-medium text-white transition hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 focus:outline-none dark:bg-amber-600 dark:hover:bg-amber-800 dark:focus:ring-amber-500/50 sm:rounded-lg sm:px-4 sm:py-2 sm:text-sm"
                      >
                        <span className="hidden sm:inline">Update Product</span>
                        <span className="sm:hidden">Update</span>
                        <svg
                          className="ml-2 h-3.5 w-3.5"
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
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
