import { useState, useEffect, useRef } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
  AiOutlineFileText,
  AiOutlineUser,
  AiOutlineLogout,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link, useLocation } from "react-router";
import FavoritesCount from "../Products/FavoritesCount";
import CartCount from "./CartCount";

const DesktopNavigation = ({ userInfo, logoutHandler }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  const isActive = (path) => location.pathname === path;

  const NavLink = ({ to, icon: Icon, label, showBadge, onClick }) => (
    <Link
      to={to}
      onClick={onClick}
      className={`group relative flex items-center gap-4 rounded-xl px-5 py-3.5 transition-all duration-300 ${
        isActive(to)
          ? "bg-pink-600/20 text-pink-400 shadow-lg shadow-pink-600/10 dark:bg-amber-600/20 dark:text-amber-400 dark:shadow-amber-600/10"
          : "text-gray-300 hover:bg-white/10 hover:text-white hover:translate-x-1"
      }`}
    >
      <div className="relative flex-shrink-0">
        <Icon className="text-2xl transition-transform duration-300 group-hover:scale-110" />
        {showBadge && (
          <div className="absolute -top-1 -right-1">
            {showBadge === "cart" ? <CartCount /> : <FavoritesCount />}
          </div>
        )}
      </div>
      <span
        className={`overflow-hidden whitespace-nowrap text-sm font-medium transition-all duration-300 ${
          isHovered ? "max-w-[200px] opacity-100" : "max-w-0 opacity-0"
        }`}
      >
        {label}
      </span>
    </Link>
  );

  return (
    <nav
      className={`fixed left-0 top-0 z-[999] hidden h-screen flex-col justify-between bg-gradient-to-b from-slate-900 via-slate-800 to-black p-8 text-white shadow-2xl transition-all duration-300 lg:flex ${
        isHovered ? "w-72" : "w-24"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col gap-3">
        <NavLink to="/" icon={AiOutlineHome} label="Home" />
        <NavLink to="/shop" icon={AiOutlineShopping} label="Shop" />
        <NavLink
          to="/cart"
          icon={AiOutlineShoppingCart}
          label="Cart"
          showBadge="cart"
        />

        {userInfo && (
          <>
            <NavLink
              to="/favorite"
              icon={FaHeart}
              label="Favorites"
              showBadge="favorites"
            />
            <NavLink
              to="/myorders"
              icon={AiOutlineFileText}
              label="My Orders"
            />
          </>
        )}

        {!userInfo && (
          <>
            <NavLink to="/login" icon={AiOutlineLogin} label="Login" />
            <NavLink
              to="/register"
              icon={AiOutlineUserAdd}
              label="Register"
            />
          </>
        )}
      </div>

      <div className="relative" ref={dropdownRef}>
        {userInfo ? (
          <>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={`flex w-full items-center gap-4 rounded-xl px-5 py-4 transition-all duration-300 ${
                dropdownOpen
                  ? "bg-pink-600/20 text-pink-400 shadow-lg shadow-pink-600/10 dark:bg-amber-600/20 dark:text-amber-400 dark:shadow-amber-600/10"
                  : "text-gray-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-600/20 text-base font-semibold ring-2 ring-pink-600/30 dark:bg-amber-600/20 dark:ring-amber-600/30">
                {userInfo.username?.charAt(0).toUpperCase() || "U"}
              </div>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  isHovered ? "max-w-[150px] opacity-100" : "max-w-0 opacity-0"
                }`}
              >
                <p className="truncate text-sm font-semibold">
                  {userInfo.username}
                </p>
                <p className="text-xs text-gray-400">
                  {userInfo.isAdmin ? "Administrator" : "Customer"}
                </p>
              </div>
              <svg
                className={`ml-auto h-5 w-5 transition-transform duration-300 ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {dropdownOpen && (
              <div className="absolute bottom-full left-0 mb-3 w-full overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 dark:bg-slate-800 dark:ring-white/10">
                <div className="py-3">
                  {userInfo.isAdmin && (
                    <div className="border-b border-gray-200 px-3 pb-3 dark:border-gray-700">
                      <p className="px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        Admin Panel
                      </p>
                      <div className="space-y-1">
                        <Link
                          to="/admin/dashboard"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-pink-50 hover:text-pink-600 dark:text-gray-300 dark:hover:bg-amber-900/20 dark:hover:text-amber-400"
                        >
                          <AiOutlineFileText className="text-lg" />
                          Dashboard
                        </Link>
                        <Link
                          to="/admin/productlist"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-pink-50 hover:text-pink-600 dark:text-gray-300 dark:hover:bg-amber-900/20 dark:hover:text-amber-400"
                        >
                          <AiOutlineShopping className="text-lg" />
                          Products
                        </Link>
                        <Link
                          to="/admin/categorylist"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-pink-50 hover:text-pink-600 dark:text-gray-300 dark:hover:bg-amber-900/20 dark:hover:text-amber-400"
                        >
                          <AiOutlineFileText className="text-lg" />
                          Categories
                        </Link>
                        <Link
                          to="/admin/orderlist"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-pink-50 hover:text-pink-600 dark:text-gray-300 dark:hover:bg-amber-900/20 dark:hover:text-amber-400"
                        >
                          <AiOutlineFileText className="text-lg" />
                          Orders
                        </Link>
                        <Link
                          to="/admin/userlist"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-pink-50 hover:text-pink-600 dark:text-gray-300 dark:hover:bg-amber-900/20 dark:hover:text-amber-400"
                        >
                          <AiOutlineUser className="text-lg" />
                          Users
                        </Link>
                      </div>
                    </div>
                  )}
                  <div className="px-3 pt-3">
                    <div className="space-y-1">
                      <Link
                        to="/profile"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-pink-50 hover:text-pink-600 dark:text-gray-300 dark:hover:bg-amber-900/20 dark:hover:text-amber-400"
                      >
                        <AiOutlineUser className="text-lg" />
                        Profile
                      </Link>
                      <button
                        onClick={(e) => {
                          logoutHandler(e);
                          setDropdownOpen(false);
                        }}
                        className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                      >
                        <AiOutlineLogout className="text-lg" />
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col gap-3">
            <NavLink to="/login" icon={AiOutlineLogin} label="Login" />
            <NavLink
              to="/register"
              icon={AiOutlineUserAdd}
              label="Register"
            />
          </div>
        )}
      </div>
    </nav>
  );
};

export default DesktopNavigation;
