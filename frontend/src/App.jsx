import { Outlet } from "react-router";
import Navigation from "./pages/Auth/Navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div className="h-full dark:bg-slate-950 dark:text-amber-400">
      <ToastContainer />
      <Navigation />
      <main className="py-3">
        <Outlet />
      </main>
    </div>
  );
};
export default App;
