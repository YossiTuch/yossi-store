import Ratings from "./Ratings";

const ReviewItem = ({ review }) => {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm sm:p-4 md:p-6 dark:border-slate-700 dark:bg-slate-900">
      <div className="mb-2 flex flex-col justify-between gap-2 sm:mb-3 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-100 text-xs font-semibold text-pink-600 sm:h-10 sm:w-10 sm:text-sm dark:bg-amber-900/50 dark:text-amber-400">
            {review.name?.charAt(0).toUpperCase() || "U"}
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900 sm:text-base dark:text-white">
              {review.name}
            </p>
            <Ratings value={review.rating} />
          </div>
        </div>
        <p className="text-[10px] text-gray-500 sm:text-xs md:text-sm dark:text-gray-400">
          {review.createdAt
            ? new Date(review.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : "Date not available"}
        </p>
      </div>
      <p className="text-sm text-gray-700 sm:text-base dark:text-gray-300">
        {review.comment}
      </p>
    </div>
  );
};

export default ReviewItem;
