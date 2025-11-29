import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router";
import { toast } from "react-toastify";
import ReviewForm from "./ReviewForm";
import ReviewEditForm from "./ReviewEditForm";
import ReviewList from "./ReviewList";

const ProductTabs = ({
  loadingProductReview,
  loadingUpdateReview,
  userInfo,
  submitHandler,
  updateReview,
  productId,
  refetch,
  rating,
  setRating,
  comment,
  setComment,
  product,
}) => {
  const [activeTab, setActiveTab] = useState(1);
  const [editRating, setEditRating] = useState(0);
  const [editComment, setEditComment] = useState("");

  // Find user's existing review
  const userReview = useMemo(() => {
    if (!userInfo || !product?.reviews) return null;
    return product.reviews.find((review) => {
      if (!review.user) return false;
      return (
        (typeof review.user === 'object' && review.user._id === userInfo._id) ||
        (typeof review.user === 'string' && review.user === userInfo._id) ||
        (review.user.toString() === userInfo._id)
      );
    });
  }, [userInfo, product?.reviews]);

  // Auto-populate edit form if user has existing review and is on Tab 1
  useEffect(() => {
    if (activeTab === 1 && userReview) {
      setEditRating(userReview.rating);
      setEditComment(userReview.comment);
    } else if (activeTab === 1 && !userReview) {
      setEditRating(0);
      setEditComment("");
    }
  }, [activeTab, userReview]);

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  const handleUpdateReview = async (e) => {
    e.preventDefault();
    if (!userReview) return;
    
    try {
      await updateReview({
        productId,
        reviewId: userReview._id,
        rating: editRating,
        comment: editComment,
      }).unwrap();
      await refetch();
      toast.success("Review updated successfully");
    } catch (error) {
      toast.error(
        error?.data?.message || error?.message || "Failed to update review"
      );
    }
  };

  return (
    <div className="w-full">
      <div className="border-b border-slate-200 dark:border-slate-700">
        <div className="flex flex-wrap gap-1 px-2 sm:gap-2 sm:px-4 md:px-6 lg:px-8">
          <button
            onClick={() => handleTabClick(1)}
            className={`px-2 py-2 text-xs font-medium transition-colors sm:px-4 sm:py-3 sm:text-sm md:text-base ${
              activeTab === 1
                ? "border-b-2 border-pink-600 text-pink-600 dark:border-amber-400 dark:text-amber-400"
                : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
            }`}
          >
            {userReview ? "Your Review" : "Write Your Review"}
          </button>
          <button
            onClick={() => handleTabClick(2)}
            className={`px-2 py-2 text-xs font-medium transition-colors sm:px-4 sm:py-3 sm:text-sm md:text-base ${
              activeTab === 2
                ? "border-b-2 border-pink-600 text-pink-600 dark:border-amber-400 dark:text-amber-400"
                : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
            }`}
          >
            All Reviews ({product.reviews?.length || 0})
          </button>
        </div>
      </div>

      <div className="p-3 sm:p-4 md:p-6 lg:p-8">
        {activeTab === 1 && (
          <div>
            {userInfo ? (
              userReview ? (
                <ReviewEditForm
                  rating={editRating}
                  setRating={setEditRating}
                  comment={editComment}
                  setComment={setEditComment}
                  onSubmit={handleUpdateReview}
                  isLoading={loadingUpdateReview}
                />
              ) : (
                <ReviewForm
                  rating={rating}
                  setRating={setRating}
                  comment={comment}
                  setComment={setComment}
                  onSubmit={submitHandler}
                  isLoading={loadingProductReview}
                />
              )
            ) : (
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-center sm:p-6 dark:border-slate-700 dark:bg-slate-900/50">
                <p className="text-sm text-gray-700 sm:text-base dark:text-gray-300">
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

        {activeTab === 2 && <ReviewList reviews={product.reviews} />}
      </div>
    </div>
  );
};

export default ProductTabs;
