import { Link } from "react-router";

const QuickActionsSidebar = ({ user }) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md dark:border-slate-700 dark:bg-slate-800">
      <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
        Quick Actions
      </h3>
      <div className="space-y-3">
        <Link
          to="/user-orders"
          className="block w-full rounded-lg bg-pink-600 px-4 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-pink-700 dark:bg-amber-600 dark:hover:bg-amber-700"
        >
          My Orders
        </Link>
        {user.favorites && user.favorites.length > 0 && (
          <Link
            to="/favorites"
            className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-center text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-slate-700 dark:text-gray-300 dark:hover:bg-slate-600"
          >
            Favorites ({user.favorites.length})
          </Link>
        )}
      </div>
    </div>
  );
};

export default QuickActionsSidebar;
