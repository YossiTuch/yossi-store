import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

const Ratings = ({ value = 0, text }) => {
  const safeValue = Math.min(Math.max(value || 0, 0), 5); // Clamp between 0 and 5
  const fullStars = Math.floor(safeValue);
  const hasHalfStar = safeValue - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-0.5 sm:gap-1">
      {/* Full stars */}
      {[...Array(fullStars)].map((_, index) => (
        <FaStar
          key={`full-${index}`}
          className="h-3.5 w-3.5 text-yellow-400 dark:text-amber-400 sm:h-[18px] sm:w-[18px]"
        />
      ))}

      {/* Half star */}
      {hasHalfStar && (
        <FaStarHalfAlt
          key="half"
          className="h-3.5 w-3.5 text-yellow-400 dark:text-amber-400 sm:h-[18px] sm:w-[18px]"
        />
      )}

      {/* Empty stars */}
      {[...Array(emptyStars)].map((_, index) => (
        <FaRegStar
          key={`empty-${index}`}
          className="h-3.5 w-3.5 text-gray-300 dark:text-gray-600 sm:h-[18px] sm:w-[18px]"
        />
      ))}

      {/* Review count text */}
      {text && (
        <span className="ml-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 sm:ml-2 sm:text-sm">
          {text}
        </span>
      )}
    </div>
  );
};

export default Ratings;
