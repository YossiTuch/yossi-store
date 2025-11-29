import ReviewItem from "./ReviewItem";

const ReviewList = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-center sm:p-8 dark:border-slate-700 dark:bg-slate-900/50">
        <p className="text-sm text-gray-600 sm:text-base dark:text-gray-400">
          No reviews yet. Be the first to review this product!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      {reviews.map((review) => (
        <ReviewItem key={review._id} review={review} />
      ))}
    </div>
  );
};

export default ReviewList;
