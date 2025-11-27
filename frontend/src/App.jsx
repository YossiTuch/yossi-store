import { useEffect } from "react";
import { Outlet } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Navigation from "./pages/Auth/Navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setFavorites } from "./redux/features/favorites/favoriteSlice";

const App = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo && userInfo.favorites) {
      dispatch(setFavorites(userInfo.favorites));
    } else if (userInfo) {
      dispatch(setFavorites([]));
    }
  }, [userInfo, dispatch]);

  return (
    <div className="w-full bg-white text-pink-900 dark:bg-slate-900 dark:text-amber-400">
      <ToastContainer position="top-right" autoClose={2000} />
      <Navigation />
      <main className="min-h-[calc(100vh-100px)] w-full bg-white max-md:pt-10 dark:bg-slate-900">
        <Outlet />
      </main>
    </div>
  );
};
export default App;
