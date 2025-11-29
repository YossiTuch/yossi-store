import { useEffect, useRef } from "react";
import { Outlet } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Navigation from "./pages/Auth/Navigation";
import Footer from "./components/Footer";
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
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-white text-pink-900 dark:bg-slate-900 dark:text-amber-400">
      <ToastContainer position="top-right" autoClose={2000} />
      <Navigation />
      <main className="flex-1 bg-white pt-16 transition-all duration-300 lg:ml-24 dark:bg-slate-900">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
export default App;
