import { useEffect, useRef } from "react";
import { Outlet } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Navigation from "./pages/Auth/Navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setFavorites } from "./redux/features/favorites/favoriteSlice";
import { mergeCarts } from "./redux/features/cart/cartSlice";
import { BASE_URL } from "./redux/constants";

const App = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const hasLoadedCartRef = useRef(false);

  useEffect(() => {
    if (userInfo && userInfo.favorites) {
      dispatch(setFavorites(userInfo.favorites));
    } else if (userInfo) {
      dispatch(setFavorites([]));
    }
  }, [userInfo, dispatch]);

  useEffect(() => {
    let isMounted = true;

    const loadCartFromBackend = async () => {
      if (userInfo?._id && !hasLoadedCartRef.current) {
        hasLoadedCartRef.current = true;
        try {
          const response = await fetch(`${BASE_URL}/api/users/cart`, {
            credentials: "include",
          });
          if (response.ok && isMounted) {
            const { cart: backendCart } = await response.json();
            if (backendCart?.cartItems && isMounted) {
              dispatch(mergeCarts(backendCart));
            }
          }
        } catch (error) {
        }
      }
    };

    loadCartFromBackend();

    return () => {
      isMounted = false;
    };
  }, [userInfo?._id, dispatch]);

  useEffect(() => {
    if (!userInfo) {
      hasLoadedCartRef.current = false;
    }
  }, [userInfo]);

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
