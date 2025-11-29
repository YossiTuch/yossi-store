import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { useRegisterMutation } from "../../redux/api/usersApiSlice";
import { AiOutlineUser, AiOutlineMail, AiOutlineLock } from "react-icons/ai";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await register({ username, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
        toast.success("User successfully registered");
      } catch (error) {
        toast.error(error.data.message);
      }
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-white to-pink-50 py-8 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 sm:py-12">
      <div className="mx-auto w-full max-w-lg px-4 sm:px-6 lg:max-w-xl lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-700 dark:bg-slate-800 sm:p-8 lg:p-10">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
              Create Account
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 sm:text-base">
              Sign up to get started with YossiStore
            </p>
          </div>

          {/* Form */}
          <form onSubmit={submitHandler} className="space-y-5">
            {/* Username Field */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Username
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <AiOutlineUser className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="name"
                  required
                  className="block w-full rounded-lg border border-slate-300 bg-white py-3 pl-10 pr-4 text-gray-900 placeholder-gray-400 transition-all focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 focus:outline-none dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-gray-500 dark:focus:border-amber-500 dark:focus:ring-amber-500/20"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <AiOutlineMail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  required
                  className="block w-full rounded-lg border border-slate-300 bg-white py-3 pl-10 pr-4 text-gray-900 placeholder-gray-400 transition-all focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 focus:outline-none dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-gray-500 dark:focus:border-amber-500 dark:focus:ring-amber-500/20"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Password
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <AiOutlineLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  id="password"
                  required
                  className="block w-full rounded-lg border border-slate-300 bg-white py-3 pl-10 pr-4 text-gray-900 placeholder-gray-400 transition-all focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 focus:outline-none dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-gray-500 dark:focus:border-amber-500 dark:focus:ring-amber-500/20"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Confirm Password
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <AiOutlineLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  id="confirmPassword"
                  required
                  className="block w-full rounded-lg border border-slate-300 bg-white py-3 pl-10 pr-4 text-gray-900 placeholder-gray-400 transition-all focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 focus:outline-none dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-gray-500 dark:focus:border-amber-500 dark:focus:ring-amber-500/20"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="mt-6 w-full rounded-lg bg-gradient-to-r from-pink-600 to-pink-700 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-pink-500/30 transition-all duration-200 hover:from-pink-700 hover:to-pink-800 hover:shadow-xl hover:shadow-pink-500/40 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 dark:from-amber-600 dark:to-amber-700 dark:shadow-amber-500/30 dark:hover:from-amber-700 dark:hover:to-amber-800 dark:focus:ring-amber-500"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <Loader />
                  <span className="ml-2">Registering...</span>
                </span>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <Link
                to={redirect ? `/login?redirect=${redirect}` : "/login"}
                className="font-semibold text-pink-600 transition-colors hover:text-pink-700 hover:underline dark:text-amber-400 dark:hover:text-amber-300"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;
