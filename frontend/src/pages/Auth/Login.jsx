import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

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
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };
  return (
    <div>
      <section className="flex flex-wrap pl-0 px-4 md:pl-[10rem] md:px-0 max-sm:text-center">
        <div className="mt-8 mr-0 w-full text-center md:mt-[5rem] md:mr-[4rem] md:w-auto">
          <h1 className="mb-4 text-2xl font-semibold">Sign In</h1>
          <form onSubmit={submitHandler} className="container mx-auto w-full max-w-md md:mx-0 md:w-[40rem] md:max-w-none">
            <div className="my-[2rem]">
              <label htmlFor="email" className="block text-left w-4/5 mx-auto text-sm font-medium">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 w-4/5 mx-auto rounded border p-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="my-[2rem]">
              <label htmlFor="password" className="block text-left w-4/5 mx-auto text-sm font-medium">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 w-4/5 mx-auto rounded border p-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className="my-[1rem] w-4/5 mx-auto cursor-pointer rounded bg-blue-500 px-4 py-2 text-white duration-200 hover:bg-blue-700 md:w-4/5 dark:bg-amber-600 dark:hover:bg-amber-800"
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
            {isLoading && <Loader />}
          </form>
          <div className="mt-4">
            <p className="text-center dark:text-white">
              New Customer?{"  "}
              <Link
                to={redirect ? `/register?redirect=${redirect}` : "/register"}
                className="text-blue-500 hover:underline dark:text-amber-400"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Login;
