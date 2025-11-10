import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { useRegisterMutation } from "../../redux/api/usersApiSlice";

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
        navigate("redirect");
        toast.success("User successfully registered");
      } catch (error) {
        console.log(error);
        toast.error(error.data.message);
      }
    }
  };
  return (
    <section className="flex flex-wrap px-4 pl-0 md:px-0 md:pl-[10rem] max-sm:text-center">
      <div className="mt-8 mr-0 w-full text-center md:mt-[5rem] md:mr-[4rem] md:w-auto">
        <h1 className="mb-4 text-2xl font-semibold">Register</h1>

        <form
          onSubmit={submitHandler}
          className="container mx-auto w-full max-w-md md:mx-0 md:w-[40rem] md:max-w-none"
        >
          <div className="my-[2rem]">
            <label htmlFor="name" className="block text-left w-4/5 mx-auto text-sm font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 w-4/5 mx-auto rounded border p-2"
              placeholder="Enter Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="my-[2rem]">
            <label htmlFor="email" className="block text-left w-4/5 mx-auto text-sm font-medium">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 w-4/5 mx-auto rounded border p-2"
              placeholder="Enter Email Address"
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
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="my-[2rem]">
            <label
              htmlFor="confirmPassword"
              className="block text-left w-4/5 mx-auto text-sm font-medium"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="mt-1 w-4/5 mx-auto rounded border p-2"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="my-[1rem] w-4/5 mx-auto cursor-pointer rounded bg-blue-500 px-4 py-2 text-white duration-200 hover:bg-blue-700 md:w-4/5 dark:bg-amber-600 dark:hover:bg-amber-800"
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
          {isLoading && <Loader />}
        </form>

        <div className="mt-4">
          <p className="text-center dark:text-white">
            Already have an account? {"  "}
            <Link
              to={redirect ? `/login?redirect=${redirect}` : "/login"}
              className="text-blue-500 hover:underline dark:text-amber-400"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};
export default Register;
