const ProfileView = ({ user, formatDate }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
          Personal Information
        </h2>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-200 pb-4 dark:border-gray-700">
            <div className="mb-2 sm:mb-0">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Username
              </p>
              <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                {user.username || "N/A"}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-200 pb-4 dark:border-gray-700">
            <div className="mb-2 sm:mb-0">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Email Address
              </p>
              <p className="mt-1 text-lg text-gray-900 dark:text-white">
                {user.email || "N/A"}
              </p>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Cannot be changed
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-200 pb-4 dark:border-gray-700">
            <div className="mb-2 sm:mb-0">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Account Type
              </p>
              <p className="mt-1">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                    user.isAdmin
                      ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400"
                      : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                  }`}
                >
                  {user.isAdmin ? "Administrator" : "Customer"}
                </span>
              </p>
            </div>
          </div>

          {user.createdAt && (
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-200 pb-4 dark:border-gray-700">
              <div className="mb-2 sm:mb-0">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Member Since
                </p>
                <p className="mt-1 text-lg text-gray-900 dark:text-white">
                  {formatDate(user.createdAt)}
                </p>
              </div>
            </div>
          )}

          {user.updatedAt && user.updatedAt !== user.createdAt && (
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="mb-2 sm:mb-0">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Last Updated
                </p>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                  {formatDate(user.updatedAt)}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
