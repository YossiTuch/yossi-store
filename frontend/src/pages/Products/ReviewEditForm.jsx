const ReviewEditForm = ({
  rating,
  setRating,
  comment,
  setComment,
  onSubmit,
  isLoading,
  showInfo = true,
}) => {
  return (
    <div className="max-w-2xl">
      {showInfo && (
        <div className="mb-4 rounded-lg border border-blue-200 bg-blue-50 p-3 sm:p-4 dark:border-blue-800 dark:bg-blue-900/20">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            You've already reviewed this product. Update your review below.
          </p>
        </div>
      )}
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="edit-rating"
            className="mb-1.5 block text-xs font-medium text-gray-700 sm:mb-2 sm:text-sm dark:text-gray-300"
          >
            Rating
          </label>
          <select
            id="edit-rating"
            required
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-gray-900 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 focus:outline-none sm:px-4 sm:py-2.5 sm:text-sm dark:border-slate-600 dark:bg-slate-900 dark:text-white dark:focus:border-amber-500 dark:focus:ring-amber-500/20"
          >
            <option value="">Select a rating</option>
            <option value="1">1 - Inferior</option>
            <option value="2">2 - Decent</option>
            <option value="3">3 - Great</option>
            <option value="4">4 - Excellent</option>
            <option value="5">5 - Exceptional</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="edit-comment"
            className="mb-1.5 block text-xs font-medium text-gray-700 sm:mb-2 sm:text-sm dark:text-gray-300"
          >
            Comment
          </label>
          <textarea
            id="edit-comment"
            rows="3"
            required
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your thoughts about this product..."
            className="sm:rows-4 w-full resize-none rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-gray-900 placeholder-gray-400 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 focus:outline-none sm:px-4 sm:py-2.5 sm:text-sm dark:border-slate-600 dark:bg-slate-900 dark:text-white dark:placeholder-gray-500 dark:focus:border-amber-500 dark:focus:ring-amber-500/20"
          ></textarea>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-lg bg-pink-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-pink-700 focus:ring-2 focus:ring-pink-300 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:px-6 sm:py-2.5 sm:text-sm dark:bg-amber-600 dark:hover:bg-amber-700 dark:focus:ring-amber-500/50"
        >
          {isLoading ? "Updating..." : "Update Review"}
        </button>
      </form>
    </div>
  );
};

export default ReviewEditForm;
