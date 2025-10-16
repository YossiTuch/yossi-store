import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isloading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <div>
      <section className="flex flex-wrap pl-[10rem]">
        <div className="mt-[5rem] mr-[4rem]">
          <h1 className="mb-4 text-2xl font-semibold">Sign In</h1>
          <form className="container w-[40rem]">
            <div className="my-[2rem]">
              <label htmlFor="email" className="block text-sm font-medium">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 w-full rounded border p-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="my-[2rem]">
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 w-full rounded border p-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              disabled={isloading}
              type="submit"
              className="my-[1rem] cursor-pointer rounded bg-blue-500 px-4 py-2 text-white duration-200 hover:bg-blue-700 dark:bg-amber-600 dark:hover:bg-amber-800"
            >
              {isloading ? "Signing In..." : "Sign In"}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};
export default Login;
