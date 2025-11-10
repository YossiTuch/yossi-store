import { useState } from "react";
import "./Navigation.css";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import { DarkThemeToggle } from "flowbite-react";
import { apiSlice } from "../../redux/api/apiSlice";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const closeSidebar = () => {
    setShowSidebar(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async (e) => {
    e.preventDefault();
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      dispatch(apiSlice.util.resetApiState());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* Mobile Top Navbar */}
      <div className="fixed top-0 left-0 right-0 z-[999] bg-black text-white lg:hidden">
        <div className="flex h-14 items-center justify-between px-4">
          <Link to="/" onClick={closeMobileMenu} className="flex items-center gap-2">
            <AiOutlineShopping size={22} />
            <span className="font-semibold">YossiStore</span>
          </Link>
          <div className="flex items-center gap-3">
            <DarkThemeToggle />
            <button
              aria-controls="mobile-menu"
              aria-expanded={mobileMenuOpen}
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center rounded p-2 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
            >
              {mobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div id="mobile-menu" className="border-t border-gray-800 bg-black px-4 pb-4 pt-2">
            <nav className="flex flex-col space-y-3">
              <Link to="/" onClick={closeMobileMenu} className="flex items-center gap-2 hover:text-amber-400">
                <AiOutlineHome size={20} /> <span>Home</span>
              </Link>
              <Link to="/shop" onClick={closeMobileMenu} className="flex items-center gap-2 hover:text-amber-400">
                <AiOutlineShopping size={20} /> <span>Shop</span>
              </Link>
              <Link to="/cart" onClick={closeMobileMenu} className="flex items-center gap-2 hover:text-amber-400">
                <AiOutlineShoppingCart size={20} /> <span>Cart</span>
              </Link>
              <Link to="/favorite" onClick={closeMobileMenu} className="flex items-center gap-2 hover:text-amber-400">
                <FaHeart size={18} /> <span>Favorite</span>
              </Link>
              {userInfo ? (
                <>
                  {userInfo.isAdmin && (
                    <>
                      <Link to="/admin/dashboard" onClick={closeMobileMenu} className="flex items-center gap-2 hover:text-amber-400">
                        <span>Dashboard</span>
                      </Link>
                      <Link to="/admin/productlist" onClick={closeMobileMenu} className="flex items-center gap-2 hover:text-amber-400">
                        <span>Products</span>
                      </Link>
                      <Link to="/admin/categorylist" onClick={closeMobileMenu} className="flex items-center gap-2 hover:text-amber-400">
                        <span>Category</span>
                      </Link>
                      <Link to="/admin/orderlist" onClick={closeMobileMenu} className="flex items-center gap-2 hover:text-amber-400">
                        <span>Orders</span>
                      </Link>
                      <Link to="/admin/userlist" onClick={closeMobileMenu} className="flex items-center gap-2 hover:text-amber-400">
                        <span>Users</span>
                      </Link>
                    </>
                  )}
                  <Link to="/admin/profile" onClick={closeMobileMenu} className="flex items-center gap-2 hover:text-amber-400">
                    <span>Profile</span>
                  </Link>
                  <button
                    onClick={(e) => {
                      logoutHandler(e);
                      closeMobileMenu();
                    }}
                    className="flex items-center gap-2 text-left hover:text-amber-400"
                  >
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={closeMobileMenu} className="flex items-center gap-2 hover:text-amber-400">
                    <AiOutlineLogin size={20} /> <span>Login</span>
                  </Link>
                  <Link to="/register" onClick={closeMobileMenu} className="flex items-center gap-2 hover:text-amber-400">
                    <AiOutlineUserAdd size={20} /> <span>Register</span>
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>

      {/* Desktop Sidebar (unchanged) */}
      <div
        style={{ zIndex: 999 }}
        className={`${showSidebar ? "lg:hidden" : "lg:flex"} fixed hidden h-screen w-[4%] flex-col justify-between bg-black p-4 text-white hover:w-[15%]`}
        id="navigation-container"
      >
      <div className="flex flex-col justify-center space-y-4">
        <div>
          <DarkThemeToggle />
        </div>
        <Link
          to="/"
          className="flex transform items-center transition-transform hover:translate-x-2"
        >
          <AiOutlineHome className="mt-[3rem] mr-2" size={26} />
          <span className="nav-item-name mt-[3rem] hidden">HOME</span>
        </Link>

        <Link
          to="/shop"
          className="flex transform items-center transition-transform hover:translate-x-2"
        >
          <AiOutlineShopping className="mt-[3rem] mr-2" size={26} />
          <span className="nav-item-name mt-[3rem] hidden">SHOP</span>
        </Link>

        <Link
          to="/cart"
          className="flex transform items-center transition-transform hover:translate-x-2"
        >
          <AiOutlineShoppingCart className="mt-[3rem] mr-2" size={26} />
          <span className="nav-item-name mt-[3rem] hidden">CART</span>
        </Link>

        <Link
          to="/favorite"
          className="flex transform items-center transition-transform hover:translate-x-2"
        >
          <FaHeart className="mt-[3rem] mr-2" size={26} />
          <span className="nav-item-name mt-[3rem] hidden">Favorite</span>
        </Link>
      </div>

      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="flex items-center text-gray-800 focus:cursor-pointer focus:outline-none"
        >
          {userInfo ? (
            <span className="text-white">{userInfo.username}</span>
          ) : (
            <></>
          )}
          {userInfo && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`ml-1 h-4 w-4 ${dropdownOpen ? "rotate-180 transform" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
              />
            </svg>
          )}
        </button>
        {dropdownOpen && userInfo && (
          <ul
            className={`absolute right-0 mt-2 mr-14 space-y-2 bg-white text-gray-600 ${!userInfo.isAdmin ? "-top-20" : "-top-80"} dark:bg-slate-900 dark:text-white`}
          >
            {userInfo.isAdmin && (
              <>
                <li>
                  <Link
                    to="/admin/dashboard"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-700"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/productlist"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-700"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/categorylist"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-700"
                  >
                    Category
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/orderlist"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-700"
                  >
                    Orders
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/userlist"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-700"
                  >
                    Users
                  </Link>
                </li>
              </>
            )}
            <li>
              <Link
                to="/admin/profile"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-700"
              >
                Profile
              </Link>
            </li>
            <li>
              <Link
                to="/admin/logout"
                onClick={logoutHandler}
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-700"
              >
                Logout
              </Link>
            </li>
          </ul>
        )}
      </div>

      {!userInfo && (
        <ul>
          <li>
            <Link
              to="/login"
              className="flex transform items-center transition-transform hover:translate-x-2"
            >
              <AiOutlineLogin className="mt-[3rem] mr-2" size={26} />
              <span className="nav-item-name mt-[3rem] hidden">Login</span>
            </Link>
          </li>
          <li>
            <Link
              to="/register"
              className="flex transform items-center transition-transform hover:translate-x-2"
            >
              <AiOutlineUserAdd className="mt-[3rem] mr-2" size={26} />
              <span className="nav-item-name mt-[3rem] hidden">Register</span>
            </Link>
          </li>
        </ul>
      )}
      </div>
    </>
  );
};
export default Navigation;
