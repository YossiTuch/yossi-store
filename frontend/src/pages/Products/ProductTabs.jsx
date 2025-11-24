import { useState } from "react";
import { Link } from "react-router";
import Ratings from "./Ratings";
import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import SmallProduct from "./SmallProduct";
import Loader from "../../components/Loader";

const ProductTabs = ({
  loadingProductReview,
  userInfo,
  submitHandler,
  rating,
  setRating,
  comment,
  setComment,
  product,
}) => {
  const [activeTab, setActiveTab] = useState(1);

  // Only fetch related products when tab 3 is active
  const { data, isLoading } = useGetTopProductsQuery(undefined, {
    skip: activeTab !== 3,
  });

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  return (
    <div className="w-full">
      {/* Tabs Navigation */}
      <div className="border-b border-slate-200 dark:border-slate-700">
        <div className="flex flex-wrap gap-2 px-4 sm:px-6 md:px-8">
          <button
            onClick={() => handleTabClick(1)}
            className={`px-4 py-3 text-sm font-medium transition-colors sm:px-6 sm:text-base ${
              activeTab === 1
                ? "border-b-2 border-pink-600 text-pink-600 dark:border-amber-400 dark:text-amber-400"
                : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
            }`}
          >
            Write Your Review
          </button>
          <button
            onClick={() => handleTabClick(2)}
            className={`px-4 py-3 text-sm font-medium transition-colors sm:px-6 sm:text-base ${
              activeTab === 2
                ? "border-b-2 border-pink-600 text-pink-600 dark:border-amber-400 dark:text-amber-400"
                : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
            }`}
          >
            All Reviews ({product.reviews?.length || 0})
          </button>
          <button
            onClick={() => handleTabClick(3)}
            className={`px-4 py-3 text-sm font-medium transition-colors sm:px-6 sm:text-base ${
              activeTab === 3
                ? "border-b-2 border-pink-600 text-pink-600 dark:border-amber-400 dark:text-amber-400"
                : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
            }`}
          >
            Related Products
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-4 sm:p-6 md:p-8">
        {/* Write Review Tab */}
        {activeTab === 1 && (
          <div>
            {userInfo ? (
              <form onSubmit={submitHandler} className="max-w-2xl">
                <div className="mb-6">
                  <label
                    htmlFor="rating"
                    className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Rating
                  </label>
                  <select
                    id="rating"
                    required
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-900 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white dark:focus:border-amber-500 dark:focus:ring-amber-500/20"
                  >
                    <option value="">Select a rating</option>
                    <option value="1">1 - Inferior</option>
                    <option value="2">2 - Decent</option>
                    <option value="3">3 - Great</option>
                    <option value="4">4 - Excellent</option>
                    <option value="5">5 - Exceptional</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="comment"
                    className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Comment
                  </label>
                  <textarea
                    id="comment"
                    rows="4"
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Share your thoughts about this product..."
                    className="w-full resize-none rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white dark:placeholder-gray-500 dark:focus:border-amber-500 dark:focus:ring-amber-500/20"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loadingProductReview}
                  className="rounded-lg bg-pink-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-300 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-amber-600 dark:hover:bg-amber-700 dark:focus:ring-amber-500/50"
                >
                  {loadingProductReview ? "Submitting..." : "Submit Review"}
                </button>
              </form>
            ) : (
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-6 text-center dark:border-slate-700 dark:bg-slate-900/50">
                <p className="text-gray-700 dark:text-gray-300">
                  Please{" "}
                  <Link
                    to="/login"
                    className="font-semibold text-pink-600 hover:underline dark:text-amber-400"
                  >
                    sign in
                  </Link>{" "}
                  to write a review
                </p>
              </div>
            )}
          </div>
        )}

        {/* All Reviews Tab */}
        {activeTab === 2 && (
          <div>
            {!product.reviews || product.reviews.length === 0 ? (
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-8 text-center dark:border-slate-700 dark:bg-slate-900/50">
                <p className="text-gray-600 dark:text-gray-400">
                  No reviews yet. Be the first to review this product!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {product.reviews.map((review) => (
                  <div
                    key={review._id}
                    className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:p-6"
                  >
                    <div className="mb-3 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-100 text-sm font-semibold text-pink-600 dark:bg-amber-900/50 dark:text-amber-400">
                          {review.name?.charAt(0).toUpperCase() || "U"}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {review.name}
                          </p>
                          <Ratings value={review.rating} />
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
                        {review.createdAt
                          ? new Date(review.createdAt).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })
                          : "Date not available"}
                      </p>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Related Products Tab */}
        {activeTab === 3 && (
          <div>
            {isLoading ? (
              <Loader />
            ) : !data || data.length === 0 ? (
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-8 text-center dark:border-slate-700 dark:bg-slate-900/50">
                <p className="text-gray-600 dark:text-gray-400">
                  No related products found.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {data.map((product) => (
                  <SmallProduct key={product._id} product={product} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTabs;