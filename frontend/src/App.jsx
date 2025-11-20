import { Outlet } from "react-router";
import Navigation from "./pages/Auth/Navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div className="h-full dark:bg-slate-900 dark:text-amber-400">
      <ToastContainer position="top-right" autoClose={2000}/>
      <Navigation />
      <main className="max-md:pt-10">
        <Outlet />
      </main>
    </div>
  );
};
export default App;
