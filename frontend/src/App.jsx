import { Outlet } from "react-router";
import Navigation from "./pages/Auth/Navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div className="min-h-screen text-pink-900 w-full bg-white dark:bg-slate-900 dark:text-amber-400">
      <ToastContainer position="top-right" autoClose={2000}/>
      <Navigation />
      <main className="min-h-[calc(100vh-100px)] w-full max-md:pt-10 bg-white dark:bg-slate-900">
        <Outlet />
      </main>
    </div>
  );
};
export default App;
