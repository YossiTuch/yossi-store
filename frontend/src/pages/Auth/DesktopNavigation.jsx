import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { DarkThemeToggle } from "flowbite-react";
import FavoritesCount from "../Products/FavoritesCount";

const DesktopNavigation = ({ userInfo, logoutHandler }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const closeSidebar = () => {
    setShowSidebar(false);
  };

  return (
    <div
      style={{ zIndex: 999 }}
      className={`${showSidebar ? "lg:hidden" : "lg:flex"} fixed hidden h-screen flex-col justify-between bg-black p-4 text-white hover:w-[15%]`}
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
          className="relative flex transform items-center transition-transform hover:translate-x-2"
        >
          <div className="relative mt-[3rem] mr-2">
            <FaHeart size={26} />
            <div className="absolute -top-4 -right-2">
              <FavoritesCount />
            </div>
          </div>
          <span className="nav-item-name mt-[3rem] hidden">Favorites</span>
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
            className={`absolute right-0 mr-14 space-y-1.5 bg-white text-gray-600 ${!userInfo.isAdmin ? "-top-20" : "-top-80"} dark:bg-slate-900 dark:text-white`}
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
                    Categories
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
                to="/profile"
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
  );
};

export default DesktopNavigation;
