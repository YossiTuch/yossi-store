const ReviewForm = ({ rating, setRating, comment, setComment, onSubmit, isLoading }) => {
  return (
    <form onSubmit={onSubmit} className="max-w-2xl">
      <div className="mb-4 sm:mb-6">
        <label
          htmlFor="rating"
          className="mb-1.5 block text-xs font-medium text-gray-700 sm:mb-2 sm:text-sm dark:text-gray-300"
        >
          Rating
        </label>
        <select
          id="rating"
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

      <div className="mb-4 sm:mb-6">
        <label
          htmlFor="comment"
          className="mb-1.5 block text-xs font-medium text-gray-700 sm:mb-2 sm:text-sm dark:text-gray-300"
        >
          Comment
        </label>
        <textarea
          id="comment"
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
        {isLoading ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
};

export default ReviewForm;
