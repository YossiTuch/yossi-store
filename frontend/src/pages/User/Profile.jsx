import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { Link } from "react-router";
import { useProfileMutation } from "../../redux/api/usersApiSlice";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  useEffect(() => {
    setUsername(userInfo.username);
    setEmail(userInfo.email);
  }, [userInfo.username, userInfo.email]);
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          username,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Profile updated successfully");
      } catch (error) {
        toast.error(error?.data.message || error.message);
      }
    }
  };

  return (
    <div className="containero p-4">
      <div className="align-center mt-[5rem] flex justify-center md:flex md:space-x-4">
        <div className="md:w-1/3 max-sm:w-4/5">
          <h2 className="mb-4 text-2xl font-semibold max-md:text-center">
            Update Profile
          </h2>
          <form onSubmit={submitHandler}>
            <div className="mb-4">
              <label className="mb-2 block">Name</label>
              <input
                type="text"
                placeholder="Enter Name"
                className="form-input w-full rounded-sm border p-4"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="mb-2 block">Email</label>
              <input
                type="email"
                placeholder="Enter Email"
                className="form-input w-full rounded-sm border p-4"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="mb-2 block">Password</label>
              <input
                type="password"
                placeholder="Enter Password"
                className="form-input w-full rounded-sm border p-4"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="mb-2 block">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm Password"
                className="form-input w-full rounded-sm border p-4"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="flex justify-between">
              <button
                type="submit"
                disabled={loadingUpdateProfile}
                className="rounded bg-blue-500 px-4 py-2 text-white duration-200 hover:bg-blue-700 dark:bg-amber-600 dark:hover:bg-amber-800"
              >
                Update
              </button>
              <Link
                to="/user-orders"
                className="rounded bg-blue-500 px-4 py-2 text-white duration-200 hover:bg-blue-700 dark:bg-amber-700 dark:hover:bg-amber-900"
              >
                My Orders
              </Link>
            </div>
          </form>
          {loadingUpdateProfile && <Loader />}
        </div>
      </div>
    </div>
  );
};
export default Profile;
