import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { setCredentials } from "../../redux/features/auth/authSlice";
import {
  useGetCurrentUserProfileQuery,
  useProfileMutation,
} from "../../redux/api/usersApiSlice";
import ProfileView from "./ProfileView";
import ProfileEditForm from "./ProfileEditForm";
import QuickActionsSidebar from "./QuickActionsSidebar";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const {
    data: profileData,
    isLoading: loadingProfile,
    refetch,
  } = useGetCurrentUserProfileQuery();

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  const user = profileData || userInfo;

  useEffect(() => {
    if (user) {
      setUsername(user.username || "");
    }
  }, [user]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password) {
      if (!currentPassword) {
        toast.error("Please enter your current password to change it");
        return;
      }
      if (password.length < 6) {
        toast.error("Password must be at least 6 characters");
        return;
      }
      if (password !== confirmPassword) {
        toast.error("New passwords do not match");
        return;
      }
      if (password === currentPassword) {
        toast.error("New password must be different from current password");
        return;
      }
    }

    try {
      const updateData = { username };
      if (password) {
        updateData.currentPassword = currentPassword;
        updateData.password = password;
      }

      const res = await updateProfile(updateData).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success("Profile updated successfully");
      setIsEditing(false);
      setCurrentPassword("");
      setPassword("");
      setConfirmPassword("");
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || error?.message || "Update failed");
    }
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setUsername(user?.username || "");
    setCurrentPassword("");
    setPassword("");
    setConfirmPassword("");
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loadingProfile) {
    return (
      <div className="flex min-h-[calc(100vh-100px)] items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[calc(100vh-100px)]">
        <div className="container mx-auto px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 shadow-md dark:border-red-800 dark:bg-red-900/20">
            <p className="text-red-800 dark:text-red-200">
              Unable to load profile. Please try again.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-100px)]">
      <div className="container mx-auto px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
            My Profile
          </h1>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="rounded-full bg-pink-600 px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-pink-700 focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:outline-none dark:bg-amber-600 dark:hover:bg-amber-700 dark:focus:ring-amber-500"
            >
              Edit Profile
            </button>
          )}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md dark:border-slate-700 dark:bg-slate-800 sm:p-8">
              {!isEditing ? (
                <ProfileView user={user} formatDate={formatDate} />
              ) : (
                <ProfileEditForm
                  user={user}
                  username={username}
                  setUsername={setUsername}
                  currentPassword={currentPassword}
                  setCurrentPassword={setCurrentPassword}
                  password={password}
                  setPassword={setPassword}
                  confirmPassword={confirmPassword}
                  setConfirmPassword={setConfirmPassword}
                  loadingUpdateProfile={loadingUpdateProfile}
                  onSubmit={submitHandler}
                  onCancel={cancelEdit}
                />
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <QuickActionsSidebar user={user} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
