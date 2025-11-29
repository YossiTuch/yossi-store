import Loader from "../../components/Loader";

const ProfileEditForm = ({
  user,
  username,
  setUsername,
  currentPassword,
  setCurrentPassword,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  loadingUpdateProfile,
  onSubmit,
  onCancel,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
        Edit Profile
      </h2>

      <div>
        <label
          htmlFor="username"
          className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Username
        </label>
        <input
          type="text"
          id="username"
          required
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-pink-500 focus:ring-2 focus:ring-pink-500 focus:outline-none dark:border-gray-600 dark:bg-slate-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-amber-500 dark:focus:ring-amber-500"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Email Address
        </label>
        <input
          type="email"
          id="email"
          disabled
          className="w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-2.5 text-gray-600 cursor-not-allowed dark:border-gray-600 dark:bg-slate-700 dark:text-gray-400"
          value={user.email || ""}
        />
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Email cannot be changed
        </p>
      </div>

      <div>
        <label
          htmlFor="currentPassword"
          className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Current Password (required to change password)
        </label>
        <input
          type="password"
          id="currentPassword"
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-pink-500 focus:ring-2 focus:ring-pink-500 focus:outline-none dark:border-gray-600 dark:bg-slate-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-amber-500 dark:focus:ring-amber-500"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          placeholder="Enter current password"
        />
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Only required if you want to change your password
        </p>
      </div>

      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          New Password (leave blank to keep current)
        </label>
        <input
          type="password"
          id="password"
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-pink-500 focus:ring-2 focus:ring-pink-500 focus:outline-none dark:border-gray-600 dark:bg-slate-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-amber-500 dark:focus:ring-amber-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter new password"
          minLength={6}
        />
        {password && password.length < 6 && (
          <p className="mt-1 text-xs text-red-600 dark:text-red-400">
            Password must be at least 6 characters
          </p>
        )}
        {password && password === currentPassword && (
          <p className="mt-1 text-xs text-red-600 dark:text-red-400">
            New password must be different from current password
          </p>
        )}
      </div>

      {password && (
        <div>
          <label
            htmlFor="confirmPassword"
            className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Confirm New Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-pink-500 focus:ring-2 focus:ring-pink-500 focus:outline-none dark:border-gray-600 dark:bg-slate-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-amber-500 dark:focus:ring-amber-500"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
          />
          {confirmPassword && password !== confirmPassword && (
            <p className="mt-1 text-xs text-red-600 dark:text-red-400">
              Passwords do not match
            </p>
          )}
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onCancel}
          disabled={loadingUpdateProfile}
          className="rounded-full border border-gray-300 bg-white px-6 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none dark:border-gray-600 dark:bg-slate-700 dark:text-gray-300 dark:hover:bg-slate-600"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loadingUpdateProfile}
          className="rounded-full bg-pink-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-pink-700 focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:outline-none disabled:opacity-50 dark:bg-amber-600 dark:hover:bg-amber-700 dark:focus:ring-amber-500"
        >
          {loadingUpdateProfile ? "Saving..." : "Save Changes"}
        </button>
      </div>
      {loadingUpdateProfile && (
        <div className="flex justify-center">
          <Loader />
        </div>
      )}
    </form>
  );
};

export default ProfileEditForm;
