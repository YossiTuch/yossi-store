import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

const Ratings = ({ value = 0, text }) => {
  const safeValue = value || 0;
  const fullStars = Math.floor(safeValue);
  const halfStars = safeValue - fullStars > 0.5 ? 1 : 0;
  const emptyStar = Math.max(0, 5 - fullStars - halfStars);

  return (
    <div className="flex items-center gap-1">
      {[...Array(fullStars)].map((_, index) => (
        <FaStar
          key={index}
          className="text-yellow-400 dark:text-amber-400"
          size={18}
        />
      ))}

      {halfStars === 1 && (
        <FaStarHalfAlt
          className="text-yellow-400 dark:text-amber-400"
          size={18}
        />
      )}
      {[...Array(emptyStar)].map((_, index) => (
        <FaRegStar
          key={index}
          className="text-gray-300 dark:text-gray-600"
          size={18}
        />
      ))}

      {text && (
        <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          {text}
        </span>
      )}
    </div>
  );
};

export default Ratings;
