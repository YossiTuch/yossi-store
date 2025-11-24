import { Link } from "react-router";
import moment from "moment";
import { useAllProductsQuery } from "../../redux/api/productApiSlice";
import AdminMenu from "./AdminMenu";

const ProductList = () => {
  const { data: products, isLoading, isError } = useAllProductsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading products</div>;
  }

  return (
    <div className="min-h-screen w-full bg-slate-100 py-6 dark:bg-slate-900">
      <div className="flex flex-col px-4 sm:px-6 md:ml-[10rem] md:flex-row">
        <AdminMenu />
        <div className="w-full p-3 md:w-3/4">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-2xl font-semibold">Products</h1>
            <p className="text-sm text-gray-500">
              {products.length} {products.length === 1 ? "item" : "items"}
            </p>
          </div>

          {products.length === 0 ? (
            <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center text-gray-500 dark:border-slate-700">
              No products found.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
              {products.map((product) => (
                <article
                  key={product._id}
                  className="flex h-full min-w-[280px] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900"
                >
                  <div className="h-64 w-full overflow-hidden bg-gray-50 dark:bg-slate-800">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-6">
                    <div className="flex items-start justify-between gap-3">
                      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {product?.name}
                      </h2>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {moment(product.createdAt).format("MMM Do, YYYY")}
                      </span>
                    </div>

                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {product?.description
                        ? `${product.description.substring(0, 150)}${
                            product.description.length > 150 ? "..." : ""
                          }`
                        : "No description provided."}
                    </p>

                    <div className="mt-auto flex items-center justify-between">
                      <p className="text-base font-semibold text-gray-900 dark:text-amber-400">
                        ${product?.price}
                      </p>
                      <Link
                        to={`/admin/product/update/${product._id}`}
                        className="inline-flex items-center rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 focus:outline-none dark:bg-amber-600 dark:hover:bg-amber-800 dark:focus:ring-amber-500/50"
                      >
                        Update Product
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
